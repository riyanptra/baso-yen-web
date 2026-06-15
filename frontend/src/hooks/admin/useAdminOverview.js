import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

/**
 * Mengambil data statistik (Overview) untuk dasbor admin
 */
export const useAdminOverviewStats = () => {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const statsRes = await axiosInstance.get("/dashboard/stats");

      return {
        unreadCount: 0,
        stats: statsRes.data.data
      };
    },
  });
};
