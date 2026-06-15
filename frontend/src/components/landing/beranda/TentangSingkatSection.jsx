import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import { useGalleries } from "../../../hooks/api/useGalleries";

export default function TentangSingkatSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Mengambil data galeri dari React Query
  const { data: allGalleries = [] } = useGalleries();

  // Format khusus untuk polaroid di Beranda
  const slides = allGalleries
    .filter((g) => g.type === "BERANDA_POLAROID")
    .map((p, idx) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      alt: p.title,
      tapeColor:
        idx % 2 === 0
          ? "bg-yen-accent/15 border-yen-accent/25"
          : "bg-yen-gold/20 border-yen-gold/30",
    }));

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance hanya saat lightbox tertutup
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [lightboxOpen, nextSlide]);

  // Keyboard: ESC tutup, ← → navigasi
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, nextSlide, prevSlide]);

  return (
    <section className="bg-yen-white pt-24 pb-12 border-y-2 border-yen-white overflow-hidden bg-grid-pattern relative">
      {/* Soft Background Watercolor Splashes */}
      <div className="absolute left-[12%] top-[25%] w-[350px] h-[250px] bg-[radial-gradient(circle,rgba(227,30,36,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />
      <div className="absolute right-[12%] top-[35%] w-[250px] h-[200px] bg-[radial-gradient(circle,rgba(255,136,0,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Typography Layout */}
        <ScrollReveal direction="right" className="lg:col-span-5 text-left">
          <SectionLabel variant="bebas" color="accent">
            TENTANG KAMI
          </SectionLabel>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-yen-dark tracking-tight leading-none mb-6">
            SAJIAN
            <br />
            <span className="text-yen-accent">PRAKTIS ISTIMEWA</span>
          </h2>
          <p className="font-jakarta text-md text-yen-neutral leading-relaxed mb-6">
            Baso Yen, produsen mie basah, Bakso dan sosis sapi di Bandung. Kami
            berkomitmen untuk memberikan kualitas yang terbaik. Pengolahan mie
            baso & sosis Yen ini pun mudah, sehingga setiap orang dapat memasak
            mie baso & sosis selezat di resto. Sejak berdiri, perusahaan Yen
            telah dipercaya sebagai pemasok di restoran-restoran, hotel-hotel,
            cafe, dan foodcourt.
          </p>

          <Link to="/tentang-kami">
            <Button
              variant="primary"
              className="px-8 py-3.5 rounded-full font-bebas text-base tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Lihat Selengkapnya
            </Button>
          </Link>
        </ScrollReveal>

        {/* F&B Polaroid Stack Collage */}
        <ScrollReveal
          direction="left"
          className="lg:col-span-7 relative w-full h-[430px] sm:h-[570px] lg:h-[630px] select-none"
        >
          {/* Polaroid Carousel Frame */}
          {slides.length > 0 && (
            <div className="relative mx-auto mt-4 w-full max-w-[290px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] bg-white p-3 sm:p-4 pb-12 sm:pb-14 border border-yen-cream/80 rounded-xs shadow-[0_20px_50px_rgba(30,27,26,0.14)] z-20 transition-all duration-300 hover:scale-[1.01]">
              {/* Dynamic Washi Tape on top */}
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 backdrop-blur-xs rotate-2 border-y border-dashed z-30 select-none pointer-events-none transition-all duration-500 ${slides[currentSlide].tapeColor}`}
              />

              {/* Slide Image Box — klik untuk lightbox */}
              <div
                className="relative overflow-hidden aspect-square rounded-xs bg-yen-cream/10 cursor-zoom-in group/img"
                onClick={() => setLightboxOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Zoom hint on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bebas text-[10px] tracking-widest">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 8v6M8 11h6"
                      />
                    </svg>
                    LIHAT PENUH
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-yen-dark flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-30 group"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-yen-dark flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-30 group"
                  aria-label="Next image"
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Dynamic Caption */}
              <div className="mt-4 sm:mt-5 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="font-playfair italic text-sm sm:text-base text-yen-dark font-bold select-none"
                  >
                    {slides[currentSlide].title}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Slide Dots Indicator inside Polaroid bottom edge */}
              <div className="flex justify-center gap-1.5 mt-3 sm:mt-4 z-20 relative">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx
                        ? "bg-yen-accent w-3.5"
                        : "bg-yen-accent/30 hover:bg-yen-accent/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </ScrollReveal>
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

            {/* Lightbox Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="fixed inset-0 z-101 flex flex-col items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative max-w-2xl w-full pointer-events-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl select-none"
                  />
                </AnimatePresence>

                {/* Prev / Next */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-yen-accent text-white flex items-center justify-center cursor-pointer transition-all z-10 focus:outline-none"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-yen-accent text-white flex items-center justify-center cursor-pointer transition-all z-10 focus:outline-none"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Close */}
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
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-playfair italic text-white font-bold text-base"
                  >
                    {slides[currentSlide].title}
                  </motion.p>
                </AnimatePresence>
                <div className="flex gap-2 justify-center">
                  {slides.map((_, idx) => (
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
                <p className="font-bebas text-[10px] tracking-widest text-white/30">
                  ESC untuk menutup · ← → untuk navigasi
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
