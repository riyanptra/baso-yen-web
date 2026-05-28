import { z } from "zod";

/**
 * Skema validasi untuk Pesan Kontak (Contact Us)
 */
/**
 * Skema validasi Zod untuk operasi: create service message
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createServiceMessageSchema = z.object({
  name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(9, "Nomor telepon minimal 9 digit"),
  content: z.string().min(10, "Isi pesan minimal 10 karakter"),
});

/**
 * Skema validasi untuk mengupdate status Pesan Kontak
 */
/**
 * Skema validasi Zod untuk operasi: update service message status
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateServiceMessageStatusSchema = z.object({
  status: z.enum(["UNREAD", "READ", "REPLIED"], {
    invalid_type_error: "Status pesan tidak valid",
  }),
});

/**
 * Skema validasi untuk Permintaan Sampel B2B (Sample Request)
 */
/**
 * Skema validasi Zod untuk operasi: create sample request
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createSampleRequestSchema = z.object({
  name: z.string().min(3, "Nama PIC minimal 3 karakter"),
  businessName: z.string().min(3, "Nama usaha minimal 3 karakter"),
  city: z.string().min(3, "Nama kota/lokasi minimal 3 karakter"),
  phone: z.string().min(9, "Nomor telepon minimal 9 digit"),
  email: z.string().email("Format email tidak valid"),
});

/**
 * Skema validasi untuk mengupdate status Permintaan Sampel
 */
/**
 * Skema validasi Zod untuk operasi: update sample request status
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateSampleRequestStatusSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "SENT", "REJECTED"], {
    invalid_type_error: "Status permintaan sampel tidak valid",
  }),
});
