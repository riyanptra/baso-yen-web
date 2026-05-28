import * as categoryService from "../services/categoryService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua kategori
 * Mendukung filter tipe melalui query: ?type=PRODUCT
 */
/**
 * Menangani HTTP Request untuk mengambil semua data categories.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllCategories = async (req, res, next) => {
  try {
    const { type } = req.query; // Ambil filter dari URL jika ada
    const categories = await categoryService.getAllCategories(type);

    return sendSuccess(res, "Berhasil mengambil data kategori", categories);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan satu kategori berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk category by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    return sendSuccess(res, "Berhasil mengambil data kategori", category);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat kategori baru
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada category.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);

    // Status 201 menandakan "Created" (Berhasil Dibuat)
    return sendSuccess(res, "Berhasil membuat kategori baru", category, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui kategori
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada category.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCategory = await categoryService.updateCategory(id, req.body);

    return sendSuccess(res, "Berhasil memperbarui kategori", updatedCategory);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus kategori
 */
/**
 * Menangani HTTP Request untuk menghapus data pada category.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);

    return sendSuccess(res, "Kategori berhasil dihapus");
  } catch (error) {
    next(error);
  }
};
