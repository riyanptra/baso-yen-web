import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

export default router;
