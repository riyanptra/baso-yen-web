import express from "express";
import * as articleController from "../controllers/articleController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik (Bisa diakses tanpa login)
 */
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

// Endpoint POST dengan middleware upload gambar
router.post(
  "/",
  upload.single("image"),
  handleUploadError,
  articleController.createArticle
);

router.put(
  "/:id",
  upload.single("image"),
  handleUploadError,
  articleController.updateArticle
);

router.delete("/:id", articleController.deleteArticle);

export default router;
