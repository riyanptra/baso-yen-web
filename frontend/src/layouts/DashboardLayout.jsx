import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  LayoutDashboard,
  Tags,
  PackageSearch,
  ChefHat,
  FileText,
  MessageSquareQuote,
  Images,
  Inbox,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  FileBadge,
  ExternalLink,
  Users,
} from "lucide-react";

// Menu navigasi Dasbor
const MENU_ITEMS = [
  { path: "/admin", icon: LayoutDashboard, label: "Overview" },
  { path: "/admin/messages", icon: Inbox, label: "Pesan Masuk" },
  { path: "/admin/categories", icon: Tags, label: "Kategori" },
  { path: "/admin/products", icon: PackageSearch, label: "Produk" },
  { path: "/admin/recipes", icon: ChefHat, label: "Resep" },
  { path: "/admin/articles", icon: FileText, label: "Artikel" },
  { path: "/admin/testimonials", icon: MessageSquareQuote, label: "Testimoni" },
  { path: "/admin/certificates", icon: FileBadge, label: "Sertifikat" },
  { path: "/admin/clients", icon: Users, label: "Mitra & Klien" },
  { path: "/admin/galleries", icon: Images, label: "Galeri Foto" },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-jakarta text-yen-dark">
      {/* --- SIDEBAR DESKTOP --- */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col h-full bg-yen-dark text-white relative z-20 transition-all duration-300 ease-in-out border-r border-white/10"
      >
        {/* Logo & Tombol Toggle */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, w: 0, display: "none" }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <img
                  src="/LOGO-YEN.png"
                  alt="Baso Yen Logo"
                  className="w-8  object-cover drop-shadow-md"
                />
                <div className="flex flex-col">
                  <span className="font-fredoka text-xl font-bold tracking-wider leading-none">
                    Baso <span className="text-yen-accent">Yen</span>
                  </span>
                  <span className="text-[9px] text-gray-400 font-medium tracking-[0.2em] uppercase mt-1">
                    Sajian Praktis Istimewa
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ChevronLeft
              className={clsx(
                "w-5 h-5 transition-transform duration-300",
                !isSidebarOpen && "rotate-180",
              )}
            />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"} // Exact match untuk overview
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                  isActive
                    ? "bg-yen-accent text-white shadow-lg shadow-yen-accent/30"
                    : "text-gray-400 hover:bg-white/10 hover:text-white",
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  Keluar
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* --- KONTEN UTAMA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header (Topbar) */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Tombol menu mobile */}
            <button
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-yen-dark transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold lg:hidden">Dashboard</h1>

            {/* Sambutan & Tombol Web */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 overflow-hidden">
              <div className="hidden xl:flex flex-col border-l-2 border-yen-accent pl-4 shrink-0">
                <p className="text-sm font-bold text-gray-800">
                  Selamat datang kembali! 👋
                </p>
                <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">
                  Pusat Kendali Baso Yen
                </p>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-yen-accent bg-red-50 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors shadow-sm shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden xl:inline">Lihat Website</span>
                <span className="xl:hidden">Website</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Garis Pemisah */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Profil */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-4 rounded-full transition-colors border border-transparent hover:border-gray-100">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yen-accent to-red-400 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-tight">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-[11px] font-medium text-gray-500 mt-0.5 uppercase tracking-wider">
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Area Konten Dinamis (Dirender dengan animasi transisi) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-yen-white">
          <Outlet />
        </div>
      </main>

      {/* --- SIDEBAR MOBILE (Overlay) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-yen-dark text-white z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/LOGO-YEN.png"
                    alt="Baso Yen Logo"
                    className="w-8 object-contain drop-shadow-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-dm text-xl font-bold tracking-wider leading-none">
                      Baso <span className="text-yen-accent">Yen</span>
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium tracking-[0.2em] uppercase mt-1">
                      Sajian Praktis Istimewa
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {MENU_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/admin"}
                    onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat diklik
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all",
                        isActive
                          ? "bg-yen-accent text-white"
                          : "text-gray-400 hover:bg-white/10 hover:text-white",
                      )
                    }
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  <span className="font-medium">Keluar</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
