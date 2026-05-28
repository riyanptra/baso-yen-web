import { z } from "zod";

/**
 * Skema validasi untuk membuat resep baru
 */
/**
 * Skema validasi Zod untuk operasi: create recipe
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createRecipeSchema = z.object({
  title: z.string().min(3, "Judul resep minimal 3 karakter"),
  time: z.string().min(1, "Waktu memasak wajib diisi (misal: '45 Menit')"),
  difficulty: z.string().min(1, "Tingkat kesulitan wajib diisi (misal: 'Mudah')"),
  description: z.string().min(10, "Deskripsi singkat minimal 10 karakter"),
  content: z.string().min(20, "Isi cara memasak minimal 20 karakter"),
  categoryId: z.string().uuid("ID Kategori tidak valid"),
});

/**
 * Skema validasi untuk memperbarui resep (semua field opsional)
 */
/**
 * Skema validasi Zod untuk operasi: update recipe
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateRecipeSchema = z.object({
  title: z.string().min(3, "Judul resep minimal 3 karakter").optional(),
  time: z.string().min(1, "Waktu memasak wajib diisi").optional(),
  difficulty: z.string().min(1, "Tingkat kesulitan wajib diisi").optional(),
  description: z.string().min(10, "Deskripsi singkat minimal 10 karakter").optional(),
  content: z.string().min(20, "Isi cara memasak minimal 20 karakter").optional(),
  categoryId: z.string().uuid("ID Kategori tidak valid").optional(),
});
