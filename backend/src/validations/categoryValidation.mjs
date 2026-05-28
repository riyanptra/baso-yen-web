import { z } from "zod";

/**
 * Skema Zod untuk Memvalidasi Data Input Kategori Baru
 */
/**
 * Skema validasi Zod untuk operasi: create category
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createCategorySchema = z.object({
  name: z
    .string({
      required_error: "Nama kategori wajib diisi",
      invalid_type_error: "Nama kategori harus berupa teks",
    })
    .min(3, "Nama kategori minimal 3 karakter")
    .max(50, "Nama kategori maksimal 50 karakter"),

  type: z.enum(["PRODUCT", "RECIPE", "ARTICLE"], {
    required_error: "Tipe kategori wajib dipilih",
    invalid_type_error: "Tipe kategori tidak valid",
  }),
});

/**
 * Skema Zod untuk Memvalidasi Update Kategori
 * (Semua field bersifat opsional karena update bisa jadi cuma ganti nama)
 */
/**
 * Skema validasi Zod untuk operasi: update category
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Nama kategori harus berupa teks",
    })
    .min(3, "Nama kategori minimal 3 karakter")
    .max(50, "Nama kategori maksimal 50 karakter")
    .optional(),

  type: z
    .enum(["PRODUCT", "RECIPE", "ARTICLE"], {
      invalid_type_error: "Tipe kategori tidak valid",
    })
    .optional(),
});
