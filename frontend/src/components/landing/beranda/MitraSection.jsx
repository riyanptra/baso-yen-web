import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

import { useClients } from "../../../hooks/api/useClients";

export default function MitraSection() {  
  const { data: clientLogos = [] } = useClients();

  // Membagi logo menjadi dua baris untuk efek counter-scrolling secara dinamis
  const half = Math.ceil(clientLogos.length / 2);
  const row1 = clientLogos.slice(0, half);
  const row2 = clientLogos.slice(half);

  const renderMarqueeRow = (logos, reverse = false, duration = "35s") => {
    return (
      <div className="relative w-full flex overflow-x-hidden py-3 group">
        <div
          className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animationDuration: duration,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {/* Set 1 */}
          <div className="flex items-center gap-6 pr-6">
            {logos.map((client, idx) => (
              <div
                key={`set1-${client.name}-${idx}`}
                className="flex shrink-0 items-center justify-center w-[140px] h-[80px] sm:w-[170px] sm:h-[96px] bg-[#FCFAF8] border border-yen-cream/80 rounded-2xl shadow-[0_4px_12px_rgba(227,30,36,0.02)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yen-accent/30 hover:shadow-[0_12px_24px_rgba(227,30,36,0.08)] group/card"
              >
                <img loading="lazy"
                  src={client.src}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-all duration-300 select-none"
                />
              </div>
            ))}
          </div>

          {/* Set 2 (Duplikasi persis untuk seamless loop) */}
          <div className="flex items-center gap-6 pr-6" aria-hidden="true">
            {logos.map((client, idx) => (
              <div
                key={`set2-${client.name}-${idx}`}
                className="flex shrink-0 items-center justify-center w-[140px] h-[80px] sm:w-[170px] sm:h-[96px] bg-[#FCFAF8] border border-yen-cream/80 rounded-2xl shadow-[0_4px_12px_rgba(227,30,36,0.02)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yen-accent/30 hover:shadow-[0_12px_24px_rgba(227,30,36,0.08)] group/card"
              >
                <img loading="lazy"
                  src={client.src}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-all duration-300 select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-yen-white pt-12 pb-20 overflow-hidden border-b border-yen-accent/10 relative bg-grid-pattern">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yen-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center relative z-10">
        <ScrollReveal>
          <SectionLabel variant="bebas" color="accent">
            MITRA
          </SectionLabel>
          <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark mt-3 leading-none uppercase">
            klien <span className="text-yen-accent">Kami</span>
          </h2>
          <p className="font-jakarta text-sm md:text-base text-yen-neutral mt-4 max-w-2xl mx-auto leading-relaxed">
            Menjadi pilihan utama dan dipercaya oleh berbagai hotel bintang
            lima, catering premium, hingga brand kuliner ternama di seluruh
            Indonesia.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee Wrapper */}
      {clientLogos.length > 0 ? (
        <div className="relative w-full py-4 overflow-x-hidden z-10">
          {/* Gradient Shadow Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-linear-to-r from-yen-white via-yen-white/70 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-linear-to-l from-yen-white via-yen-white/70 to-transparent z-20 pointer-events-none" />

          {/* Baris 1: Bergerak Normal (Kiri) */}
          {row1.length > 0 && renderMarqueeRow(row1, false, "32s")}

          {/* Baris 2: Bergerak Terbalik (Kanan) */}
          {row2.length > 0 && renderMarqueeRow(row2, true, "38s")}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 font-medium z-10 relative">
          Mitra strategis dan klien kami akan ditampilkan di sini.
        </div>
      )}
    </section>
  );
}
