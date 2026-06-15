import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mengambil state dan fungsi dari Zustand store
  const { login, isLoggingIn, error, clearError, user } = useAuthStore();
  const navigate = useNavigate();

  // Jika sudah login (misal admin tidak sengaja kembali ke halaman login), arahkan ke dasbor
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  /**
   * Menangani pengiriman form login.
   * Akan membersihkan error sebelumnya dan memanggil fungsi `login` dari Zustand.
   * Jika berhasil, pengguna akan diarahkan ke halaman utama dasbor.
   * @param {object} e - Event form submit bawaan browser
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) clearError();

    const success = await login(email, password);
    if (success) {
      navigate("/admin"); // Redirect ke halaman dasbor utama
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-jakarta">
      {/* Sisi Kiri - Gambar & Branding (Hanya tampil di Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-yen-dark items-end p-12">
        {/* Gambar Latar */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url(/bg-herosection.jpg)" }}
        />
        {/* Overlay Gradasi Hitam untuk teks */}
        <div className="absolute inset-0 bg-yen-dark/80" />
        
        {/* Konten Branding */}
        <div className="relative z-10 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="bg-yen-accent text-white font-bebas tracking-widest text-[10px] px-3 py-1.5 rounded-full inline-block uppercase mb-4 shadow-lg">
              Sistem Manajemen Konten
            </div>
            <h2 className="text-4xl font-fredoka font-bold text-white leading-tight mb-4 drop-shadow-md">
              Kelola Bisnis Kuliner Anda dengan <span className="text-yen-gold">Lebih Mudah</span>.
            </h2>
            <p className="text-yen-cream/80 text-sm leading-relaxed mb-8">
              Dasbor ini adalah pusat kendali Anda. Tambahkan produk baru, pantau pesan pelanggan, dan kelola artikel edukasi dalam satu tempat yang aman dan cepat.
            </p>
            <div className="flex items-center gap-4">
              <img decoding="async" loading="lazy" src="/LOGO-YEN.png" alt="Logo Baso Yen" className="w-12 h-12 object-contain opacity-80" />
              <div className="h-8 w-px bg-white/20" />
              <span className="font-bebas text-white/50 tracking-widest text-sm">Sajian Praktis Istimewa</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sisi Kanan - Area Formulir Login (Warna Terang) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Ornamen Latar Tipis */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yen-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo untuk versi Mobile (Muncul saat layar kecil) */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img decoding="async" loading="lazy" src="/LOGO-YEN.png" alt="Logo Baso Yen" className="w-20 h-20 object-contain drop-shadow-sm" />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-fredoka font-bold text-3xl sm:text-4xl mb-2 text-yen-dark">
              Selamat Datang! 👋
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Silakan masuk menggunakan kredensial admin Anda.
            </p>
          </div>

          {/* Alert Error */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-start gap-3 mb-6 shadow-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yen-accent transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yen-accent focus:bg-white focus:ring-4 focus:ring-yen-accent/10 transition-all font-medium text-sm shadow-sm"
                  placeholder="admin@basoyen.com"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <span className="text-[10px] text-gray-400 hover:text-yen-accent cursor-pointer transition-colors font-semibold">Lupa Sandi?</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-yen-accent transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-yen-accent focus:bg-white focus:ring-4 focus:ring-yen-accent/10 transition-all font-medium text-sm shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-yen-dark hover:bg-yen-accent text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(30,27,26,0.2)] hover:shadow-[0_12px_25px_rgba(227,30,36,0.3)] mt-8"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memeriksa Akses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dasbhoard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-12 text-center">
             <p className="text-gray-400 text-xs font-medium">
               &copy; {new Date().getFullYear()} Baso Yen. Hak Cipta Dilindungi.
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
