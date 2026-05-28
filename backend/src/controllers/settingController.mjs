import * as settingService from "../services/settingService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua pengaturan
 */
/**
 * Menangani HTTP Request untuk mengambil semua data settings.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllSettings = async (req, res, next) => {
  try {
    // 1. Minta service mengambil semua data pengaturan
    const settings = await settingService.getAllSettings();
    
    // 2. Kirim balasan ke frontend
    return sendSuccess(res, "Berhasil mengambil data pengaturan", settings);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan pengaturan berdasarkan KEY
 */
/**
 * Menangani operasi setting by key.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getSettingByKey = async (req, res, next) => {
  try {
    // 1. Ambil KEY (misal: "contact_whatsapp") dari URL
    const { key } = req.params;
    
    // 2. Cari pengaturan spesifik
    const setting = await settingService.getSettingByKey(key);
    
    // 3. Kirim hasil
    return sendSuccess(res, "Berhasil mengambil data pengaturan", setting);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat pengaturan baru
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada setting.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createSetting = async (req, res, next) => {
  try {
    // 1. Teruskan body JSON ke service untuk disimpan
    const setting = await settingService.createSetting(req.body);
    
    // 2. Beri status sukses (201)
    return sendSuccess(res, "Berhasil membuat pengaturan baru", setting, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui pengaturan berdasarkan KEY
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada setting.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateSetting = async (req, res, next) => {
  try {
    // 1. Ambil nama KEY dari URL
    const { key } = req.params;
    
    // 2. Lakukan proses update
    const updatedSetting = await settingService.updateSetting(key, req.body);
    
    // 3. Kirim data yang sudah terupdate
    return sendSuccess(res, "Berhasil memperbarui pengaturan", updatedSetting);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus pengaturan berdasarkan KEY
 */
/**
 * Menangani HTTP Request untuk menghapus data pada setting.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteSetting = async (req, res, next) => {
  try {
    // 1. Ambil nama KEY dari URL
    const { key } = req.params;
    
    // 2. Eksekusi penghapusan
    const result = await settingService.deleteSetting(key);
    
    // 3. Kirim pesan konfirmasi
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
