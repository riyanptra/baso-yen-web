import { verifyToken } from "../utils/jwt.mjs";
import { sendError } from "../utils/response.mjs";

/**
 * Middleware untuk memproteksi rute agar hanya bisa diakses oleh pengguna yang sudah login.
 * Memeriksa keberadaan token JWT pada header Authorization (Bearer).
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi untuk melanjutkan ke middleware atau controller berikutnya
 */
export const protect = (req, res, next) => {
  try {
    let token;

    // 1. Cek apakah ada tiket (token) di dalam cookies browser
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // 2. Cadangan: Cek apakah tiket dikirim lewat Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Jika tidak bawa tiket sama sekali, usir!
    if (!token) {
      return sendError(res, "Anda belum login. Akses ditolak.", 401);
    }

    // Verifikasi keaslian tiket
    const decoded = verifyToken(token);

    // Tempelkan data diri si pengguna (dari tiket) ke objek request agar bisa dipakai di rute selanjutnya
    req.user = decoded;

    next(); // Lolos, silakan masuk!
  } catch (error) {
    next(error); // Jika tiket palsu/kedaluwarsa, lempar ke errorMiddleware
  }
};
