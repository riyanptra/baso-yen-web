import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua artikel untuk dasbor admin
 */
export const useAdminArticles = () => {
  return useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles");
      return res.data.data;
    },
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) artikel
 */
export const useSaveArticle = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId, headers }) => {
      if (editingId) {
        return await axiosInstance.put(`/articles/${editingId}`, submitData, { headers });
      } else {
        return await axiosInstance.post("/articles", submitData, { headers });
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus artikel
 */
export const useDeleteArticle = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/articles/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
