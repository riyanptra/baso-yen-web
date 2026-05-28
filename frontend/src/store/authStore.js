import { create } from "zustand";
import axiosInstance from "../lib/axios";

/**
 * Pengelola Status Global (State Management) menggunakan Zustand.
 * Bertugas untuk menyimpan data sesi login pengguna (Admin) yang bersifat persisten (tetap ada meski di-refresh)
 * karena diikat dengan LocalStorage bawaan browser.
 */
export const useAuthStore = create((set) => ({
  user: null, // Data pengguna yang sedang login
  isCheckingAuth: true, // Sedang mengecek status login saat pertama kali muat
  isLoggingIn: false, // Sedang proses loading menekan tombol login
  error: null,

  // Fungsi untuk login
  login: async (email, password) => {
    set({ isLoggingIn: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      // Setelah login sukses, simpan data user ke dalam store
      set({ user: response.data.data, isLoggingIn: false });
      return true; // Menandakan login berhasil
    } catch (error) {
      // Ambil pesan error dari backend jika ada
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan saat login";
      set({ error: errorMessage, isLoggingIn: false });
      return false; // Menandakan login gagal
    }
  },

  // Fungsi untuk mengecek sesi aktif (dipanggil saat halaman pertama kali dibuka)
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      // Jika cookie valid, backend akan membalas dengan data profil
      set({ user: response.data.data, isCheckingAuth: false });
    } catch {
      // Jika cookie tidak valid / tidak ada, berarti belum login
      set({ user: null, isCheckingAuth: false });
    }
  },

  /**
   * Fungsi Logout
   * Mengirim request ke backend untuk menghapus sesi/token,
   * kemudian menghapus data pengguna dari status global.
   */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null, error: null });
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  },
  
  // Fungsi untuk membersihkan pesan error dari tampilan UI
  clearError: () => set({ error: null }),
}));
