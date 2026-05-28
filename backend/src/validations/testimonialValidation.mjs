import { z } from "zod";

/**
 * Skema Zod untuk Memvalidasi Data Input Testimoni Baru
 */
/**
 * Skema validasi Zod untuk operasi: create testimonial
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createTestimonialSchema = z.object({
  name: z
    .string({
      required_error: "Nama pelanggan wajib diisi",
      invalid_type_error: "Nama pelanggan harus berupa teks",
    })
    .min(3, "Nama pelanggan minimal 3 karakter")
    .max(100, "Nama pelanggan maksimal 100 karakter"),

  role: z
    .string({
      required_error: "Peran/Pekerjaan pelanggan wajib diisi",
      invalid_type_error: "Peran harus berupa teks",
    })
    .min(3, "Peran pelanggan minimal 3 karakter")
    .max(100, "Peran pelanggan maksimal 100 karakter"),

  content: z
    .string({
      required_error: "Isi testimoni wajib diisi",
      invalid_type_error: "Isi testimoni harus berupa teks",
    })
    .min(10, "Isi testimoni minimal 10 karakter"),

  rating: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number({
        invalid_type_error: "Rating harus berupa angka",
      })
      .min(1, "Rating minimal 1 bintang")
      .max(5, "Rating maksimal 5 bintang")
      .optional()
  ),

  tag: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});

/**
 * Skema Zod untuk Memvalidasi Update Testimoni
 */
/**
 * Skema validasi Zod untuk operasi: update testimonial
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateTestimonialSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama pelanggan harus berupa teks",
    })
    .min(3, "Nama pelanggan minimal 3 karakter")
    .max(100, "Nama pelanggan maksimal 100 karakter")
    .optional(),

  role: z
    .string({
      invalid_type_error: "Peran harus berupa teks",
    })
    .min(3, "Peran pelanggan minimal 3 karakter")
    .max(100, "Peran pelanggan maksimal 100 karakter")
    .optional(),

  content: z
    .string({
      invalid_type_error: "Isi testimoni harus berupa teks",
    })
    .min(10, "Isi testimoni minimal 10 karakter")
    .optional(),

  rating: z.preprocess(
    (val) => (val !== undefined && typeof val === "string" ? parseInt(val, 10) : val),
    z
      .number({
        invalid_type_error: "Rating harus berupa angka",
      })
      .min(1, "Rating minimal 1 bintang")
      .max(5, "Rating maksimal 5 bintang")
      .optional()
  ),

  tag: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});
