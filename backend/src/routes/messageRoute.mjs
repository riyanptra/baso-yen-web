import express from "express";
import * as messageController from "../controllers/messageController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

/* =========================================================================
 * RUTE PUBLIK (Untuk Pengunjung Website)
 * ========================================================================= */

// Endpoint untuk pengunjung mengirim pesan dari form Contact Us
router.post("/contact", messageController.createServiceMessage);

// Endpoint untuk pengunjung B2B meminta sampel produk
router.post("/sample-request", messageController.createSampleRequest);


/* =========================================================================
 * RUTE PRIVAT (Untuk Admin di Dasbor CMS)
 * ========================================================================= */

// Pasang satpam (hanya admin yang bisa mengakses rute di bawah ini)
router.use(protect);

// ---- API Pesan Kontak (Contact Us) ----
router.get("/contact", messageController.getAllServiceMessages);
router.patch("/contact/:id/status", messageController.updateServiceMessageStatus);
router.delete("/contact/:id", messageController.deleteServiceMessage);

// ---- API Permintaan Sampel (Sample Requests) ----
router.get("/sample-request", messageController.getAllSampleRequests);
router.patch("/sample-request/:id/status", messageController.updateSampleRequestStatus);
router.delete("/sample-request/:id", messageController.deleteSampleRequest);

export default router;
