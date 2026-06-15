import { useState, useEffect } from "react";
import { useTestimonials } from "../../../hooks/api/useTestimonials";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const TestimoniCard = ({ testi }) => (
  <div className="bg-[#1C1A18]/80 backdrop-blur-md border border-yen-cream/5 p-8 h-full relative flex flex-col justify-between rounded-2xl overflow-hidden group hover:border-yen-cream/10 transition-all duration-300">
    <div className="relative z-10">
      {/* Rating and Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 text-[#F59E0B]">
          {[...Array(testi.rating || 5)].map((_, i) => (
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
        {testi.tag && (
          <span className="text-[10px] font-jakarta font-bold tracking-widest text-yen-white/40 uppercase">
            {testi.tag}
          </span>
        )}
      </div>

      {/* Quote text */}
      <p className="font-jakarta text-[14px] text-yen-white/90 leading-relaxed mb-10 relative italic">
        {testi.content}
      </p>
    </div>

    {/* Author detail */}
    <div className="flex items-center gap-4 relative z-10 mt-auto">
      <div className="relative shrink-0">
        {testi.avatar ? (
          <img decoding="async" 
            loading="lazy"
            src={testi.avatar}
            alt={testi.name}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full text-white flex items-center justify-center font-jakarta font-bold text-sm"
            style={{
              backgroundColor: "#E31E24",
            }}
          >
            {testi.name ? testi.name[0].toUpperCase() : "Y"}
          </div>
        )}
      </div>

      <div>
        <h4 className="font-jakarta font-bold text-[14px] text-yen-white">
          {testi.name}
        </h4>
        <p className="font-jakarta text-[12px] text-yen-white/40">
          {testi.role}
        </p>
      </div>
    </div>
  </div>
);

export default function TestimoniSection() {
  const { data: liveTestimonials = [], isLoading } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <section className="bg-yen-dark text-yen-white py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* CENTERED HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal direction="up">
            <SectionLabel variant="bebas" color="gold">
              TESTIMONI
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-5xl font-bold text-yen-white mt-3 mb-4">
              Apa Kata <span className="text-yen-accent">Mereka?</span>
            </h2>
            <p className="font-jakarta text-md text-yen-white/70">
              Para pelanggan yang telah mempercayakan kelezatan hidangan mereka
              pada Baso Yen.
            </p>

            {/* Simple Rating Badge */}
            <div className="inline-flex items-center gap-3 mt-6 bg-[#24201E]/60 border border-yen-cream/10 px-5 py-2 rounded-full backdrop-blur-sm">
              <span className="text-xl font-bold text-yen-gold">4.9</span>
              <div className="flex text-yen-gold">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-yen-white/50 border-l border-yen-cream/10 pl-3">
                Pilihan Pelanggan
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden w-full">
          <ScrollReveal direction="up" delay={0.2}>
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
                     className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 transition-opacity duration-500"
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

        {/* NAVIGATION */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-yen-cream/5 bg-[#24201E]/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:bg-[#322c29] hover:border-yen-cream/20 active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-4 h-4 stroke-current text-yen-white/70"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex justify-center items-center gap-2">
              {[
                ...Array(
                  Math.max(1, liveTestimonials.length - visibleCards + 1),
                ),
              ].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    safeIndex === index
                      ? "w-6 bg-[#E31E24]"
                      : "w-1.5 bg-yen-white/20 hover:bg-yen-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-yen-cream/5 bg-[#24201E]/40 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:bg-[#322c29] hover:border-yen-cream/20 active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
            >
              <svg
                className="w-4 h-4 stroke-current text-yen-white/70"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
