import express from "express";
import * as settingController from "../controllers/settingController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik
 */
router.get("/", settingController.getAllSettings);
router.get("/:key", settingController.getSettingByKey);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

router.post("/", settingController.createSetting);
router.put("/:key", settingController.updateSetting);
router.delete("/:key", settingController.deleteSetting);

export default router;
