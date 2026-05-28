import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar seluruh katalog produk dari Backend.
 * Data akan otomatis di-cache (disimpan di memori sementara) oleh React Query 
 * sehingga saat pengguna berpindah halaman, loading tidak akan terjadi lagi.
 * 
 * @returns {object} Objek yang berisi: data (array produk), isLoading (boolean), isError (boolean)
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'], // Kunci unik untuk brankas cache produk
    queryFn: async () => {
      const response = await axiosInstance.get('/products');
      
      // Melakukan format data agar bersih dan seragam saat dipakai oleh Komponen UI (React)
      return response.data.data.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category?.name || "Umum",
        packSize: p.packSize,
        pack: p.packSize, // Disiapkan untuk fallback grid card jika diperlukan
        image: p.image,
        badge: p.badge || "Reguler",
        isBestSeller: p.badge === "Best Seller"
      }));
    }
  });
};
