import * as dashboardService from "../services/dashboardService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Menangani operasi dashboard stats.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    return sendSuccess(res, "Berhasil mengambil statistik dasbor", stats);
  } catch (error) {
    next(error);
  }
};
