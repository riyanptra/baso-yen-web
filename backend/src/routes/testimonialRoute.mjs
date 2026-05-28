import express from "express";
import { testimonialController } from "../controllers/testimonialController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik
 * Bisa diakses oleh siapa saja (untuk ditampilkan di Landing Page)
 */
router.get("/", testimonialController.getAll);
router.get("/:id", testimonialController.getById);

/**
 * Rute Privat (Hanya Admin)
 * Membutuhkan login (cookie)
 */
router.use(protect);

router.post(
  "/",
  upload.single("avatar"),
  handleUploadError,
  testimonialController.create
);

router.put(
  "/:id",
  upload.single("avatar"),
  handleUploadError,
  testimonialController.update
);

router.delete("/:id", testimonialController.delete);

export default router;
