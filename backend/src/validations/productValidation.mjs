import { z } from "zod";

/**
 * Zod Schema untuk Validasi Input Produk Baru
 * Catatan: Karena menggunakan multipart/form-data (untuk gambar),
 * semua data yang diterima dari req.body awalnya berbentuk String.
 */
/**
 * Skema validasi Zod untuk operasi: create product
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createProductSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi produk minimal 10 karakter"),
  packSize: z
    .string()
    .min(1, "Ukuran kemasan wajib diisi (misal: '50 Pcs' atau '500 Gram')"),

  badge: z.string().optional(),

  categoryId: z.string().uuid("ID Kategori tidak valid"),
});

/**
 * Zod Schema untuk Memperbarui Produk
 * Semua field opsional karena admin bisa jadi cuma mau ganti nama/deskripsi saja.
 */
/**
 * Skema validasi Zod untuk operasi: update product
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateProductSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter").optional(),
  description: z
    .string()
    .min(10, "Deskripsi produk minimal 10 karakter")
    .optional(),
  packSize: z.string().min(1, "Ukuran kemasan wajib diisi").optional(),

  badge: z.string().optional(),

  categoryId: z.string().uuid("ID Kategori tidak valid").optional(),
});
