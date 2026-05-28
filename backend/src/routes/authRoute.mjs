import express from "express";
import * as authController from "../controllers/authController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

// Rute Publik (Siapapun bisa mencoba login)
router.post("/login", authController.login);

// Rute Privat (Hanya orang yang sudah punya tiket cookie)
router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);

export default router;
