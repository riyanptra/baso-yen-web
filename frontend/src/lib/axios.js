import axios from "axios";

// Membuat instance axios dengan konfigurasi bawaan
/**
 * Instansiasi global Axios untuk berkomunikasi dengan Backend API.
 * Secara otomatis menggunakan Base URL dari variabel lingkungan (.env).
 */
const axiosInstance = axios.create({
  // Jika sedang mode 'development' (di komputer Anda), arahkan ke localhost backend.
  // Jika sedang mode 'production', arahkan ke URL API asli (atau gunakan path relatif jika di-host di domain yang sama).
  baseURL: import.meta.env.VITE_API_URL,

  // Ini SANGAT PENTING untuk mengirimkan HTTP-Only Cookie (JWT Token) ke backend
  withCredentials: true,
});

/**
 * GLOBAL INTERCEPTOR (Penjaga Keamanan Otomatis)
 * Memantau setiap balasan dari backend. Jika server mati atau sesi kedaluwarsa,
 * akan langsung menendang admin kembali ke halaman login.
 */
axiosInstance.interceptors.response.use(
  (response) => response, // Jika sukses, biarkan lewat
  (error) => {
    // 1. Jika server mati sama sekali (Network Error / Tidak ada respons)
    // 2. Atau token JWT sudah kedaluwarsa/tidak valid (Status 401)
    if (!error.response || error.response.status === 401) {
      // Hapus data pengguna secara manual dari LocalStorage jika diperlukan
      // Atau arahkan langsung ke halaman login (React akan mereset state saat halam dimuat ulang oleh browser)
      if (
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        alert(
          "Koneksi ke server terputus atau sesi telah habis. Anda akan dikeluarkan.",
        );
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
