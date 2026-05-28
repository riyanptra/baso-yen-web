import { prisma } from "../lib/prisma.mjs";
import { createCertificateSchema, updateCertificateSchema } from "../validations/certificateValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";



/**
 * 1. MENDAPATKAN SEMUA SERTIFIKAT
 */
/**
 * Mengambil semua data sertifikat mutu perusahaan dari database.
 * Diurutkan dari yang terbaru (berdasarkan tanggal dibuat).
 * @returns {Promise<Array>} Daftar semua sertifikat
 */
export const getAllCertificates = async () => {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return certificates;
};

/**
 * 2. MENDAPATKAN SERTIFIKAT BERDASARKAN ID
 */
/**
 * Mengambil data satu sertifikat secara spesifik berdasarkan ID-nya.
 * @param {string} id - ID unik sertifikat
 * @returns {Promise<object>} Data sertifikat
 * @throws {Error} Jika sertifikat tidak ditemukan
 */
export const getCertificateById = async (id) => {
  const certificate = await prisma.certificate.findUnique({
    where: { id },
  });
  if (!certificate) {
    const error = new Error("Data sertifikat tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return certificate;
};

/**
 * 3. MEMBUAT SERTIFIKAT BARU
 */
/**
 * Membuat data sertifikat baru, termasuk mengunggah gambarnya ke Cloudinary jika ada.
 * @param {object} payload - Data teks sertifikat (nama, otoritas, nomor registrasi, dll)
 * @param {Buffer} [fileBuffer] - File gambar sertifikat (opsional)
 * @returns {Promise<object>} Data sertifikat yang baru dibuat
 */
export const createCertificate = async (payload, file) => {
  // 1. Validasi input
  const validatedData = createCertificateSchema.parse(payload);

  // 2. Upload gambar ke R2 (Opsional)
  let imageUrl = null;
  if (file) {
    try {
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/certificates");
      imageUrl = uploadResult.secure_url;
    } catch (error) {
      const err = new Error(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  // 4. Simpan ke database
  const newCertificate = await prisma.certificate.create({
    data: {
      ...validatedData,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  return newCertificate;
};

/**
 * 4. MEMPERBARUI SERTIFIKAT
 */
/**
 * Memperbarui data sertifikat yang sudah ada. 
 * Jika ada gambar baru, gambar lama akan dihapus dari Cloudinary dan diganti dengan yang baru.
 * @param {string} id - ID sertifikat
 * @param {object} payload - Perubahan data teks sertifikat
 * @param {Buffer} [fileBuffer] - File gambar sertifikat baru (opsional)
 * @returns {Promise<object>} Data sertifikat setelah diperbarui
 */
export const updateCertificate = async (id, payload, file) => {
  // 1. Validasi
  const validatedData = updateCertificateSchema.parse(payload);
  const existingCertificate = await getCertificateById(id);
  const updateData = { ...validatedData };

  // 2. Jika ada gambar baru
  if (file) {
    try {
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/certificates");
      updateData.image = uploadResult.secure_url;

      const oldObjectKey = extractObjectKey(existingCertificate.image);
      if (oldObjectKey) {
        await deleteImageFromR2(oldObjectKey);
      }
    } catch (error) {
      const err = new Error(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  // 3. Simpan perubahan
  const updatedCertificate = await prisma.certificate.update({
    where: { id },
    data: updateData,
  });

  return updatedCertificate;
};

/**
 * 5. MENGHAPUS SERTIFIKAT
 */
/**
 * Menghapus sertifikat dari database beserta gambar aslinya di Cloudinary.
 * @param {string} id - ID sertifikat yang akan dihapus
 * @returns {Promise<object>} Data sertifikat yang telah dihapus
 */
export const deleteCertificate = async (id) => {
  const existingCertificate = await getCertificateById(id);

  // 1. Hapus gambar dari awan
  const objectKey = extractObjectKey(existingCertificate.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Hapus data
  await prisma.certificate.delete({ where: { id } });

  return { message: "Data sertifikat berhasil dihapus beserta gambarnya" };
};
