import * as recipeService from "../services/recipeService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Mendapatkan semua resep
 */
/**
 * Menangani HTTP Request untuk mengambil semua data recipes.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return sendSuccess(res, "Berhasil mengambil data resep", recipes);
  } catch (error) {
    next(error);
  }
};

/**
 * Mendapatkan detail resep berdasarkan ID
 */
/**
 * Menangani HTTP Request untuk mengambil data spesifik (berdasarkan ID) untuk recipe by id.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    return sendSuccess(res, "Berhasil mengambil data resep", recipe);
  } catch (error) {
    next(error);
  }
};

/**
 * Membuat resep baru (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada recipe.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createRecipe = async (req, res, next) => {
  try {
    const adminId = req.user.id; 
    const file = req.file; 
    
    const recipe = await recipeService.createRecipe(req.body, file, adminId);
    
    return sendSuccess(res, "Berhasil membuat resep baru", recipe, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui resep yang sudah ada (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada recipe.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file; 
    
    const updatedRecipe = await recipeService.updateRecipe(id, req.body, file);
    
    return sendSuccess(res, "Berhasil memperbarui resep", updatedRecipe);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus resep secara permanen (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk menghapus data pada recipe.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await recipeService.deleteRecipe(id);
    
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
