import express from "express";
import * as certificateController from "../controllers/certificateController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik
 */
router.get("/", certificateController.getAllCertificates);
router.get("/:id", certificateController.getCertificateById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "icon", maxCount: 1 }]),
  handleUploadError,
  certificateController.createCertificate
);

router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "icon", maxCount: 1 }]),
  handleUploadError,
  certificateController.updateCertificate
);

router.delete("/:id", certificateController.deleteCertificate);

export default router;
