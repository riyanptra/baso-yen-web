import { z } from "zod";

/**
 * Skema validasi untuk Sertifikat Baru
 */
/**
 * Skema validasi Zod untuk operasi: create certificate
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createCertificateSchema = z.object({
  name: z.string().min(3, "Nama sertifikat minimal 3 karakter"),
  authority: z.string().min(2, "Otoritas penerbit minimal 2 karakter"),
  scope: z.string().min(3, "Cakupan/Scope minimal 3 karakter"),
  registrationNumber: z.string().min(3, "Nomor registrasi minimal 3 karakter"),
  link: z.string().url("Format link tidak valid").or(z.literal("")).optional().nullable(),
});

/**
 * Skema validasi untuk Update Sertifikat
 */
/**
 * Skema validasi Zod untuk operasi: update certificate
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateCertificateSchema = z.object({
  name: z.string().min(3, "Nama sertifikat minimal 3 karakter").optional(),
  authority: z.string().min(2, "Otoritas penerbit minimal 2 karakter").optional(),
  scope: z.string().min(3, "Cakupan/Scope minimal 3 karakter").optional(),
  registrationNumber: z.string().min(3, "Nomor registrasi minimal 3 karakter").optional(),
  link: z.string().url("Format link tidak valid").or(z.literal("")).optional().nullable(),
});
