import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data semua pesan (kontak umum dan permintaan sampel b2b) untuk dasbor admin
 * Berdasarkan activeTab (ALL, CONTACT, SAMPLE)
 */
export const useAdminMessages = (activeTab) => {
  return useQuery({
    queryKey: ["admin-messages", activeTab],
    queryFn: async () => {
      if (activeTab === "ALL") {
        const [contactRes, sampleRes] = await Promise.all([
          axiosInstance.get("/messages/contact"),
          axiosInstance.get("/messages/sample-request")
        ]);
        const contacts = contactRes.data.data.map(m => ({ ...m, type: "CONTACT" }));
        const samples = sampleRes.data.data.map(m => ({ ...m, type: "SAMPLE" }));
        return [...contacts, ...samples].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        const endpoint = activeTab === "CONTACT" ? "/messages/contact" : "/messages/sample-request";
        const response = await axiosInstance.get(endpoint);
        return response.data.data.map(m => ({ ...m, type: activeTab }));
      }
    }
  });
};

/**
 * Mutasi untuk memperbarui status baca pesan
 */
export const useUpdateMessageStatus = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ message, status }) => {
      const endpoint = message.type === "CONTACT" ? `/messages/contact/${message.id}/status` : `/messages/sample-request/${message.id}/status`;
      return await axiosInstance.patch(endpoint, { status });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};

/**
 * Mutasi untuk menghapus pesan
 */
export const useDeleteMessage = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (message) => {
      const endpoint = message.type === "CONTACT" ? `/messages/contact/${message.id}` : `/messages/sample-request/${message.id}`;
      return await axiosInstance.delete(endpoint);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    }
  });
};
