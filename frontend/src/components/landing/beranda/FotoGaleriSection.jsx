import ScrollReveal from "../../ui/ScrollReveal"

const FooterGaleriSection = () => {
  return (
    <section className="bg-yen-dark text-yen-white py-12 md:py-28 relative overflow-hidden grain-overlay bg-grid-pattern border-t border-yen-accent/15">
      {/* Soft glow blobs in corners & center (Optimized for performance: using radial-gradient instead of heavy blur) */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(227,30,36,0.15)_0%,transparent_60%)] -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,136,0,0.15)_0%,transparent_60%)] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(227,30,36,0.05)_0%,transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      {/* Editorial Outline Typography */}
      <div className="absolute top-[8%] left-[5%] font-playfair italic text-6xl sm:text-8xl lg:text-9xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        KULINER
      </div>
      <div className="absolute bottom-[8%] right-[5%] font-playfair italic text-6xl sm:text-8xl lg:text-9xl text-white opacity-[0.015] select-none pointer-events-none font-bold z-0">
        BANDUNG
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: Polaroid Photo Collage Stack */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative w-full h-[320px] sm:h-[440px] lg:h-[520px] select-none">
              {/* Polaroid 1 – far left, tilted */}
              <div className="absolute left-0 top-[10%] rotate-[-10deg] hover:-rotate-3 hover:-translate-y-4 hover:scale-[1.04] hover:z-30 transition-all duration-500 z-10 w-[130px] sm:w-[210px] md:w-[230px] bg-[#FAF7F2] p-3 sm:p-4 pb-10 sm:pb-14 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-yen-cream/15">
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yen-gold/15 border-x border-dashed border-yen-gold/30 rotate-[-2deg] backdrop-blur-[2px] shadow-xs z-10" />

                <img decoding="async" 
                  loading="lazy"
                  src="/foto-galeri/olahan-baso.webp"
                  alt="Bakso Kuah Panas Baso Yen"
                  className="w-full aspect-square object-cover rounded-[2px] border border-black/5"
                />
                <p className="text-yen-dark font-playfair font-black italic text-[9px] sm:text-[11px] text-center mt-3 tracking-wide opacity-80">
                  Bakso Kuah
                </p>
              </div>

              {/* Polaroid 2 – center, slightly rotated */}
              <div className="absolute left-[20%] sm:left-[23%] top-[2%] rotate-3 hover:rotate-0 hover:-translate-y-4 hover:scale-[1.05] hover:z-30 transition-all duration-500 z-20 w-[155px] sm:w-[240px] md:w-[265px] bg-[#FAF7F2] p-3 sm:p-4 pb-10 sm:pb-14 rounded-[4px] shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-yen-cream/15">
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-yen-accent/15 border-x border-dashed border-yen-accent/30 rotate-[3deg] backdrop-blur-[2px] shadow-xs z-10" />

                <img decoding="async" 
                  loading="lazy"
                  src="/foto-galeri/olahan-mie.webp"
                  alt="Proses Pembuatan Baso Yen"
                  className="w-full aspect-square object-cover rounded-[2px] border border-black/5"
                />
                <p className="text-yen-dark font-playfair font-black italic text-[9px] sm:text-[11px] text-center mt-3 tracking-wide opacity-80">
                  Mie ayam
                </p>
              </div>

              {/* Polaroid 3 – far right, tilted opposite */}
              <div className="absolute right-0 sm:right-[2%] top-[8%] rotate-[-5deg] hover:rotate-[1deg] hover:-translate-y-4 hover:scale-[1.04] hover:z-30 transition-all duration-500 z-10 w-[130px] sm:w-[200px] md:w-[220px] bg-[#FAF7F2] p-3 sm:p-4 pb-10 sm:pb-14 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-yen-cream/15">
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yen-gold/15 border-x border-dashed border-yen-gold/30 rotate-[-4deg] backdrop-blur-[2px] shadow-xs z-10" />

                <img decoding="async" 
                  loading="lazy"
                  src="/foto-galeri/olahan-sosis.webp"
                  alt="Bahan Baku Segar Baso Yen"
                  className="w-full aspect-square object-cover rounded-[2px] border border-black/5"
                />
                <p className="text-yen-dark font-playfair font-black italic text-[9px] sm:text-[11px] text-center mt-3 tracking-wide opacity-80">
                  Capcay
                </p>
              </div>

              {/* Polaroid 4 – bottom center, peeking */}
              <div className="absolute left-[35%] bottom-[0%] rotate-6 hover:rotate-[1deg] hover:-translate-y-3 hover:scale-[1.04] hover:z-30 transition-all duration-500 z-5 w-[120px] sm:w-[185px] md:w-[200px] bg-[#FAF7F2] p-3 sm:p-4 pb-10 sm:pb-14 rounded-[4px] shadow-[0_18px_40px_rgba(0,0,0,0.4)] border border-yen-cream/15">
                {/* Washi tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-yen-accent/15 border-x border-dashed border-yen-accent/30 rotate-[2deg] backdrop-blur-[2px] shadow-xs z-10" />

                <img decoding="async" 
                  loading="lazy"
                  src="/foto-galeri/olahan-pangsit.webp"
                  alt="Momen Makan Bersama Baso Yen"
                  className="w-full aspect-square object-cover rounded-[2px] border border-black/5"
                />
                <p className="text-yen-dark font-playfair font-black italic text-[9px] sm:text-[11px] text-center mt-3 tracking-wide opacity-80">
                  Dimsum
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <ScrollReveal
            direction="left"
            className="lg:col-span-5 order-1 lg:order-2 text-left"
          >
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-yen-white leading-none tracking-tight mt-3 mb-6 uppercase">
              Cita Rasa <br />
              <span className="text-yen-accent">Yang Tak</span> <br />
              Terlupakan!
            </h2>
            <p className="font-jakarta text-sm text-yen-cream/70 leading-relaxed mb-8 max-w-sm">
              Dari dapur rumahan hingga meja restoran bintang lima — setiap
              gigitan Baso Yen menghadirkan kelezatan autentik yang selalu
              dirindukan.
            </p>

            {/* Glowing CTA Instagram Button */}
            <div className="mt-8">
              <a
                href="https://www.instagram.com/basoyen/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-yen-accent hover:bg-yen-accent/90 text-white font-jakarta text-xs font-bold tracking-wider uppercase shadow-[0_6px_20px_rgba(227,30,36,0.35)] hover:shadow-[0_8px_24px_rgba(227,30,36,0.45)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
              >
                <span>Ikuti @basoyen↗</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FooterGaleriSection;
