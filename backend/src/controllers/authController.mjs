import * as authService from "../services/authService.mjs";
import { sendSuccess } from "../utils/response.mjs";

/**
 * Controller untuk menangani endpoint Login
 */
/**
 * Menangani HTTP Request untuk proses login pada login.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const login = async (req, res, next) => {
  try {
    // 1. Serahkan data mentah ke Service spesialis
    const result = await authService.loginAdmin(req.body);

    // 2. Jika sukses, siapkan Cookie rahasia (HttpOnly)
    // Parameter secure: true mewajibkan HTTPS (kita matikan jika sedang di localhost/development)
    const isProduction = process.env.NODE_ENV === "production";
    
    res.cookie("token", result.token, {
      httpOnly: true, // Tidak bisa dibaca oleh JavaScript (Anti-XSS)
      secure: isProduction, // Wajib HTTPS jika sudah online
      sameSite: isProduction ? "none" : "lax", // Pengaturan privasi lintas domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // Umur cookie (7 hari dalam milidetik)
    });

    // 3. Kirim pesan sukses ke Frontend (tanpa memberikan token secara eksplisit di body JSON)
    return sendSuccess(res, "Berhasil login", result.user);
  } catch (error) {
    // 4. Jika ada error (dari Service atau Validasi), lempar ke UGD (errorMiddleware)
    next(error);
  }
};

/**
 * Controller untuk menangani endpoint Logout
 */
/**
 * Menangani operasi logout.
 * Mengambil data dari request, meneruskannya ke layanan (service), lalu mengirimkan respons JSON.
 * @param {object} req - Objek Request Express
 * @param {object} res - Objek Response Express
 * @param {function} next - Fungsi next untuk melempar error ke middleware global
 */
export const logout = async (req, res, next) => {
  try {
    // Menghancurkan tiket dengan cara mengosongkan nilai cookie dan memendekkan umurnya
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return sendSuccess(res, "Berhasil logout");
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mengecek sesi aktif (getMe)
 */
export const getMe = async (req, res, next) => {
  try {
    // req.user.id didapatkan dari authMiddleware yang membongkar token JWT
    const user = await authService.getUserById(req.user.id);
    return sendSuccess(res, "Sesi aktif", user);
  } catch (error) {
    next(error);
  }
};
