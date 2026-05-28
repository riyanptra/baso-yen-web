import * as messageService from "../services/messageService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/* =========================================================================
 * BAGIAN 1: SERVICE MESSAGE (PESAN KONTAK)
 * ========================================================================= */

/**
 * Mendapatkan semua pesan kontak (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk mengambil semua data service messages.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllServiceMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getAllServiceMessages();
    return sendSuccess(res, "Berhasil mengambil semua pesan kontak", messages);
  } catch (error) {
    next(error);
  }
};

/**
 * Mengirim pesan kontak (Publik)
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada service message.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createServiceMessage = async (req, res, next) => {
  try {
    const message = await messageService.createServiceMessage(req.body);
    return sendSuccess(res, "Pesan Anda berhasil dikirim", message, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Mengubah status pesan (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada service message status.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateServiceMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await messageService.updateServiceMessageStatus(id, req.body);
    return sendSuccess(res, "Status pesan berhasil diperbarui", message);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus pesan kontak (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk menghapus data pada service message.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteServiceMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await messageService.deleteServiceMessage(id);
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};

/* =========================================================================
 * BAGIAN 2: SAMPLE REQUEST MESSAGE (PERMINTAAN SAMPEL B2B)
 * ========================================================================= */

/**
 * Mendapatkan semua permintaan sampel (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk mengambil semua data sample requests.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getAllSampleRequests = async (req, res, next) => {
  try {
    const requests = await messageService.getAllSampleRequests();
    return sendSuccess(res, "Berhasil mengambil data permintaan sampel", requests);
  } catch (error) {
    next(error);
  }
};

/**
 * Mengirim permintaan sampel (Publik)
 */
/**
 * Menangani HTTP Request untuk membuat data baru pada sample request.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const createSampleRequest = async (req, res, next) => {
  try {
    const request = await messageService.createSampleRequest(req.body);
    return sendSuccess(res, "Permintaan sampel Anda berhasil dikirim", request, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Mengubah status permintaan sampel (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk memperbarui data pada sample request status.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const updateSampleRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await messageService.updateSampleRequestStatus(id, req.body);
    return sendSuccess(res, "Status permintaan sampel berhasil diperbarui", request);
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus permintaan sampel (Hanya Admin)
 */
/**
 * Menangani HTTP Request untuk menghapus data pada sample request.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const deleteSampleRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await messageService.deleteSampleRequest(id);
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};
