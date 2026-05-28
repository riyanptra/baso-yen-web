import ScrollReveal from "../../ui/ScrollReveal";

export default function MisiSection() {
  return (
    <section className="bg-yen-dark text-yen-white py-28 relative overflow-hidden grain-overlay bg-polka-pattern border-t border-yen-accent/15">
      {/* Soft glow blobs in corners & center */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yen-accent/20 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yen-gold/20 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-yen-gold/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      {/* Editorial Outline Typography */}
      <div className="absolute top-[8%] left-[5%] font-playfair italic text-6xl sm:text-8xl lg:text-9xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        Visi & Misi
      </div>
      <div className="absolute bottom-[8%] right-[5%] font-playfair italic text-6xl sm:text-8xl lg:text-9xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        Sejak 1988
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          {/* Glassmorphic Quote Panel */}
          <div className="bg-[#24201E]/60 backdrop-blur-md border border-yen-cream/10 rounded-[36px] p-8 sm:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-yen-accent/30 transition-all duration-500">
            {/* Top Accent Gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yen-accent via-yen-gold to-yen-accent" />
            
            {/* Floating Quotes */}
            <span className="absolute top-4 left-6 text-yen-gold/15 font-serif text-8xl sm:text-9xl leading-none select-none pointer-events-none">&ldquo;</span>
            <span className="absolute bottom-[-24px] right-6 text-yen-accent/15 font-serif text-8xl sm:text-9xl leading-none select-none pointer-events-none">&rdquo;</span>

            <span className="font-bebas text-xs tracking-[0.2em] text-yen-gold uppercase block mb-6">
              MISI & FILOSOFI
            </span>

            {/* Mission Statement text */}
            <h3 className="font-jakarta text-xl sm:text-2xl md:text-3xl font-extrabold text-yen-white leading-relaxed mb-8 relative z-10 max-w-3xl mx-auto">
              Menyediakan <span className="text-yen-gold">pelayanan yang terbaik</span> bagi konsumen-konsumen kami. Inti dari layanan kami adalah mengerti apa yang diinginkan konsumen, kebutuhan mereka, dan apa yang didapat dari kami. <span className="text-yen-accent">Kualitas dan kepuasan</span> konsumen adalah pedoman bagi kami.
            </h3>

            {/* Accent Divider */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-yen-accent to-yen-gold mx-auto mb-6" />

            {/* Signature Title */}
            <p className="font-bebas text-sm sm:text-base tracking-[0.2em] text-yen-accent uppercase font-bold">
              MISI UTAMA BASO YEN
            </p>
            <p className="font-jakarta text-[10px] text-yen-cream/40 uppercase mt-2 tracking-widest">
              Kelezatan Tradisional · Standar Modern
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
