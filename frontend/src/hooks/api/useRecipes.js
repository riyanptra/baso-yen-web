import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar seluruh resep masakan dari Backend.
 * Memanfaatkan fitur caching React Query agar pengunjung tidak perlu menunggu loading dua kali.
 * 
 * @returns {object} Objek yang berisi: data (array resep), isLoading (boolean), isError (boolean)
 */
export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'], // Kunci unik untuk brankas cache resep
    queryFn: async () => {
      const response = await axiosInstance.get('/recipes');
      
      // Melakukan format data agar bersih dan seragam saat dipakai oleh Komponen UI (React)
      return response.data.data.map((r) => ({
        id: r.id,
        name: r.title, // Duplikasi untuk jaga-jaga apabila UI komponen meminta properti 'name'
        title: r.title,
        slug: r.slug,
        description: r.description,
        time: r.time,
        difficulty: r.difficulty,
        category: r.category?.name || "Umum",
        image: r.image,
        content: r.content,
        author: r.author?.name || "Admin"
      }));
    }
  });
};
