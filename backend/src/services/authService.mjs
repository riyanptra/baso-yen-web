import { prisma } from "../lib/prisma.mjs";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.mjs";
import { loginSchema } from "../validations/authValidation.mjs";

/**
 * Logika Bisnis untuk Login Admin
 * @param {Object} payload - Objek berisi email dan password mentah
 * @returns {Promise<Object>} - Objek berisi data user dan tiket JWT
 */
/**
 * Melakukan proses autentikasi (login) untuk Admin.
 * Memeriksa kecocokan email dan password di database.
 * @param {object} payload - Objek yang menampung email dan password
 * @returns {Promise<object>} Data pengguna yang berhasil login (tanpa password)
 * @throws {Error} Jika kredensial tidak valid
 */
export const loginAdmin = async (payload) => {
  // 1. Validasi Zod (Jika gagal, otomatis melempar error ke middleware)
  const validatedData = loginSchema.parse(payload);

  // 2. Cari admin di database berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  // 3. Jika email tidak terdaftar
  if (!user) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    throw error;
  }

  // 4. Cocokkan password mentah dengan hash di database
  const isPasswordMatch = await bcrypt.compare(validatedData.password, user.password);
  
  if (!isPasswordMatch) {
    const error = new Error("Email atau password salah");
    error.statusCode = 401;
    throw error;
  }

  // 5. Cetak Tiket JWT (Kita masukkan id dan role-nya ke dalam tiket)
  const token = generateToken({ id: user.id, role: user.role });

  // 6. Kembalikan data (Kita jangan kembalikan passwordnya!)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

/**
 * Mengambil data pengguna lengkap berdasarkan ID
 * @param {string} id - ID pengguna
 * @returns {Promise<object>} Data pengguna (tanpa password)
 */
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });
  
  if (!user) {
    const error = new Error("Pengguna tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  
  return user;
};
