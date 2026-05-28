import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua produk untuk dasbor admin
 */
export const useAdminProducts = () => {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products");
      return res.data.data;
    },
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) produk
 */
export const useSaveProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId, headers }) => {
      if (editingId) {
        return await axiosInstance.put(`/products/${editingId}`, submitData, { headers });
      } else {
        return await axiosInstance.post("/products", submitData, { headers });
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus produk
 */
export const useDeleteProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/products/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
