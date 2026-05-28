import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar galeri (footage) dari Backend.
 * Menggunakan React Query agar data instan terbuka di halaman depan.
 * 
 * @returns {object} Objek berisi: data (array galeri), isLoading, isError
 */
export const useGalleries = () => {
  return useQuery({
    queryKey: ['galleries'], // Kunci unik untuk cache galeri
    queryFn: async () => {
      const response = await axiosInstance.get('/galleries');
      return response.data.data.map(g => ({
        id: g.id,
        title: g.title,
        type: g.type,
        image: g.image,
        caption: g.caption || "Footage Baso Yen"
      }));
    }
  });
};
