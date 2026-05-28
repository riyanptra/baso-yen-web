import { prisma } from "../lib/prisma.mjs";
import {
  createServiceMessageSchema,
  updateServiceMessageStatusSchema,
  createSampleRequestSchema,
  updateSampleRequestStatusSchema,
} from "../validations/messageValidation.mjs";
import { sendNotificationEmail } from "../utils/mailer.mjs";

/* =========================================================================
 * BAGIAN 1: SERVICE MESSAGE (PESAN KONTAK)
 * ========================================================================= */

/**
 * Mengambil semua pesan (Contact atau Sample Request) dari database.
 * Diurutkan dari yang terbaru.
 * @param {string} type - Jenis pesan ('CONTACT' atau 'SAMPLE_REQUEST')
 * @returns {Promise<Array>} Daftar pesan
 */
export const getAllServiceMessages = async () => {
  // 1. Ambil data dari database, urutkan dari yang terbaru
  const messages = await prisma.serviceMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return messages;
};

/**
 * Menyimpan pesan baru yang dikirimkan oleh pengunjung dari halaman depan (Landing Page).
 * Otomatis mengirimkan email balasan (auto-reply) jika email disertakan.
 * @param {string} type - Jenis pesan ('CONTACT' atau 'SAMPLE_REQUEST')
 * @param {object} payload - Isi pesan (nama, email, subjek, dll)
 * @returns {Promise<object>} Data pesan yang baru dibuat
 */
export const createServiceMessage = async (payload) => {
  // 1. Validasi input pengunjung
  const validatedData = createServiceMessageSchema.parse(payload);

  // 2. Simpan pesan ke database
  const newMessage = await prisma.serviceMessage.create({
    data: validatedData,
  });

  // 3. Kirim notifikasi via Email
  const emailHtml = `
    <h2>Pesan Baru dari Website Baso Yen</h2>
    <p><strong>Nama:</strong> ${newMessage.name}</p>
    <p><strong>Email:</strong> ${newMessage.email}</p>
    <p><strong>No. Kontak:</strong> ${newMessage.phone || '-'}</p>
    <p><strong>Isi Pesan:</strong></p>
    <blockquote style="border-left: 4px solid #E31E24; padding-left: 10px; margin-left: 0; background-color: #f9f9f9; padding: 15px;">
      ${newMessage.content}
    </blockquote>
    <p><small>Silakan login ke Dasbor Admin Baso Yen untuk merespons pesan ini.</small></p>
  `;
  await sendNotificationEmail("Pesan Kontak Baru - Baso Yen", emailHtml, newMessage.email);

  return newMessage;
};

/**
 * Memperbarui status baca / penanganan dari sebuah pesan (misal: 'UNREAD' menjadi 'READ').
 * @param {string} id - ID pesan
 * @param {string} status - Status baru ('READ', 'UNREAD', 'PENDING', 'PROCESSED', dll)
 * @returns {Promise<object>} Data pesan yang diperbarui
 */
export const updateServiceMessageStatus = async (id, payload) => {
  // 1. Validasi status
  const validatedData = updateServiceMessageStatusSchema.parse(payload);

  // 2. Pastikan pesan ada
  const existing = await prisma.serviceMessage.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Pesan kontak tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  // 3. Update statusnya
  const updatedMessage = await prisma.serviceMessage.update({
    where: { id },
    data: { status: validatedData.status },
  });

  return updatedMessage;
};

/**
 * Mengambil satu pesan spesifik berdasarkan ID.
 * @param {string} id - ID pesan
 * @returns {Promise<object>} Data pesan
 * @throws {Error} Jika pesan tidak ditemukan
 */
export const getMessageById = async (id) => {
  // 1. Pastikan pesan ada
  const existing = await prisma.serviceMessage.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Pesan kontak tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  return existing;
};

/**
 * 4. MENGHAPUS PESAN KONTAK
 */
export const deleteServiceMessage = async (id) => {
  // 1. Pastikan pesan ada
  const existing = await prisma.serviceMessage.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Pesan kontak tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  // 2. Hapus pesan dari database
  await prisma.serviceMessage.delete({ where: { id } });

  return { message: "Pesan kontak berhasil dihapus permanen" };
};


/* =========================================================================
 * BAGIAN 2: SAMPLE REQUEST MESSAGE (PERMINTAAN SAMPEL B2B)
 * ========================================================================= */

/**
 * 1. MENDAPATKAN SEMUA PERMINTAAN SAMPEL
 */
export const getAllSampleRequests = async () => {
  // 1. Ambil data dari database, urutkan dari yang terbaru
  const requests = await prisma.sampleRequestMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return requests;
};

/**
 * 2. MENGIRIM PERMINTAAN SAMPEL BARU (Dari Pengunjung B2B)
 */
export const createSampleRequest = async (payload) => {
  // 1. Validasi input form pengunjung
  const validatedData = createSampleRequestSchema.parse(payload);

  // 2. Simpan permintaan sampel ke database
  const newRequest = await prisma.sampleRequestMessage.create({
    data: validatedData,
  });

  // 3. Kirim notifikasi via Email
  const emailHtml = `
    <h2>Pengajuan Sample Usaha Baru - Baso Yen</h2>
    <p><strong>Nama Pemilik/Perwakilan:</strong> ${newRequest.name}</p>
    <p><strong>Nama Usaha Kuliner:</strong> ${newRequest.businessName}</p>
    <p><strong>Kota Usaha:</strong> ${newRequest.city}</p>
    <p><strong>Email:</strong> ${newRequest.email}</p>
    <p><strong>No. WhatsApp:</strong> ${newRequest.phone}</p>
    <br/>
    <p><small>Silakan login ke Dasbor Admin Baso Yen untuk mengelola dan memproses permintaan ini.</small></p>
  `;
  await sendNotificationEmail("Pengajuan Sample Usaha Baru - Baso Yen", emailHtml, newRequest.email);

  return newRequest;
};

/**
 * 3. MENGUBAH STATUS PERMINTAAN SAMPEL (PENDING -> PROCESSED -> COMPLETED)
 */
export const updateSampleRequestStatus = async (id, payload) => {
  // 1. Validasi status
  const validatedData = updateSampleRequestStatusSchema.parse(payload);

  // 2. Pastikan permintaan ada
  const existing = await prisma.sampleRequestMessage.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Permintaan sampel tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  // 3. Update statusnya
  const updatedRequest = await prisma.sampleRequestMessage.update({
    where: { id },
    data: { status: validatedData.status },
  });

  return updatedRequest;
};

/**
 * 4. MENGHAPUS PERMINTAAN SAMPEL
 */
export const deleteSampleRequest = async (id) => {
  // 1. Pastikan permintaan ada
  const existing = await prisma.sampleRequestMessage.findUnique({ where: { id } });
  if (!existing) {
    const error = new Error("Permintaan sampel tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }

  // 2. Hapus data dari database
  await prisma.sampleRequestMessage.delete({ where: { id } });

  return { message: "Data permintaan sampel berhasil dihapus permanen" };
};
