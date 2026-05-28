import { testimonialService } from '../services/testimonialService.mjs';

/**
 * Controller untuk mengelola request Testimoni
 */
export const testimonialController = {
  /**
   * Mengambil semua data testimoni
   */
  async getAll(req, res) {
    try {
      const testimonials = await testimonialService.getAllTestimonials();
      res.json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Gagal mengambil data testimoni', error: error.message });
    }
  },

  /**
   * Mengambil satu data testimoni berdasarkan ID
   */
  async getById(req, res) {
    try {
      const testimonial = await testimonialService.getTestimonialById(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan' });
      }
      res.json({ success: true, data: testimonial });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Gagal mengambil data testimoni', error: error.message });
    }
  },

  /**
   * Menambahkan testimoni baru
   */
  async create(req, res) {
    try {
      // req.body akan berisi URL gambar avatar jika di-upload melalui uploadMiddleware
      let data = { ...req.body };
      
      // Jika ada file avatar yang diupload via mutler/cloudinary
      if (req.file) {
        data.avatarFile = req.file;
      }
      
      const newTestimonial = await testimonialService.createTestimonial(data);
      res.status(201).json({ success: true, data: newTestimonial, message: 'Testimoni berhasil ditambahkan' });
    } catch (error) {
      console.error("TESTIMONIAL CREATE ERROR:", error);
      res.status(500).json({ success: false, message: error.message || 'Gagal menambahkan testimoni', error: error.message });
    }
  },

  /**
   * Mengubah data testimoni
   */
  async update(req, res) {
    try {
      let data = { ...req.body };
      
      // Jika ada update foto avatar
      if (req.file) {
        data.avatarFile = req.file;
      }
      
      const updatedTestimonial = await testimonialService.updateTestimonial(req.params.id, data);
      res.json({ success: true, data: updatedTestimonial, message: 'Testimoni berhasil diperbarui' });
    } catch (error) {
      // Memeriksa jika error karena data tidak ditemukan (Prisma)
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan' });
      }
      res.status(500).json({ success: false, message: 'Gagal memperbarui testimoni', error: error.message });
    }
  },

  /**
   * Menghapus testimoni
   */
  async delete(req, res) {
    try {
      await testimonialService.deleteTestimonial(req.params.id);
      res.json({ success: true, message: 'Testimoni berhasil dihapus' });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan' });
      }
      res.status(500).json({ success: false, message: 'Gagal menghapus testimoni', error: error.message });
    }
  },
};
