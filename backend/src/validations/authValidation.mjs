import { z } from "zod";

/**
 * Skema validasi untuk Login Admin
 * Memastikan email berformat benar dan password tidak kosong
 */
/**
 * Skema validasi Zod untuk operasi: login
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid"),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .min(1, "Password tidak boleh kosong"),
});
