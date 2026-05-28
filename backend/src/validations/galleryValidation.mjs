import { z } from "zod";

/**
 * Skema validasi untuk Galeri Baru
 */
/**
 * Skema validasi Zod untuk operasi: create gallery
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createGallerySchema = z.object({
  title: z.string().min(3, "Judul galeri minimal 3 karakter"),
  description: z.string().optional(),
  type: z.enum(["FASILITAS_TENTANG_KAMI", "BERANDA_POLAROID"], {
    required_error: "Tipe galeri wajib dipilih",
    invalid_type_error: "Tipe galeri tidak valid",
  }),
  order: z.preprocess(
    (val) => Number(val),
    z.number().int("Urutan harus berupa angka bulat").default(0)
  ),
});

/**
 * Skema validasi untuk Update Galeri
 */
/**
 * Skema validasi Zod untuk operasi: update gallery
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateGallerySchema = z.object({
  title: z.string().min(3, "Judul galeri minimal 3 karakter").optional(),
  description: z.string().optional(),
  type: z.enum(["FASILITAS_TENTANG_KAMI", "BERANDA_POLAROID"]).optional(),
  order: z.preprocess(
    (val) => (val !== undefined ? Number(val) : undefined),
    z.number().int("Urutan harus berupa angka bulat").optional()
  ),
});
