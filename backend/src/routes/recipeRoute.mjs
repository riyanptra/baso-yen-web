import express from "express";
import * as recipeController from "../controllers/recipeController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik (Bisa diakses tanpa login)
 */
router.get("/", recipeController.getAllRecipes);
router.get("/:id", recipeController.getRecipeById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

// Endpoint POST dengan middleware upload gambar
router.post(
  "/",
  upload.single("image"),
  handleUploadError,
  recipeController.createRecipe
);

router.put(
  "/:id",
  upload.single("image"),
  handleUploadError,
  recipeController.updateRecipe
);

router.delete("/:id", recipeController.deleteRecipe);

export default router;
