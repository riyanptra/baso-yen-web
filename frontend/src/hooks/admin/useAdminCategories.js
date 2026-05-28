import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil semua data kategori (untuk manajemen kategori)
 */
export const useAdminCategoriesAll = () => {
  return useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      return res.data.data;
    }
  });
};

/**
 * Mengambil data kategori khusus untuk tipe tertentu (PRODUCT, ARTICLE, RECIPE)
 * @param {string} type - Tipe kategori (PRODUCT, ARTICLE, RECIPE)
 */
export const useAdminCategoriesByType = (type) => {
  const queryKey = type ? ["admin-categories", type] : ["admin-categories"];
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      const allCategories = res.data.data;
      if (type) {
        return allCategories.filter((cat) => cat.type === type);
      }
      return allCategories;
    }
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) kategori
 */
export const useSaveCategory = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId }) => {
      if (editingId) {
        return await axiosInstance.put(`/categories/${editingId}`, submitData);
      } else {
        return await axiosInstance.post("/categories", submitData);
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      // Invalidate jika ada query spesifik tipe
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "PRODUCT"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "ARTICLE"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "RECIPE"] });
      // Invalidate queryKeys lama agar komponen yang belum direfaktor tetap terupdate
      queryClient.invalidateQueries({ queryKey: ["admin-categories-article"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories-recipe"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus kategori
 */
export const useDeleteCategory = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/categories/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "PRODUCT"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "ARTICLE"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories", "RECIPE"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories-article"] });
      queryClient.invalidateQueries({ queryKey: ["admin-categories-recipe"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
