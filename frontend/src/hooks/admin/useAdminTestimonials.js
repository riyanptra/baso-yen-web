import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua testimoni untuk dasbor admin
 */
export const useAdminTestimonials = () => {
  return useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const res = await axiosInstance.get("/testimonials");
      return res.data.data;
    },
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) testimoni
 */
export const useSaveTestimonial = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId, headers }) => {
      if (editingId) {
        return await axiosInstance.put(`/testimonials/${editingId}`, submitData, { headers });
      } else {
        return await axiosInstance.post("/testimonials", submitData, { headers });
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus testimoni
 */
export const useDeleteTestimonial = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/testimonials/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
