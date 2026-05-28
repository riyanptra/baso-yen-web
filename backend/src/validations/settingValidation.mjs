import { z } from "zod";

/**
 * Skema validasi untuk Pengaturan (Setting) Baru
 */
/**
 * Skema validasi Zod untuk operasi: create setting
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createSettingSchema = z.object({
  key: z.string().min(2, "Kunci pengaturan minimal 2 karakter"),
  value: z.string().min(1, "Nilai pengaturan wajib diisi"),
});

/**
 * Skema validasi untuk Update Pengaturan
 */
/**
 * Skema validasi Zod untuk operasi: update setting
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateSettingSchema = z.object({
  value: z.string().min(1, "Nilai pengaturan wajib diisi"),
});
