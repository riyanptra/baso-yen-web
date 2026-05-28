import express from "express";
import * as productController from "../controllers/productController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik (Bisa diakses Frontend untuk menampilkan katalog)
 */
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

// Endpoint POST dengan multer upload.single('image') untuk menerima 1 foto bernama 'image'
router.post(
  "/",
  upload.single("image"),
  handleUploadError, // Tangkap error jika gambar terlalu besar/format salah
  productController.createProduct,
);

// Endpoint PUT juga bisa menerima gambar baru (opsional)
router.put(
  "/:id",
  upload.single("image"),
  handleUploadError,
  productController.updateProduct,
);

router.delete("/:id", productController.deleteProduct);

export default router;
