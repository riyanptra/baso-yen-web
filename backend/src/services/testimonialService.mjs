import { prisma } from "../lib/prisma.mjs";
import {
  createTestimonialSchema,
  updateTestimonialSchema,
} from "../validations/testimonialValidation.mjs";
import { uploadImageToR2, deleteImageFromR2, extractObjectKey } from "../utils/cloudflareR2.mjs";

/**
 * Service untuk mengelola data Testimoni
 */
export const testimonialService = {
  /**
   * Mengambil semua data testimoni pelanggan.
   * Diurutkan dari yang terbaru.
   * @returns {Promise<Array>} Daftar testimoni
   */
  async getAllTestimonials() {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  /**
   * Mendapatkan testimoni berdasarkan ID
   */
  async getTestimonialById(id) {
    return await prisma.testimonial.findUnique({
      where: { id },
    });
  },

  /**
   * Membuat testimoni baru
   */
  async createTestimonial(data) {
    // Validasi data mentah dari Controller menggunakan Zod
    const validatedData = createTestimonialSchema.parse(data);
    
    let avatarUrl = null;
    if (data.avatarFile) {
      try {
        const uploadResult = await uploadImageToR2(data.avatarFile.buffer, "basoyen/testimonials");
        avatarUrl = uploadResult.secure_url;
      } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 500;
        throw err;
      }
    }

    // Fallback rating jika kosong
    const rating = validatedData.rating || 5;
    
    return await prisma.testimonial.create({
      data: {
        name: validatedData.name,
        role: validatedData.role,
        content: validatedData.content,
        rating: rating,
        tag: validatedData.tag || null,
        ...(avatarUrl ? { avatar: avatarUrl } : {}),
      },
    });
  },

  /**
   * Memperbarui testimoni yang ada
   */
  async updateTestimonial(id, data) {
    // Validasi Zod (Semua field bersifat opsional saat update)
    const validatedData = updateTestimonialSchema.parse(data);
    
    // Cek apakah data testimoni ada
    const existing = await this.getTestimonialById(id);
    if (!existing) {
      const error = new Error("Testimoni tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }
    
    let avatarUrl = undefined;
    if (data.avatarFile) {
      try {
        const uploadResult = await uploadImageToR2(data.avatarFile.buffer, "basoyen/testimonials");
        avatarUrl = uploadResult.secure_url;

        // Extract and delete old avatar if exists
        if (existing.avatar) {
          const oldObjectKey = extractObjectKey(existing.avatar);
          if (oldObjectKey) {
             await deleteImageFromR2(oldObjectKey).catch(err => console.error(err));
          }
        }
      } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 500;
        throw err;
      }
    }
    
    return await prisma.testimonial.update({
      where: { id },
      data: {
        ...validatedData,
        ...(avatarUrl && { avatar: avatarUrl })
      },
    });
  },

  /**
   * Menghapus testimoni
   */
  async deleteTestimonial(id) {
    const existing = await this.getTestimonialById(id);
    if (!existing) {
      const error = new Error("Testimoni tidak ditemukan");
      error.statusCode = 404;
      throw error;
    }

    if (existing.avatar) {
      const oldObjectKey = extractObjectKey(existing.avatar);
      if (oldObjectKey) {
         await deleteImageFromR2(oldObjectKey).catch(err => console.error(err));
      }
    }

    return await prisma.testimonial.delete({
      where: { id },
    });
  },
};
