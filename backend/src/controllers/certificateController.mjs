import * as certificateService from "../services/certificateService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua sertifikat
 */
/**
 * Menangani HTTP Request untuk mengambil semua data certificates.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllCertificates = async (req, res, next) => {
  try {
    // 1. Panggil service untuk mengambil semua data sertifikat
    const certificates = await certificateService.getAllCertificates();
    
    // 2. Kirim balasan sukses ke frontend
    return sendSuccess(res, "Berhasil mengambil data sertifikat", certificates);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan sertifikat berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk certificate by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getCertificateById = async (req, res, next) => {
  try {
    // 1. Ambil ID sertifikat dari parameter URL
    const { id } = req.params;
    
    // 2. Eksekusi pencarian di service
    const certificate = await certificateService.getCertificateById(id);
    
    // 3. Kirim hasil temuan ke frontend
    return sendSuccess(res, "Berhasil mengambil data sertifikat", certificate);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat sertifikat baru
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada certificate.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createCertificate = async (req, res, next) => {
  try {
    // 1. Ambil file gambar dan icon sertifikat
    const files = req.files || {};
    
    // 2. Lempar ke service untuk divalidasi dan diunggah ke Cloudinary
    const certificate = await certificateService.createCertificate(req.body, files);
    
    // 3. Beri respons berhasil (HTTP 201)
    return sendSuccess(res, "Berhasil membuat sertifikat baru", certificate, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui sertifikat
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada certificate.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateCertificate = async (req, res, next) => {
  try {
    // 1. Ambil ID yang mau diupdate
    const { id } = req.params;
    const files = req.files || {}; // File baru jika ada
    
    // 2. Lakukan proses update
    const updatedCertificate = await certificateService.updateCertificate(id, req.body, files);
    
    // 3. Kirim konfirmasi berhasil
    return sendSuccess(res, "Berhasil memperbarui data sertifikat", updatedCertificate);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus sertifikat
 */
/**
 * Menangani HTTP Request untuk menghapus data pada certificate.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteCertificate = async (req, res, next) => {
  try {
    // 1. Ambil ID target
    const { id } = req.params;
    
    // 2. Eksekusi penghapusan menyeluruh
    const result = await certificateService.deleteCertificate(id);
    
    // 3. Kembalikan pesan ke pengguna
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
