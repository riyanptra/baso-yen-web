import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layouts & Keamanan (Tetap statis karena langsung dipakai)
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/dashboard/ProtectedRoute";
import SEO from "./components/ui/SEO";

// Komponen Loading (Fallback saat file sedang diunduh)
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yen-accent"></div>
  </div>
);

// === Halaman Pengunjung (Diunduh secara dinamis) ===
const Beranda = lazy(() => import("./pages/landing/Beranda"));
const TentangKami = lazy(() => import("./pages/landing/TentangKami"));
const Layanan = lazy(() => import("./pages/landing/Layanan"));
const Produk = lazy(() => import("./pages/landing/Produk"));
const ProdukDetail = lazy(() => import("./pages/landing/ProdukDetail"));
const Resep = lazy(() => import("./pages/landing/Resep"));
const ResepDetail = lazy(() => import("./pages/landing/ResepDetail"));
const Artikel = lazy(() => import("./pages/landing/Artikel"));
const ArtikelDetail = lazy(() => import("./pages/landing/ArtikelDetail"));
const Kontak = lazy(() => import("./pages/landing/Kontak"));

// === Halaman Dasbor Admin (Diunduh HANYA jika admin masuk) ===
const Login = lazy(() => import("./pages/dashboard/Login"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const CategoryManagement = lazy(() => import("./pages/dashboard/CategoryManagement"));
const ProductManagement = lazy(() => import("./pages/dashboard/ProductManagement"));
const ArticleManagement = lazy(() => import("./pages/dashboard/ArticleManagement"));
const RecipeManagement = lazy(() => import("./pages/dashboard/RecipeManagement"));
const TestimonialManagement = lazy(() => import("./pages/dashboard/TestimonialManagement"));
const CertificateManagement = lazy(() => import("./pages/dashboard/CertificateManagement"));
const ClientManagement = lazy(() => import("./pages/dashboard/ClientManagement"));
const GalleryManagement = lazy(() => import("./pages/dashboard/GalleryManagement"));
const MessageManagement = lazy(() => import("./pages/dashboard/MessageManagement"));

// Peta route → judul tab browser
const PAGE_TITLES = {
  "/": "Baso Yen - Sajian Praktis Istimewa | Mie, Bakso & Sosis Sapi Premium Bandung",
  "/tentang-kami": "Baso Yen - Tentang Kami",
  "/layanan": "Baso Yen - Layanan",
  "/produk": "Baso Yen - Produk",
  "/resep": "Baso Yen - Resep",
  "/article": "Baso Yen - Artikel & Edukasi",
  "/kontak": "Baso Yen - Kontak",
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function DefaultSEO() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "Baso Yen - Sajian Praktis Istimewa | Mie, Bakso & Sosis Sapi Premium Bandung";

  // Matikan SEO bawaan jika pengunjung berada di halaman dinamis (Produk/Resep/Artikel)
  // karena halaman-halaman tersebut akan menggunakan komponen <SEO /> mereka sendiri dengan gambar khusus.
  if (pathname.includes('/produk/') || pathname.includes('/article/') || pathname.includes('/resep/')) {
    return null;
  }

  return <SEO title={title} isExactTitle={true} url={pathname} />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          
          {/* === RUTE PENGUNJUNG (LANDING PAGE) === */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Beranda />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/layanan" element={<Layanan />} />
            
            <Route path="/produk" element={<Produk />} />
            <Route path="/produk/:slug" element={<ProdukDetail />} />
            
            <Route path="/resep" element={<Resep />} />
            <Route path="/resep/:slug" element={<ResepDetail />} />
            
            <Route path="/article" element={<Artikel />} />
            <Route path="/article/:slug" element={<ArtikelDetail />} />
            
            <Route path="/kontak" element={<Kontak />} />
          </Route>
          
          {/* === RUTE DASHBOARD === */}
          {/* Halaman Login Admin (Publik) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Halaman Dasbor (Harus Login Dulu) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<Overview />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/articles" element={<ArticleManagement />} />
              <Route path="/admin/recipes" element={<RecipeManagement />} />
              <Route path="/admin/testimonials" element={<TestimonialManagement />} />
              <Route path="/admin/certificates" element={<CertificateManagement />} />
              <Route path="/admin/clients" element={<ClientManagement />} />
              <Route path="/admin/galleries" element={<GalleryManagement />} />
              <Route path="/admin/messages" element={<MessageManagement />} />
            </Route>
          </Route>

        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DefaultSEO />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
