import { prisma } from "../lib/prisma.mjs";
import { createClientSchema, updateClientSchema } from "../validations/clientValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";



/**
 * 1. MENDAPATKAN SEMUA KLIEN
 */
/**
 * Mengambil semua data Mitra / Klien dari database.
 * Diurutkan dari yang terbaru.
 * @returns {Promise<Array>} Daftar mitra
 */
export const getAllClients = async () => {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });
  return clients;
};

/**
 * 2. MENDAPATKAN KLIEN BERDASARKAN ID
 */
/**
 * Mengambil satu mitra berdasarkan ID-nya.
 * @param {string} id - ID mitra
 * @returns {Promise<object>} Data mitra
 * @throws {Error} Jika mitra tidak ditemukan
 */
export const getClientById = async (id) => {
  const client = await prisma.client.findUnique({
    where: { id },
  });
  if (!client) {
    const error = new Error("Data klien tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return client;
};

/**
 * 3. MEMBUAT KLIEN BARU
 */
/**
 * Membuat data mitra baru, termasuk mengunggah logonya ke Cloudinary jika ada file yang disertakan.
 * @param {object} payload - Data teks mitra (name, description, link)
 * @param {Buffer} [fileBuffer] - File logo (opsional)
 * @returns {Promise<object>} Data mitra yang baru dibuat
 */
export const createClient = async (payload, file) => {
  // 1. Validasi input
  const validatedData = createClientSchema.parse(payload);

  // 2. Wajib ada gambar logo
  if (!file) {
    const error = new Error("Logo klien wajib diunggah!");
    error.statusCode = 400;
    throw error;
  }

  // 3. Upload gambar ke R2
  let imageUrl = "";
  try {
    const uploadResult = await uploadImageToR2(file.buffer, "basoyen/clients");
    imageUrl = uploadResult.secure_url;
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  // 5. Simpan ke database
  const newClient = await prisma.client.create({
    data: {
      ...validatedData,
      image: imageUrl,
    },
  });

  return newClient;
};

/**
 * 4. MEMPERBARUI KLIEN
 */
/**
 * Memperbarui data mitra.
 * Jika terdapat file logo baru, sistem akan otomatis menghapus logo lama dari Cloudinary.
 * @param {string} id - ID mitra
 * @param {object} payload - Perubahan data teks mitra
 * @param {Buffer} [fileBuffer] - File logo baru (opsional)
 * @returns {Promise<object>} Data mitra setelah diperbarui
 */
export const updateClient = async (id, payload, file) => {
  // 1. Validasi
  const validatedData = updateClientSchema.parse(payload);
  const existingClient = await getClientById(id);
  const updateData = { ...validatedData };

  // 2. Jika ada gambar logo baru
  if (file) {
    try {
      const uploadResult = await uploadImageToR2(file.buffer, "basoyen/clients");
      updateData.image = uploadResult.secure_url;

      const oldObjectKey = extractObjectKey(existingClient.image);
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
  const updatedClient = await prisma.client.update({
    where: { id },
    data: updateData,
  });

  return updatedClient;
};

/**
 * 5. MENGHAPUS KLIEN
 */
/**
 * Menghapus mitra dari database, sekaligus membersihkan logonya dari server Cloudinary.
 * @param {string} id - ID mitra yang akan dihapus
 * @returns {Promise<object>} Data mitra yang berhasil dihapus
 */
export const deleteClient = async (id) => {
  const existingClient = await getClientById(id);

  // 1. Hapus gambar logo dari R2
  const objectKey = extractObjectKey(existingClient.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Hapus data
  await prisma.client.delete({ where: { id } });

  return { message: "Data klien berhasil dihapus beserta logonya" };
};
