import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data statistik (Overview) untuk dasbor admin
 * Menggabungkan jumlah pesan masuk dan sampel yang belum dibaca dengan statistik utama
 */
export const useAdminOverviewStats = () => {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [contactRes, sampleRes, statsRes] = await Promise.all([
        axiosInstance.get("/messages/contact"),
        axiosInstance.get("/messages/sample-request"),
        axiosInstance.get("/dashboard/stats"),
      ]);

      const unreadContact = contactRes.data.data.filter(
        (m) => m.status === "UNREAD",
      ).length;
      const pendingSample = sampleRes.data.data.filter(
        (m) => m.status === "PENDING",
      ).length;

      return {
        unreadCount: unreadContact + pendingSample,
        stats: statsRes.data.data
      };
    },
  });
};
