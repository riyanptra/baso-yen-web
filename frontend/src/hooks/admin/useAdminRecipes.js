import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua resep untuk dasbor admin
 */
export const useAdminRecipes = () => {
  return useQuery({
    queryKey: ["admin-recipes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/recipes");
      return res.data.data;
    },
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) resep
 */
export const useSaveRecipe = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId, headers }) => {
      if (editingId) {
        return await axiosInstance.put(`/recipes/${editingId}`, submitData, { headers });
      } else {
        return await axiosInstance.post("/recipes", submitData, { headers });
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus resep
 */
export const useDeleteRecipe = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/recipes/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
