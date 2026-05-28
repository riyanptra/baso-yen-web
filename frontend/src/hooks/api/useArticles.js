import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar seluruh artikel edukasi dari Backend.
 * Memanfaatkan fitur caching React Query agar artikel instan terbuka.
 * 
 * @returns {object} Objek yang berisi: data (array artikel), isLoading (boolean), isError (boolean)
 */
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'], // Kunci unik untuk brankas cache artikel
    queryFn: async () => {
      const response = await axiosInstance.get('/articles');
      
      // Melakukan format data agar bersih dan seragam saat dipakai oleh Komponen UI (React)
      return response.data.data.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category?.name || "Umum",
        image: a.image,
        author: a.author?.name || "Admin",
        date: new Date(a.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      }));
    }
  });
};
