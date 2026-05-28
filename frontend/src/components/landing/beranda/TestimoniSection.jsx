import { useState, useEffect } from "react";
import { useTestimonials } from "../../../hooks/api/useTestimonials";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const TestimoniCard = ({ testi }) => (
  <div className="bg-[#24201E]/60 backdrop-blur-md border border-yen-cream/10 p-8 md:p-10 h-full relative flex flex-col justify-between rounded-[32px] overflow-hidden group shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(227,30,36,0.15)] hover:border-yen-accent/40 transition-all duration-300">
    {/* Top Accent Gradient Line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yen-accent via-yen-gold to-yen-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Floating Decorative Quote Mark */}
    <div className="absolute right-6 top-6 text-yen-accent/10 group-hover:text-yen-accent/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 pointer-events-none select-none z-0">
      <svg
        className="w-12 h-12 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.437.917-4 3.638-4 5.849h3.999v10h-9.995z" />
      </svg>
    </div>

    <div className="relative z-10">
      {/* Rating and Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0.5 text-yen-gold">
          {[...Array(testi.rating || 5)].map((_, i) => (
            <span key={i} className="text-sm">
              ★
            </span>
          ))}
        </div>
        {testi.tag && (
          <span className="text-[9px] font-jakarta font-black tracking-wider bg-yen-accent/15 text-yen-accent border border-yen-accent/20 px-3 py-1 rounded-full uppercase">
            {testi.tag}
          </span>
        )}
      </div>

      {/* Quote text */}
      <p className="font-jakarta text-[14px] md:text-[15px] text-yen-white/90 leading-relaxed mb-8 relative italic">
        "{testi.content}"
      </p>
    </div>

    {/* Author detail */}
    <div className="border-t border-yen-cream/10 pt-6 flex items-center gap-4 relative z-10">
      {/* Stylized Avatar Ring */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-yen-accent to-yen-gold opacity-50 blur-xs group-hover:opacity-100 transition-opacity duration-300" />
        {testi.avatar ? (
          <img
            loading="lazy"
            src={testi.avatar}
            alt={testi.name}
            className="relative w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-[#24201E] group-hover:scale-105 transition-transform duration-300 z-10"
          />
        ) : (
          <div
            className="relative w-12 h-12 rounded-full text-white flex items-center justify-center font-jakarta font-black text-lg shadow-md ring-2 ring-[#24201E] group-hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: "#E31E24",
            }}
          >
            {testi.name ? testi.name[0].toUpperCase() : "Y"}
          </div>
        )}
      </div>

      <div>
        <h4 className="font-jakarta font-extrabold text-sm text-yen-white tracking-wide group-hover:text-yen-accent transition-colors duration-300">
          {testi.name}
        </h4>
        <p className="font-jakarta text-[11px] text-yen-neutral/80 mt-0.5">
          {testi.role}
        </p>
      </div>
    </div>
  </div>
);

export default function TestimoniSection() {
  const { data: liveTestimonials = [], isLoading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, liveTestimonials.length - visibleCards);

  // Auto slide
  useEffect(() => {
    if (liveTestimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [maxIndex, liveTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const safeIndex = Math.min(currentIndex, maxIndex);

  return (
    <section className="bg-yen-dark text-yen-white py-24 relative overflow-hidden border-t border-yen-accent/15 grain-overlay bg-polka-pattern">
      {/* Soft glow blobs in corners & center */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yen-accent/20 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yen-gold/20 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-yen-accent/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      {/* Editorial Outline Typography */}
      <div className="absolute top-[8%] right-[10%] font-playfair italic text-6xl sm:text-8xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        Sajian Istimewa
      </div>
      <div className="absolute bottom-[8%] left-[5%] font-playfair italic text-6xl sm:text-8xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        Sejak 1988
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Header & Trust Stats Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal direction="right">
              <SectionLabel variant="bebas" color="gold">
                TESTIMONI
              </SectionLabel>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold text-yen-white mt-3 leading-none">
                Apa Kata <span className="text-yen-accent">Mereka?</span>
              </h2>
              <p className="font-jakarta text-sm text-yen-white mt-4 leading-relaxed max-w-md">
                Dengar cerita langsung dari chef profesional, pemilik usaha
                kuliner, hingga ibu rumah tangga yang telah mempercayakan
                kelezatan hidangan mereka pada Baso Yen.
              </p>

              {/* Trust & Review Card */}
              <div className="mt-8 p-6 bg-[#24201E]/40 border border-yen-cream/10 rounded-[24px] shadow-[0_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden group hover:border-yen-gold/20 transition-all duration-300">
                <div className="flex items-center gap-4.5">
                  <div className="text-5xl font-bold text-yen-gold font-playfair italic tracking-tight leading-none">
                    4.9
                  </div>
                  <div>
                    <div className="flex gap-1 text-yen-gold">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[11.5px] font-jakarta text-yen-cream/70 mt-1 font-medium tracking-wide">
                      Berdasarkan 2,500+ Ulasan
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-yen-cream/5 flex items-center justify-between">
                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {liveTestimonials.slice(0, 4).map((testi) => (
                      <img
                        loading="lazy"
                        key={testi.id}
                        src={testi.avatar || `https://ui-avatars.com/api/?name=${testi.name}&background=E31E24&color=fff`}
                        alt={testi.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#24201E] border border-yen-gold/10"
                      />
                    ))}
                    <div className="flex h-9 w-9 rounded-full ring-2 ring-[#24201E] bg-yen-neutral text-yen-cream items-center justify-center text-[10px] font-black font-jakarta border border-yen-gold/10">
                      +2k
                    </div>
                  </div>
                  <span className="text-[9px] font-bebas tracking-widest text-yen-gold bg-yen-gold/5 border border-yen-gold/25 px-3.5 py-1 rounded-full uppercase">
                    ✓ Terverifikasi
                  </span>
                </div>
              </div>

              {/* Slider Navigation Buttons (Shown only on Desktop lg+) */}
              <div className="hidden lg:flex items-center gap-3 mt-8">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-yen-cream/10 bg-[#24201E] flex items-center justify-center text-white transition-all duration-300 hover:bg-[#322c29] hover:border-yen-accent/30 shadow-[0_4px_14px_rgba(0,0,0,0.4)] active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
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
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-yen-accent flex items-center justify-center text-white transition-all duration-300 hover:bg-yen-accent/90 shadow-[0_6px_20px_rgba(227,30,36,0.35)] hover:shadow-[0_8px_24px_rgba(227,30,36,0.45)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-5 h-5 stroke-current"
                    fill="none"
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
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Testimonials Carousel */}
          <div className="lg:col-span-7 relative overflow-hidden w-full py-4">
            <ScrollReveal direction="left">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${safeIndex * (100 / visibleCards)}%)`,
                }}
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center h-64 text-yen-cream/60 animate-pulse">
                    Memuat cerita pelanggan...
                  </div>
                ) : liveTestimonials.length > 0 ? (
                  liveTestimonials.map((testi) => (
                    <div
                      key={testi.id}
                      className="w-full md:w-1/2 shrink-0 px-3 transition-opacity duration-500"
                    >
                      <TestimoniCard testi={testi} />
                    </div>
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center h-64 text-yen-cream/60">
                    Belum ada testimoni.
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* MOBILE NAVIGATION & DOTS: Navigation buttons below cards on mobile/tablet */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 border-t border-yen-cream/5 pt-8 lg:hidden">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-yen-cream/10 bg-[#24201E] flex items-center justify-center text-white transition-all duration-300 hover:bg-[#322c29] hover:border-yen-accent/30 shadow-[0_4px_14px_rgba(0,0,0,0.4)] active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
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
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-yen-accent flex items-center justify-center text-white transition-all duration-300 hover:bg-yen-accent/90 shadow-[0_6px_20px_rgba(227,30,36,0.35)] hover:shadow-[0_8px_24px_rgba(227,30,36,0.45)] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5 stroke-current"
                fill="none"
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

          {/* Indicator Dots */}
          <div className="flex justify-center items-center gap-2">
            {[...Array(Math.max(1, liveTestimonials.length - visibleCards + 1))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    safeIndex === index
                      ? "w-8 bg-yen-accent shadow-[0_2px_8px_rgba(227,30,36,0.4)]"
                      : "w-2.5 bg-yen-cream/20 hover:bg-yen-cream/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ),
            )}
          </div>
        </div>

        {/* DESKTOP ONLY DOTS: Positioned at the bottom of the section for desktop */}
        <div className="hidden lg:flex justify-center items-center gap-2 mt-12">
          {[...Array(Math.max(1, liveTestimonials.length - visibleCards + 1))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  safeIndex === index
                    ? "w-8 bg-yen-accent shadow-[0_2px_8px_rgba(227,30,36,0.4)]"
                    : "w-2.5 bg-yen-cream/20 hover:bg-yen-cream/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
