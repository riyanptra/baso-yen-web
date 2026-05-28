import { prisma } from "../lib/prisma.mjs";
import { createRecipeSchema, updateRecipeSchema } from "../validations/recipeValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";

/**
 * Membuat Slug URL (Contoh: "Sop Iga" -> "sop-iga")
 */
const generateSlug = (text) => {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
};



/**
 * 1. MENDAPATKAN SEMUA RESEP
 */
/**
 * Mengambil semua data resep beserta kategori dan status penulisnya.
 * @returns {Promise<Array>} Daftar resep
 */
export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } },
    },
  });
  return recipes;
};

/**
 * 2. MENDAPATKAN RESEP BERDASARKAN ID
 */
/**
 * Mengambil data spesifik satu resep berdasarkan ID.
 * @param {string} id - ID resep
 * @returns {Promise<object>} Data resep lengkap
 * @throws {Error} Jika resep tidak ditemukan
 */
export const getRecipeById = async (id) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      author: { select: { id: true, name: true } },
    },
  });

  if (!recipe) {
    const error = new Error("Resep tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return recipe;
};

/**
 * 3. MEMBUAT RESEP BARU
 */
/**
 * Membuat resep baru dan mengaitkannya dengan pembuat (author).
 * Mengunggah gambar sampul resep ke Cloudinary jika dilampirkan.
 * @param {object} payload - Data teks resep (judul, porsi, durasi, dll)
 * @param {object} [file] - File gambar resep
 * @param {string} authorId - ID pengguna (admin) yang membuat resep
 * @returns {Promise<object>} Data resep yang baru dibuat
 */
export const createRecipe = async (payload, file, adminId) => {
  // 1. Validasi teks menggunakan Zod
  const validatedData = createRecipeSchema.parse(payload);

  // 2. Wajib ada gambar masakan
  if (!file) {
    const error = new Error("Gambar masakan wajib diunggah!");
    error.statusCode = 400;
    throw error;
  }

  // 3. Upload gambar ke R2
  let imageUrl = "";
  try {
    const uploadResult = await uploadImageToR2(file.buffer, "basoyen/recipes");
    imageUrl = uploadResult.secure_url; 
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  // 5. Buat slug unik berdasarkan judul resep
  let finalSlug = generateSlug(validatedData.title);
  let counter = 1;
  while (await prisma.recipe.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${generateSlug(validatedData.title)}-${counter}`;
    counter++;
  }

  // 6. Simpan resep ke dalam Database
  const newRecipe = await prisma.recipe.create({
    data: {
      ...validatedData,
      slug: finalSlug,
      image: imageUrl,
      authorId: adminId, 
    },
  });

  return newRecipe;
};

/**
 * 4. MEMPERBARUI RESEP
 */
/**
 * Memperbarui data resep. 
 * Jika ada gambar baru yang dilampirkan, gambar lama akan dihapus dan diganti.
 * @param {string} id - ID resep
 * @param {object} payload - Data perubahan resep
 * @param {object} [file] - File gambar baru
 * @returns {Promise<object>} Data resep setelah diperbarui
 */
export const updateRecipe = async (id, payload, file) => {
  // 1. Validasi data yang dikirim (semua opsional)
  const validatedData = updateRecipeSchema.parse(payload);
  const existingRecipe = await getRecipeById(id);
  const updateData = { ...validatedData };

  // 2. Jika judul diupdate, buat ulang slug yang baru dan unik
  if (validatedData.title) {
    let finalSlug = generateSlug(validatedData.title);
    let counter = 1;
    while (true) {
      const existing = await prisma.recipe.findUnique({ where: { slug: finalSlug } });
      if (!existing || existing.id === id) break;
      finalSlug = `${generateSlug(validatedData.title)}-${counter}`;
      counter++;
    }
    updateData.slug = finalSlug;
  }

  // 3. Jika admin mengunggah gambar baru
  if (file) {
    try {
      // 3a. Upload gambar baru ke awan menggunakan buffer memori
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/recipes");
      updateData.image = uploadResult.secure_url;
      
      // 3b. Lacak dan hapus gambar lama di awan agar tidak menjadi sampah
      const oldObjectKey = extractObjectKey(existingRecipe.image);
      if (oldObjectKey) {
        await deleteImageFromR2(oldObjectKey);
      }
    } catch (error) {
      const err = new Error(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  // 4. Simpan perubahan ke Database
  const updatedRecipe = await prisma.recipe.update({
    where: { id },
    data: updateData,
  });

  return updatedRecipe;
};

/**
 * 5. MENGHAPUS RESEP
 */
/**
 * Menghapus resep dari database sekaligus menghapus sampul gambarnya dari Cloudinary.
 * @param {string} id - ID resep yang akan dihapus
 * @returns {Promise<object>} Data resep yang telah dihapus
 */
export const deleteRecipe = async (id) => {
  const existingRecipe = await getRecipeById(id);

  // 1. Hapus gambar dari awan terlebih dahulu
  const objectKey = extractObjectKey(existingRecipe.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Setelah gambar terhapus, baru hapus datanya dari PostgreSQL
  await prisma.recipe.delete({ where: { id } });

  return { message: "Resep berhasil dihapus beserta gambarnya" };
};
