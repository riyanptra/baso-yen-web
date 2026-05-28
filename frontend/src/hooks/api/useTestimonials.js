import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar ulasan/testimoni dari Backend.
 * Menggunakan React Query agar data instan terbuka di halaman depan.
 * 
 * @returns {object} Objek berisi: data (array testimoni), isLoading, isError
 */
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'], // Kunci unik untuk cache testimoni
    queryFn: async () => {
      const response = await axiosInstance.get('/testimonials');
      return response.data.data.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role || "Pelanggan Setia",
        content: t.content,
        rating: t.rating || 5,
        avatar: t.image || t.avatar // avatar jika ada
      }));
    }
  });
};
