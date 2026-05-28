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
    .filter(g => g.type === "BERANDA_POLAROID")
    .map((p, idx) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      alt: p.title,
      tapeColor: idx % 2 === 0 ? "bg-yen-accent/15 border-yen-accent/25" : "bg-yen-gold/20 border-yen-gold/30",
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
      <div className="absolute left-[12%] top-[25%] w-[350px] h-[250px] bg-yen-accent/5 rounded-full blur-[60px] pointer-events-none -z-10" />
      <div className="absolute right-[12%] top-[35%] w-[250px] h-[200px] bg-yen-gold/5 rounded-full blur-[50px] pointer-events-none -z-10" />

      {/* Decorative Scrapbook Handwritten text/notes in background */}
      <div className="absolute left-[4%] top-[70%] z-0 max-w-[220px] -rotate-6deg select-none pointer-events-none hidden xl:block">
        <p className="font-playfair italic text-sm text-yen-neutral/25 leading-relaxed tracking-wide">
          "Resep legendaris yang dimulai dari sebuah dapur kecil di Bandung,
          menyajikan mie kenyal dan bakso premium dengan bahan alami pilihan..."
        </p>
      </div>

      <div className="absolute right-[4%] top-[15%] z-0 max-w-[180px] rotate-[8deg] select-none pointer-events-none hidden xl:block">
        <p className="font-playfair italic text-sm text-yen-neutral/25 leading-relaxed tracking-wide">
          * Tanpa pengawet buatan
          <br />
          * Daging sapi segar pilihan
          <br />* 100% Halal Terdaftar
        </p>
      </div>

      {/* Floating Doodles */}
      {/* Chili Doodle */}
      <div className="absolute right-[5%] bottom-[15%] opacity-[0.06] rotate-45 select-none pointer-events-none hidden md:block z-0">
        <svg
          className="w-10 h-10 fill-yen-accent"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2c-.6 0-1 .4-1 1s.4 1 1 1c1.5 0 3 1.2 3.4 2.8.2.8.9 1.2 1.7 1 .8-.2 1.2-.9 1-1.7C17.4 3.6 14.9 2 12 2zm-1.8 5.7c-.5-.6-1.3-.8-2-.3l-.8.6c-.6.5-.8 1.3-.3 2 .1.2.3.3.5.5l5.6 5.6c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l1-1c.8-.8.8-2 0-2.8L10.2 7.7zm8.4 9.9c-.8.8-1.9 1.4-3.1 1.4H8c-2.2 0-4-1.8-4-4V8c0-.6-.4-1-1-1s-1 .4-1 1v6.8c0 3.3 2.7 6 6 6h7.7c1.7 0 3.3-.7 4.5-1.9.6-.6.6-1.5 0-2.1-.6-.6-1.5-.6-2.1 0z" />
        </svg>
      </div>

      {/* Garlic Doodle */}
      <div className="absolute left-[3%] top-[18%] opacity-[0.06] -rotate-12 select-none pointer-events-none hidden md:block z-0">
        <svg
          className="w-10 h-10 fill-yen-gold"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5s.5.2.5.5v3zm0-5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9c0-.3.2-.5.5-.5s.5.2.5.5v3.5z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* F&B Polaroid Stack Collage */}
        <ScrollReveal
          direction="right"
          className="lg:col-span-7 relative w-full h-[430px] sm:h-[570px] lg:h-[630px] select-none"
        >
          {/* Background Ink Stamps */}
          <div className="absolute right-[-2%] bottom-[6%] z-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dashed border-yen-accent/15 flex items-center justify-center -rotate-12 select-none pointer-events-none">
            <div className="text-center font-bebas text-yen-accent/15 leading-none">
              <span className="text-[9px] sm:text-[10px] tracking-widest font-black block">
                QUALITY APPROVED
              </span>
              <span className="text-xl sm:text-3xl font-black block my-0.5 sm:my-1">
                1988
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest font-black block">
                BANDUNG - IDN
              </span>
            </div>
          </div>

          <div className="absolute left-[-2%] top-[0%] z-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-yen-gold/15 flex items-center justify-center rotate-12 select-none pointer-events-none">
            <div className="text-center font-bebas text-yen-gold/20 leading-none">
              <span className="text-[8px] sm:text-[9px] tracking-widest font-black block">
                HIGIENIS
              </span>
              <span className="text-sm sm:text-base font-black block mt-0.5">
                100% ASLI
              </span>
            </div>
          </div>

          {/* Scrapbook Torn Kraft Paper Memo */}
          <div className="absolute left-[-8%] bottom-[-6%] rotate-3 z-15 w-[130px] sm:w-[190px] bg-[#FAF3E0] p-3 sm:p-5 rounded-[2px] shadow-[3px_6px_15px_rgba(0,0,0,0.06)] border border-[#E9DCC4] select-none pointer-events-none hidden sm:block">
            {/* Washi tape holding memo */}
            <div className="absolute -top-3 left-1/4 w-10 h-4 bg-yen-gold/20 rotate-12 border-x border-dashed border-yen-gold/35" />
            {/* Notebook binding holes on top */}
            <div className="flex justify-around absolute -top-1.5 left-0 right-0 px-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-[#FCFAF8] border border-[#E9DCC4]"
                />
              ))}
            </div>
            <span className="font-bebas text-[9px] sm:text-[10px] text-yen-accent tracking-widest block mb-1">
              CATATAN DAPUR
            </span>
            <ul className="space-y-1 sm:space-y-1.5 font-playfair italic text-[9px] sm:text-[11px] text-yen-neutral leading-tight list-disc pl-3">
              <li>Resep Asli 1988</li>
              <li>Tanpa Pengawet Buatan</li>
              <li>100% Halal Terjamin</li>
              <li>Tekstur Kenyal Alami</li>
            </ul>
          </div>

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

        {/* Typography Layout */}
        <ScrollReveal direction="left" className="lg:col-span-5 text-left">
          <SectionLabel variant="bebas" color="accent">
            TENTANG KAMI
          </SectionLabel>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-yen-dark tracking-tight leading-none mb-6">
            RASA LEGENDARIS,
            <br />
            <span className="text-yen-accent">NIKMAT BERSAMA!</span>
          </h2>
          <p className="font-jakarta text-sm text-yen-neutral leading-relaxed mb-6">
            Baso Yen, produsen mie basah, bakso, dan sosis sapi legendaris di
            Bandung sejak 1988. Kami berkomitmen menyajikan kelezatan premium
            tanpa pengawet buatan untuk setiap kebersamaan Anda.
          </p>
          <p className="font-jakarta text-sm text-yen-neutral leading-relaxed mb-8">
            Telah dipercaya puluhan tahun oleh hotel bintang lima, resto
            legendaris, cafe, dan jutaan keluarga di Indonesia.
          </p>
          <Link to="/tentang-kami">
            <Button
              variant="primary"
              className="px-8 py-3.5 rounded-full font-bebas text-base tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Pelajari Selengkapnya
            </Button>
          </Link>
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
