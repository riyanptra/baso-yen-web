import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../lib/axios';

/**
 * Mengambil daftar sertifikat dari Backend.
 * Menggunakan React Query agar data instan terbuka di halaman depan.
 * 
 * @returns {object} Objek berisi: data (array sertifikat), isLoading, isError
 */
export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const response = await axiosInstance.get('/certificates');
      return response.data.data.map((cert) => {
        const authLower = (cert.authority || "").toLowerCase();
        const type = authLower.includes("bpom") ? "BPOM" 
                   : (authLower.includes("halal") || authLower.includes("mui")) ? "HALAL" 
                   : authLower.includes("dinkes") ? "SANITASI" 
                   : authLower.includes("haccp") ? "HACCP"
                   : "UMUM";
        return {
          id: cert.id,
          type: type,
          title: cert.name,
          issuer: cert.authority,
          scope: cert.scope,
          code: cert.registrationNumber,
          icon: cert.icon,
          image: cert.image,
          link: cert.link
        };
      });
    }
  });
};
