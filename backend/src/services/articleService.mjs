import { prisma } from "../lib/prisma.mjs";
import { createArticleSchema, updateArticleSchema } from "../validations/articleValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";

/**
 * Membuat Slug URL (Contoh: "Berita Terbaru" -> "berita-terbaru")
 */
const generateSlug = (text) => {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
};



/**
 * 1. MENDAPATKAN SEMUA ARTIKEL
 */
/**
 * Mengambil semua data artikel dari database, lengkap dengan kategori dan status penulisnya.
 * @returns {Promise<Array>} Daftar semua artikel
 */
export const getAllArticles = async () => {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      author: { select: { id: true, name: true } },
    },
  });
  return articles;
};

/**
 * 2. MENDAPATKAN ARTIKEL BERDASARKAN ID
 */
/**
 * Mengambil data satu artikel secara spesifik berdasarkan ID-nya.
 * @param {string} id - ID unik artikel
 * @returns {Promise<object>} Data lengkap artikel
 * @throws {Error} Jika artikel tidak ditemukan
 */
export const getArticleById = async (id) => {
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      author: { select: { id: true, name: true } },
    },
  });

  if (!article) {
    const error = new Error("Artikel tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return article;
};

/**
 * 3. MEMBUAT ARTIKEL BARU
 */
/**
 * Membuat artikel baru dan mengaitkannya dengan pembuat (author).
 * Mengunggah gambar sampul ke Cloudinary jika dilampirkan.
 * @param {object} payload - Data teks artikel (judul, konten, dll)
 * @param {object} [file] - File gambar sampul artikel
 * @param {string} authorId - ID pengguna (admin) yang membuat artikel
 * @returns {Promise<object>} Data artikel yang baru dibuat
 */
export const createArticle = async (payload, file, adminId) => {
  // 1. Validasi teks menggunakan Zod
  const validatedData = createArticleSchema.parse(payload);

  // 2. Wajib ada gambar artikel
  if (!file) {
    const error = new Error("Gambar artikel wajib diunggah!");
    error.statusCode = 400;
    throw error;
  }

  // 3. Upload gambar ke R2
  let imageUrl = "";
  try {
    const uploadResult = await uploadImageToR2(file.buffer, "basoyen/articles");
    imageUrl = uploadResult.secure_url; 
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  // 5. Buat slug unik berdasarkan judul artikel
  let finalSlug = generateSlug(validatedData.title);
  let counter = 1;
  while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${generateSlug(validatedData.title)}-${counter}`;
    counter++;
  }

  // 6. Simpan artikel ke dalam Database
  const newArticle = await prisma.article.create({
    data: {
      ...validatedData,
      slug: finalSlug,
      image: imageUrl,
      authorId: adminId, 
    },
  });

  return newArticle;
};

/**
 * 4. MEMPERBARUI ARTIKEL
 */
/**
 * Memperbarui data artikel yang sudah ada.
 * Jika ada gambar sampul baru yang dilampirkan, gambar lama akan dihapus dan diganti.
 * @param {string} id - ID artikel
 * @param {object} payload - Data perubahan artikel
 * @param {object} [file] - File gambar sampul baru
 * @returns {Promise<object>} Data artikel setelah diperbarui
 */
export const updateArticle = async (id, payload, file) => {
  // 1. Validasi data yang dikirim (semua opsional)
  const validatedData = updateArticleSchema.parse(payload);
  const existingArticle = await getArticleById(id);
  const updateData = { ...validatedData };

  // 2. Jika judul diupdate, buat ulang slug yang baru dan unik
  if (validatedData.title) {
    let finalSlug = generateSlug(validatedData.title);
    let counter = 1;
    while (true) {
      const existing = await prisma.article.findUnique({ where: { slug: finalSlug } });
      if (!existing || existing.id === id) break;
      finalSlug = `${generateSlug(validatedData.title)}-${counter}`;
      counter++;
    }
    updateData.slug = finalSlug;
  }

  // 3. Jika admin mengunggah gambar baru
  if (file) {
    try {
      // 3a. Upload gambar baru ke awan
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/articles");
      updateData.image = uploadResult.secure_url;
      
      // 3b. Lacak dan hapus gambar lama di awan agar tidak menjadi sampah
      const oldObjectKey = extractObjectKey(existingArticle.image);
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
  const updatedArticle = await prisma.article.update({
    where: { id },
    data: updateData,
  });

  return updatedArticle;
};

/**
 * 5. MENGHAPUS ARTIKEL
 */
/**
 * Menghapus artikel dari database sekaligus menghapus sampul gambarnya dari Cloudinary.
 * @param {string} id - ID artikel yang akan dihapus
 * @returns {Promise<object>} Data artikel yang telah dihapus
 */
export const deleteArticle = async (id) => {
  const existingArticle = await getArticleById(id);

  // 1. Hapus gambar dari awan terlebih dahulu
  const objectKey = extractObjectKey(existingArticle.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Setelah gambar terhapus, baru hapus datanya dari PostgreSQL
  await prisma.article.delete({ where: { id } });

  return { message: "Artikel berhasil dihapus beserta gambarnya" };
};
