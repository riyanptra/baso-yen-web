import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar mitra/klien B2B dari Backend.
 * Menggunakan React Query agar data instan terbuka di halaman depan.
 * 
 * @returns {object} Objek berisi: data (array klien), isLoading, isError
 */
export const useClients = () => {
  return useQuery({
    queryKey: ['clients'], // Kunci unik untuk cache klien
    queryFn: async () => {
      const response = await axiosInstance.get('/clients');
      return response.data.data.map(c => ({
        id: c.id,
        name: c.name,
        src: c.image || c.logo
      }));
    }
  });
};
