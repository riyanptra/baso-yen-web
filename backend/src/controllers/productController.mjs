import * as productService from "../services/productService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Menangani HTTP Request untuk mengambil semua data products.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return sendSuccess(res, "Berhasil mengambil data produk", products);
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk product by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return sendSuccess(res, "Berhasil mengambil data produk", product);
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani HTTP Request untuk membuat data baru pada product.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createProduct = async (req, res, next) => {
  try {
    // req.user.id didapat dari authMiddleware
    const adminId = req.user.id;
    // req.file didapat dari uploadMiddleware (multer)
    const file = req.file;

    const product = await productService.createProduct(req.body, file, adminId);

    return sendSuccess(res, "Berhasil membuat produk baru", product, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani HTTP Request untuk memperbarui data pada product.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file; // Opsional

    const updatedProduct = await productService.updateProduct(
      id,
      req.body,
      file,
    );

    return sendSuccess(res, "Berhasil memperbarui produk", updatedProduct);
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani HTTP Request untuk menghapus data pada product.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);

    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
