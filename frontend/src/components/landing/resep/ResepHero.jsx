import { Link } from "react-router-dom";
import SectionLabel from "../../ui/SectionLabel";

export default function ResepHero() {
  return (
    <section className="relative min-h-[28rem] h-auto flex items-center justify-center bg-yen-dark overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24 grain-overlay bg-grid-pattern border-b border-yen-accent/15">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 bg-no-repeat"
        style={{
          backgroundImage: `url('/hero_food_backdrop.png')`,
          filter: "brightness(0.18)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-yen-dark to-transparent z-10" />

      {/* Soft glow blobs */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(227,30,36,0.15)_0%,transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,136,0,0.15)_0%,transparent_60%)] translate-x-1/2 -translate-y-1/2 pointer-events-none z-10" />

      {/* Large background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
        <span className="font-playfair italic text-[110px] sm:text-[160px] lg:text-[200px] font-black text-white opacity-[0.015] tracking-widest translate-y-4">
          RESEP
        </span>
      </div>

      <div className="relative z-20 text-center px-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-[1px] bg-yen-gold/40" />
          <SectionLabel variant="bebas" color="gold">
            DAPUR KULINER YEN
          </SectionLabel>
          <div className="w-8 h-[1px] bg-yen-gold/40" />
        </div>
        <h1 className="font-bebas text-5xl sm:text-7xl font-black text-white mt-1 mb-3 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          Semua <span className="text-yen-accent">Resep</span>
        </h1>
        <p className="font-jakarta text-xs sm:text-sm text-yen-cream/80 max-w-xl mx-auto mb-6 leading-relaxed">
          Temukan berbagai inspirasi resep masakan kreatif dan lezat menggunakan produk mie, bakso, dan sosis Baso Yen untuk menyajikan hidangan istimewa bagi keluarga Anda.
        </p>
        {/* Breadcrumb */}
        <div className="inline-flex items-center justify-center gap-2.5 text-[10px] sm:text-xs font-jakarta tracking-[0.2em] uppercase text-yen-cream/70 bg-[#24201E]/55 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full shadow-md">
          <Link to="/" className="hover:text-yen-accent transition-colors font-bold">
            Beranda
          </Link>
          <span className="text-yen-gold/40 font-bold">•</span>
          <span className="text-yen-white font-extrabold">Resep</span>
        </div>
      </div>
    </section>
  );
}
