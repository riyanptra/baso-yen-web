import express from "express";
import * as categoryController from "../controllers/categoryController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik (Bisa diakses oleh pengunjung website)
 */
// Mengambil semua kategori (bisa tambah ?type=PRODUCT)
router.get("/", categoryController.getAllCategories);
// Mengambil 1 kategori spesifik
router.get("/:id", categoryController.getCategoryById);

/**
 * Rute Privat (Hanya bisa diakses oleh Admin yang sudah login)
 */
// Mengunci semua rute di bawah ini menggunakan middleware 'protect'
router.use(protect);

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
