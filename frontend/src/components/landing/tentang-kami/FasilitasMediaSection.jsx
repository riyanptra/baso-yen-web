import { useState, useEffect } from "react";
import axiosInstance from "../../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

export default function FasilitasMediaSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axiosInstance.get("/galleries");
        if (response.data && response.data.data) {
          const fasilitas = response.data.data.filter((g) => g.type === "FASILITAS_TENTANG_KAMI");
          if (fasilitas.length > 0) {
            const mapped = fasilitas.map(g => ({
              src: g.image,
              title: g.title,
              desc: g.description || "Dokumentasi Fasilitas Baso Yen"
            }));
            setCarouselImages(mapped);
            setCurrentSlide(0);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil galeri:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const nextSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  // Auto-advance hanya saat lightbox tertutup
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [lightboxOpen]);

  // Tutup lightbox dengan Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  return (
    <section className="bg-yen-white py-24 relative overflow-hidden border-t-2 border-yen-cream bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel variant="bebas" color="accent">
              DOKUMENTASI
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark uppercase mt-2">
              Baso yen dalam footage
            </h2>
          </ScrollReveal>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* Foto Perusahaan / Carousel Gallery */}
          {carouselImages.length > 0 && (
          <ScrollReveal direction="up" className="w-full">
            <div className="relative bg-yen-dark p-4 rounded-[32px] shadow-[0_20px_50px_rgba(33,33,33,0.3)] border-4 border-[#2A2A2A] overflow-hidden group flex flex-col justify-between w-full">
              <div className="relative w-full aspect-video md:aspect-21/9 rounded-[24px] overflow-hidden bg-black flex items-center justify-center shadow-inner group">
                {/* Carousel Image — klik untuk buka lightbox */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={carouselImages[currentSlide]?.src}
                    alt={carouselImages[currentSlide]?.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightboxOpen(true)}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 cursor-zoom-in"
                  />
                </AnimatePresence>

                {/* Dark Overlay Gradient inside the slide */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Zoom hint */}
                <div
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-zoom-in"
                >
                  <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 font-bebas text-xs tracking-widest pointer-events-none">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 8v6M8 11h6"
                      />
                    </svg>
                    LIHAT FOTO PENUH
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yen-accent text-yen-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 focus:outline-none z-20"
                  title="Sebelumnya"
                >
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yen-accent text-yen-white flex items-center justify-center cursor-pointer transition-all opacity-0 group-hover:opacity-100 focus:outline-none z-20"
                  title="Selanjutnya"
                >
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Slide Details overlay (Top Left) */}
                <div className="absolute top-4 left-4 bg-yen-accent/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-yen-cream/20 z-10 text-white">
                  <span className="font-bebas tracking-widest text-xs sm:text-sm">
                    PUSAT DOKUMENTASI
                  </span>
                </div>

                {/* Slide description (Bottom Left overlay) */}
                <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
                  <p className="font-jakarta text-[11px] sm:text-xs text-yen-cream/90 line-clamp-1 bg-black/35 backdrop-blur-xs px-3 py-1 rounded inline-block">
                    {carouselImages[currentSlide]?.desc}
                  </p>
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all focus:outline-none cursor-pointer ${
                        currentSlide === idx
                          ? "bg-yen-accent w-4"
                          : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Custom Media Player Caption */}
              <div className="mt-5 px-3 flex justify-between items-center text-yen-white">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl text-yen-accent animate-pulse shadow-yen-accent">
                    ●
                  </span>
                  <span className="font-jakarta font-bold text-xs sm:text-sm tracking-widest uppercase">
                    {carouselImages[currentSlide]?.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Tombol expand kecil */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="text-yen-cream/50 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    title="Lihat foto penuh"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                  <span className="font-bebas tracking-widest text-yen-cream/40 text-xs sm:text-sm bg-yen-white/10 px-2.5 py-1 rounded">
                    FOTO {currentSlide + 1} / {carouselImages.length}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          )}

          {/* Video Player */}
          <ScrollReveal direction="up" delay={0.15} className="w-full">
            <div className="relative bg-yen-dark p-4 rounded-[32px] shadow-[0_20px_50px_rgba(33,33,33,0.3)] border-4 border-[#2A2A2A] overflow-hidden group flex flex-col justify-between w-full">
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-black flex items-center justify-center shadow-inner">
                <iframe
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  src="https://www.youtube.com/embed/4kYQDhYrMB4?si=VJSf1El5VFt_MZSG"
                  title="Video Profil Baso Yen"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-linear-to-tr from-yen-accent/20 to-transparent pointer-events-none mix-blend-screen" />
              </div>

              <div className="mt-5 px-3 flex justify-between items-center text-yen-white">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl text-yen-accent animate-pulse shadow-yen-accent">
                    ●
                  </span>
                  <span className="font-jakarta font-bold text-xs sm:text-sm tracking-widest uppercase">
                    Liputan Profil Media
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bebas tracking-widest text-yen-cream/40 text-xs sm:text-sm bg-yen-white/10 px-2 py-1 rounded">
                    HD 1080P
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ============ LIGHTBOX ============ */}
      <AnimatePresence>
        {lightboxOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/92 backdrop-blur-sm z-100 cursor-zoom-out"
            />

            {/* Lightbox Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="fixed inset-0 z-101 flex flex-col items-center justify-center p-4 pointer-events-none"
            >
              {/* Image */}
              <div className="relative max-w-5xl w-full pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={carouselImages[currentSlide]?.src}
                    alt={carouselImages[currentSlide]?.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl select-none"
                  />
                </AnimatePresence>

                {/* Prev / Next arrows in lightbox */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-yen-accent text-white flex items-center justify-center cursor-pointer transition-all z-10 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-yen-accent text-white flex items-center justify-center cursor-pointer transition-all z-10 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-yen-accent hover:bg-yen-dark text-white flex items-center justify-center cursor-pointer transition-all focus:outline-none shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Caption + dots */}
              <div className="pointer-events-auto mt-5 text-center space-y-3">
                <p className="font-jakarta font-bold text-white text-sm tracking-wider uppercase">
                  {carouselImages[currentSlide]?.title}
                </p>
                <p className="font-jakarta text-xs text-white/50">
                  {carouselImages[currentSlide]?.desc}
                </p>
                <div className="flex gap-2 justify-center mt-2">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer focus:outline-none ${
                        currentSlide === idx
                          ? "bg-yen-accent w-5"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-bebas text-[10px] tracking-widest text-white/30 mt-2">
                  Tekan ESC atau klik luar untuk menutup · ← → untuk navigasi
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
