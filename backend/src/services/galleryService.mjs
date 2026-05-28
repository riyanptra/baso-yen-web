import { prisma } from "../lib/prisma.mjs";
import { createGallerySchema, updateGallerySchema } from "../validations/galleryValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";



/**
 * 1. MENDAPATKAN SEMUA GALERI
 */
/**
 * Mengambil seluruh data foto galeri dari database, diurutkan dari yang terbaru.
 * @returns {Promise<Array>} Daftar semua foto galeri
 */
export const getAllGalleries = async () => {
  const galleries = await prisma.gallery.findMany({
    orderBy: { order: "asc" },
  });
  return galleries;
};

/**
 * 2. MENDAPATKAN GALERI BERDASARKAN ID
 */
/**
 * Mengambil satu data foto galeri berdasarkan ID-nya.
 * @param {string} id - ID galeri
 * @returns {Promise<object>} Data galeri
 * @throws {Error} Jika galeri tidak ditemukan
 */
export const getGalleryById = async (id) => {
  const gallery = await prisma.gallery.findUnique({
    where: { id },
  });
  if (!gallery) {
    const error = new Error("Data galeri tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return gallery;
};

/**
 * 3. MEMBUAT GALERI BARU
 */
/**
 * Mengunggah foto baru ke galeri umum (Cloudinary) dan menyimpan datanya ke database.
 * @param {object} payload - Keterangan gambar (caption)
 * @param {Buffer} [fileBuffer] - File gambar fisik
 * @returns {Promise<object>} Data galeri yang baru dibuat
 */
export const createGallery = async (payload, file) => {
  // 1. Validasi input form
  const validatedData = createGallerySchema.parse(payload);

  // 2. Wajib ada gambar
  if (!file) {
    const error = new Error("Gambar galeri wajib diunggah!");
    error.statusCode = 400;
    throw error;
  }

  // 3. Upload gambar ke R2
  let imageUrl = "";
  try {
    const uploadResult = await uploadImageToR2(file.buffer, "basoyen/gallery");
    imageUrl = uploadResult.secure_url;
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  // 5. Simpan ke database
  const newGallery = await prisma.gallery.create({
    data: {
      ...validatedData,
      image: imageUrl,
    },
  });

  return newGallery;
};

/**
 * 4. MEMPERBARUI GALERI
 */
export const updateGallery = async (id, payload, file) => {
  // 1. Validasi input
  const validatedData = updateGallerySchema.parse(payload);
  const existingGallery = await getGalleryById(id);
  const updateData = { ...validatedData };

  // 2. Jika ada gambar baru diupload
  if (file) {
    try {
      // 2a. Upload baru
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/gallery");
      updateData.image = uploadResult.secure_url;

      // 2b. Hapus gambar lama
      const oldObjectKey = extractObjectKey(existingGallery.image);
      if (oldObjectKey) {
        await deleteImageFromR2(oldObjectKey);
      }
    } catch (error) {
      const err = new Error(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  // 3. Update database
  const updatedGallery = await prisma.gallery.update({
    where: { id },
    data: updateData,
  });

  return updatedGallery;
};

/**
 * 5. MENGHAPUS GALERI
 */
/**
 * Menghapus foto galeri secara permanen, baik dari database maupun dari server Cloudinary.
 * @param {string} id - ID galeri yang akan dihapus
 * @returns {Promise<object>} Data galeri yang telah dihapus
 */
export const deleteGallery = async (id) => {
  const existingGallery = await getGalleryById(id);

  // 1. Hapus gambar dari awan
  const objectKey = extractObjectKey(existingGallery.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Hapus data dari db
  await prisma.gallery.delete({ where: { id } });

  return { message: "Data galeri berhasil dihapus beserta gambarnya" };
};
