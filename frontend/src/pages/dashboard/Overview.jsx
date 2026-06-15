import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useAdminOverviewStats } from "../../hooks/admin/useAdminOverview";
import {
  PackageSearch,
  FileText,
  ChefHat,
  MessageSquareQuote,
  TrendingUp,
  Clock,
} from "lucide-react";

/**
 * Halaman Overview / Ringkasan Utama Dasbor
 * Menampilkan ucapan selamat datang dan jalan pintas (shortcut) ke fitur utama.
 */
export default function Overview() {
  const { user } = useAuthStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Memperbarui jam setiap menit agar selalu akurat
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  /**
   * Mengambil data statistik dan pesan belum terbaca menggunakan Custom Hook
   */
  const { data: dashboardData, isLoading: isLoadingStats } =
    useAdminOverviewStats();

  const unreadCount = dashboardData?.unreadCount || 0;
  const stats = dashboardData?.stats || null;

  /**
   * Fungsi untuk mendapatkan sapaan berdasarkan waktu (Pagi/Siang/Sore/Malam)
   */
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  // Kartu jalan pintas (Shortcut Cards)
  const shortcuts = [
    {
      title: "Kelola Produk",
      icon: PackageSearch,
      color: "bg-blue-500",
      path: "/admin/products",
    },
    {
      title: "Tulis Artikel",
      icon: FileText,
      color: "bg-green-500",
      path: "/admin/articles",
    },
    {
      title: "Resep Baru",
      icon: ChefHat,
      color: "bg-orange-500",
      path: "/admin/recipes",
    },
    {
      title: "Testimoni",
      icon: MessageSquareQuote,
      color: "bg-purple-500",
      path: "/admin/testimonials",
    },
  ];

  // Data untuk Ringkasan Statistik
  const summaryStats = [
    {
      label: "Total Produk",
      value: stats?.products || 0,
      css: "hover:border-blue-200 hover:bg-blue-50/50",
    },
    {
      label: "Total Artikel",
      value: stats?.articles || 0,
      css: "hover:border-green-200 hover:bg-green-50/50",
    },
    {
      label: "Total Resep",
      value: stats?.recipes || 0,
      css: "hover:border-orange-200 hover:bg-orange-50/50",
    },
    {
      label: "Mitra & Klien",
      value: stats?.clients || 0,
      css: "hover:border-purple-200 hover:bg-purple-50/50",
    },
    {
      label: "Sertifikat Mutu",
      value: stats?.certificates || 0,
      css: "hover:border-rose-200 hover:bg-rose-50/50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bagian Sambutan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-jakarta font-bold text-yen-dark mb-2">
            {getGreeting()},{" "}
            <span className="text-yen-accent">{user?.name}</span>! 👋
          </h1>
          <p className="text-gray-500">
            Selamat datang di Pusat Kendali (CMS) Baso Yen. Apa yang ingin Anda
            kelola hari ini?
          </p>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
          <Clock className="text-yen-accent w-6 h-6" />
          <div className="text-sm">
            <p className="text-gray-500 font-medium">Waktu Sistem</p>
            <p className="font-bold text-yen-dark">
              {currentTime.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WIB
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid Jalan Pintas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {shortcuts.map((item, index) => (
          <motion.div
            onClick={() => navigate(item.path)}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer relative"
          >
            {item.badge > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse shadow-md border-2 border-white">
                {item.badge}
              </div>
            )}
            <div
              className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-yen-dark mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-yen-accent transition-colors">
              Buka menu{" "}
              <TrendingUp className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </motion.div>
        ))}
      </div>

      {/* Area Statistik & Ringkasan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-yen-accent/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-yen-accent" />
          </div>
          <h2 className="text-xl font-bold text-yen-dark">Ringkasan Data</h2>
        </div>

        {isLoadingStats ? (
          <div className="h-40 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-yen-cream border-t-yen-accent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                className={`bg-gray-100 rounded-2xl p-6 border border-gray-100 transition-colors ${stat.css}`}
              >
                <p className="text-sm text-gray-500 font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-yen-dark">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
