import { prisma } from "../lib/prisma.mjs";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation.mjs";

/**
 * Membuat Slug URL yang ramah SEO (Contoh: "Bakso Sapi Asli" -> "bakso-sapi-asli")
 */
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung (-)
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-alfanumerik
    .replace(/\-\-+/g, "-"); // Ganti tanda hubung ganda dengan tanda hubung tunggal
};

/**
 * 1. MENDAPATKAN SEMUA KATEGORI
 */
/**
 * Mengambil semua data kategori dari database.
 * Dapat difilter berdasarkan tipe spesifik (misalnya hanya kategori 'RECIPE' atau 'ARTICLE').
 * @param {string} [type] - Filter berdasarkan tipe kategori (opsional)
 * @returns {Promise<Array>} Daftar kategori yang ditemukan
 */
export const getAllCategories = async (typeFilter) => {
  const queryOptions = {
    orderBy: { createdAt: "desc" }, // Urutkan dari yang terbaru
  };

  // Jika ada parameter tipe (misal: /api/categories?type=PRODUCT)
  if (typeFilter) {
    queryOptions.where = { type: typeFilter };
  }

  const categories = await prisma.category.findMany(queryOptions);
  return categories;
};

/**
 * 2. MENDAPATKAN KATEGORI BERDASARKAN ID
 */
/**
 * Mengambil satu data kategori spesifik berdasarkan ID-nya.
 * @param {string} id - ID unik kategori
 * @returns {Promise<object>} Objek data kategori
 * @throws {Error} Jika kategori tidak ditemukan
 */
export const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    const error = new Error("Kategori tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return category;
};

/**
 * 3. MEMBUAT KATEGORI BARU
 */
/**
 * Membuat data kategori baru di database.
 * Juga bertugas menghasilkan 'slug' secara otomatis berdasarkan nama kategori.
 * @param {object} payload - Data kategori (name, description, type)
 * @returns {Promise<object>} Data kategori yang baru dibuat
 */
export const createCategory = async (payload) => {
  // Validasi data mentah dari Frontend menggunakan Zod
  const validatedData = createCategorySchema.parse(payload);

  // Buat slug otomatis
  const baseSlug = generateSlug(validatedData.name);
  let finalSlug = baseSlug;

  // Pastikan slug tidak kembar (unik)
  let counter = 1;
  while (await prisma.category.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Simpan ke database
  const newCategory = await prisma.category.create({
    data: {
      name: validatedData.name,
      type: validatedData.type,
      slug: finalSlug,
    },
  });

  return newCategory;
};

/**
 * 4. MEMPERBARUI KATEGORI
 */
/**
 * Memperbarui data kategori yang sudah ada.
 * Jika nama berubah, maka 'slug' juga akan diperbarui.
 * @param {string} id - ID kategori yang akan diubah
 * @param {object} payload - Data kategori yang baru
 * @returns {Promise<object>} Data kategori setelah diperbarui
 */
export const updateCategory = async (id, payload) => {
  // Validasi Zod (Bisa jadi hanya kirim nama saja, atau tipe saja)
  const validatedData = updateCategorySchema.parse(payload);

  // Cek apakah kategori ada
  await getCategoryById(id);

  const updateData = { ...validatedData };

  // Jika namanya diganti, kita wajib membuat slug baru!
  if (validatedData.name) {
    const baseSlug = generateSlug(validatedData.name);
    let finalSlug = baseSlug;

    let counter = 1;
    // Cek duplikasi (TAPI ABAIKAN DIRI SENDIRI!)
    while (true) {
      const existing = await prisma.category.findUnique({
        where: { slug: finalSlug },
      });
      if (!existing || existing.id === id) {
        break; // Aman! Slug belum ada yang pakai atau milik diri sendiri
      }
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    updateData.slug = finalSlug;
  }

  // Lakukan pembaruan
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: updateData,
  });

  return updatedCategory;
};

/**
 * 5. MENGHAPUS KATEGORI
 */
/**
 * Menghapus data kategori dari database.
 * @param {string} id - ID kategori yang akan dihapus
 * @returns {Promise<object>} Data kategori yang telah dihapus
 */
export const deleteCategory = async (id) => {
  // Cek apakah kategori ada
  await getCategoryById(id);

  // Hapus dari database
  await prisma.category.delete({
    where: { id },
  });

  return { message: "Kategori berhasil dihapus" };
};
