import { z } from "zod";

/**
 * Skema validasi untuk Klien Baru
 */
/**
 * Skema validasi Zod untuk operasi: create client
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const createClientSchema = z.object({
  name: z.string().min(2, "Nama klien minimal 2 karakter"),
});

/**
 * Skema validasi untuk Update Klien
 */
/**
 * Skema validasi Zod untuk operasi: update client
 * Memastikan data yang dikirim oleh klien sesuai dengan tipe dan batasan (aturan) yang berlaku.
 */
export const updateClientSchema = z.object({
  name: z.string().min(2, "Nama klien minimal 2 karakter").optional(),
});
