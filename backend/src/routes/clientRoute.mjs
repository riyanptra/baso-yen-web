import express from "express";
import * as clientController from "../controllers/clientController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";
import { upload, handleUploadError } from "../middlewares/uploadMiddleware.mjs";

const router = express.Router();

/**
 * Rute Publik
 */
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);

/**
 * Rute Privat (Hanya Admin)
 */
router.use(protect);

router.post(
  "/",
  upload.single("image"),
  handleUploadError,
  clientController.createClient
);

router.put(
  "/:id",
  upload.single("image"),
  handleUploadError,
  clientController.updateClient
);

router.delete("/:id", clientController.deleteClient);

export default router;
