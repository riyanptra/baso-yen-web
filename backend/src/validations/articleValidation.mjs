import { z } from "zod";

/**
 * Skema validasi untuk membuat artikel baru
 */
/**
 * Skema validasi Zod untuk operasi: create article
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createArticleSchema = z.object({
  title: z.string().min(3, "Judul artikel minimal 3 karakter"),
  excerpt: z.string().min(10, "Cuplikan singkat minimal 10 karakter"),
  content: z.string().min(20, "Isi artikel minimal 20 karakter"),
  categoryId: z.string().uuid("ID Kategori tidak valid"),
});

/**
 * Skema validasi untuk memperbarui artikel (semua field opsional)
 */
/**
 * Skema validasi Zod untuk operasi: update article
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateArticleSchema = z.object({
  title: z.string().min(3, "Judul artikel minimal 3 karakter").optional(),
  excerpt: z.string().min(10, "Cuplikan singkat minimal 10 karakter").optional(),
  content: z.string().min(20, "Isi artikel minimal 20 karakter").optional(),
  categoryId: z.string().uuid("ID Kategori tidak valid").optional(),
});
