import * as clientService from "../services/clientService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua klien
 */
/**
 * Menangani HTTP Request untuk mengambil semua data clients.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllClients = async (req, res, next) => {
  try {
    // 1. Panggil service untuk mengambil semua data klien
    const clients = await clientService.getAllClients();
    
    // 2. Kirim balasan sukses ke frontend
    return sendSuccess(res, "Berhasil mengambil data klien", clients);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan klien berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk client by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getClientById = async (req, res, next) => {
  try {
    // 1. Ambil ID dari parameter URL
    const { id } = req.params;
    
    // 2. Panggil service untuk mencari klien spesifik
    const client = await clientService.getClientById(id);
    
    // 3. Kirim balasan sukses
    return sendSuccess(res, "Berhasil mengambil data klien", client);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat klien baru
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada client.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createClient = async (req, res, next) => {
  try {
    // 1. Ambil file logo yang diunggah
    const file = req.file;
    
    // 2. Eksekusi pembuatan klien baru
    const client = await clientService.createClient(req.body, file);
    
    // 3. Kirim status 201 (Created)
    return sendSuccess(res, "Berhasil membuat data klien baru", client, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui klien
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada client.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateClient = async (req, res, next) => {
  try {
    // 1. Ambil ID klien
    const { id } = req.params;
    const file = req.file; // Opsional
    
    // 2. Update data melalui service
    const updatedClient = await clientService.updateClient(id, req.body, file);
    
    // 3. Kirim respons berhasil
    return sendSuccess(res, "Berhasil memperbarui data klien", updatedClient);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus klien
 */
/**
 * Menangani HTTP Request untuk menghapus data pada client.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteClient = async (req, res, next) => {
  try {
    // 1. Tentukan ID yang dihapus
    const { id } = req.params;
    
    // 2. Lakukan proses hapus
    const result = await clientService.deleteClient(id);
    
    // 3. Kembalikan pesan konfirmasi
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
