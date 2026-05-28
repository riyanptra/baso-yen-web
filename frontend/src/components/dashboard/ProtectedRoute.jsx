import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  // Memeriksa status otentikasi saat komponen dimuat pertama kali
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Jika sedang menunggu respons dari backend (loading)
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-yen-dark flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-yen-accent mb-4" />
        <p className="text-yen-neutral animate-pulse">Memuat Dasbor...</p>
      </div>
    );
  }

  // Jika pengguna tidak terotentikasi (user === null), arahkan ke halaman login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika terotentikasi, izinkan untuk mengakses rute (Outlet) di dalamnya
  return <Outlet />;
}
