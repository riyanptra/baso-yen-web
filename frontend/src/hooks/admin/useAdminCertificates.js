import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua sertifikat untuk dasbor admin
 */
export const useAdminCertificates = () => {
  return useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const res = await axiosInstance.get("/certificates");
      return res.data.data;
    },
  });
};

/**
 * Mutasi untuk menyimpan (Tambah/Ubah) sertifikat
 */
export const useSaveCertificate = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ submitData, editingId, headers }) => {
      if (editingId) {
        return await axiosInstance.put(`/certificates/${editingId}`, submitData, { headers });
      } else {
        return await axiosInstance.post("/certificates", submitData, { headers });
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus sertifikat
 */
export const useDeleteCertificate = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      return await axiosInstance.delete(`/certificates/${id}`);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
