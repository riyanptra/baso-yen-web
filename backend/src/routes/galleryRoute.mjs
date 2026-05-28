import express from "express";
import * as galleryController from "../controllers/galleryController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik
 */
router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

router.post(
  "/",
  upload.single("image"),
  handleUploadError,
  galleryController.createGallery
);

router.put(
  "/:id",
  upload.single("image"),
  handleUploadError,
  galleryController.updateGallery
);

router.delete("/:id", galleryController.deleteGallery);

export default router;
