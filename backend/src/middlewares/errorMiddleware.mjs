import { sendError } from "../utils/response.mjs";

/**
 * Middleware penanganan kesalahan (Error Handler) global untuk aplikasi Express.
 * Menangkap semua error dan mengembalikannya dalam format JSON yang terstandardisasi.
 * @param {Error|object} err - Objek Error yang dilemparkan
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next (wajib ada 4 argumen agar dikenali Express sebagai error handler)
 */
export const errorHandler = (err, req, res, next) => {
  console.error("🔴 Terjadi Error:", err);

  // Error dari Prisma (Database)
  if (err.code === "P2002") {
    return sendError(
      res,
      "Data sudah ada di database (Bentrok data unik).",
      409,
    );
  }
  if (err.code === "P2025") {
    return sendError(res, "Data tidak ditemukan.", 404);
  }

  // Error Validasi dari Zod
  if (err.name === "ZodError") {
    // Terkadang Zod menyimpan detail di "issues", terkadang di "errors"
    const zodIssues = err.issues || err.errors || [];
    const errors = zodIssues.map((e) => ({
      field: e.path ? e.path.join(".") : "unknown",
      message: e.message,
    }));
    return sendError(res, "Validasi Gagal", 400, errors);
  }

  // Error dari JWT (Token)
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Sesi tidak valid. Silakan login kembali.", 401);
  }
  if (err.name === "TokenExpiredError") {
    return sendError(
      res,
      "Sesi Anda telah kedaluwarsa. Silakan login kembali.",
      401,
    );
  }

  // Penanganan Error Bawaan (Bila error tidak dikenali)
  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan internal pada server.";

  return sendError(res, message, statusCode);
};
