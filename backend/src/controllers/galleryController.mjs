import * as galleryService from "../services/galleryService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua galeri
 */
/**
 * Menangani HTTP Request untuk mengambil semua data galleries.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllGalleries = async (req, res, next) => {
  try {
    // 1. Panggil service untuk mengambil semua data galeri
    const galleries = await galleryService.getAllGalleries();
    
    // 2. Kirim balasan sukses ke frontend
    return sendSuccess(res, "Berhasil mengambil data galeri", galleries);
  } catch (error) {
    // 3. Jika ada error, lempar ke middleware penanganan error
    next(error);
  }
};

/**
 * Mendapatkan galeri berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk gallery by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getGalleryById = async (req, res, next) => {
  try {
    // 1. Ambil ID dari parameter URL
    const { id } = req.params;
    
    // 2. Panggil service untuk mencari galeri spesifik
    const gallery = await galleryService.getGalleryById(id);
    
    // 3. Kirim balasan sukses ke frontend
    return sendSuccess(res, "Berhasil mengambil data galeri", gallery);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat galeri baru
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada gallery.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createGallery = async (req, res, next) => {
  try {
    // 1. Ambil file gambar yang diunggah
    const file = req.file;
    
    // 2. Panggil service untuk membuat galeri baru di database
    const gallery = await galleryService.createGallery(req.body, file);
    
    // 3. Kirim status 201 (Created) ke frontend
    return sendSuccess(res, "Berhasil membuat data galeri baru", gallery, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui galeri
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada gallery.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateGallery = async (req, res, next) => {
  try {
    // 1. Ambil ID galeri yang ingin diupdate
    const { id } = req.params;
    const file = req.file; // Bisa ada, bisa tidak
    
    // 2. Eksekusi proses update di service
    const updatedGallery = await galleryService.updateGallery(id, req.body, file);
    
    // 3. Kirim balasan sukses
    return sendSuccess(res, "Berhasil memperbarui data galeri", updatedGallery);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus galeri
 */
/**
 * Menangani HTTP Request untuk menghapus data pada gallery.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteGallery = async (req, res, next) => {
  try {
    // 1. Ambil ID galeri yang ingin dihapus
    const { id } = req.params;
    
    // 2. Eksekusi penghapusan (database & cloudinary)
    const result = await galleryService.deleteGallery(id);
    
    // 3. Kirim pesan konfirmasi
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
