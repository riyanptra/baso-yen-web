import * as articleService from "../services/articleService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua artikel
 */
/**
 * Menangani HTTP Request untuk mengambil semua data articles.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getAllArticles();
    return sendSuccess(res, "Berhasil mengambil data artikel", articles);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan detail artikel berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk article by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(id);
    return sendSuccess(res, "Berhasil mengambil data artikel", article);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat artikel baru (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada article.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createArticle = async (req, res, next) => {
  try {
    const adminId = req.user.id; 
    const file = req.file; 
    
    const article = await articleService.createArticle(req.body, file, adminId);
    
    return sendSuccess(res, "Berhasil membuat artikel baru", article, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui artikel yang sudah ada (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada article.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file; 
    
    const updatedArticle = await articleService.updateArticle(id, req.body, file);
    
    return sendSuccess(res, "Berhasil memperbarui artikel", updatedArticle);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus artikel secara permanen (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk menghapus data pada article.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await articleService.deleteArticle(id);
    
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
