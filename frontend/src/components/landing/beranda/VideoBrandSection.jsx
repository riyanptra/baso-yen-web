import { useState } from "react";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

export default function VideoBrandSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-yen-dark py-24 relative overflow-hidden grain-overlay bg-grid-pattern border-t border-yen-accent/15">
      {/* Soft glow blobs in corners */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yen-accent/20 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yen-gold/20 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

      {/* Editorial Outline Typography */}
      <div className="absolute top-[10%] left-[5%] font-playfair italic text-6xl sm:text-8xl text-white opacity-[0.025] select-none pointer-events-none font-bold z-0">
        Pabrik Modern
      </div>
      <div className="absolute bottom-[10%] right-[5%] font-playfair italic text-6xl sm:text-8xl text-white opacity-[0.025] select-none pointer-events-none font-bold z-0">
        Higienis 100%
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Headings & Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <ScrollReveal direction="right">
              <SectionLabel variant="bebas" color="gold">
                BASO YEN IN ACTION
              </SectionLabel>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold text-yen-white mt-3 leading-none uppercase">
                Lihat Proses{" "}
                <span className="text-yen-accent">Pembuatannya</span>
              </h2>
              <p className="font-jakarta text-sm text-yen-white mt-4 leading-relaxed">
                Dari pemilihan daging sapi segar hingga produk siap saji —
                setiap langkah dikerjakan dengan standar higienitas tertinggi
                demi menghadirkan cita rasa premium yang konsisten di setiap
                suapan.
              </p>

              {/* Styled YouTube Button/Link inside left column */}
              <div className="mt-8">
                <a
                  href="https://www.youtube.com/@basoyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#24201E] border border-yen-cream/10 hover:border-yen-accent/40 text-yen-white hover:text-yen-accent transition-all duration-300 font-jakarta text-xs font-bold tracking-wider uppercase shadow-md hover:-translate-y-0.5 group/btn"
                >
                  <span className="w-2 h-2 rounded-full bg-yen-accent group-hover/btn:animate-ping" />
                  Kunjungi YouTube Kami ↗
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Video Player Frame */}
          <div className="lg:col-span-7 relative w-full">
            <ScrollReveal direction="left" delay={0.15}>
              {/* Outer Decorative offset border and back shadow */}
              <div className="relative">
                {/* Gold offset border */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-yen-gold/15 rounded-4xl pointer-events-none -z-10" />

                {/* Glow blob behind video */}
                <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-yen-accent/15 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10" />

                {/* Video container */}
                <div className="relative w-full bg-[#24201E]/60 border border-white/10 rounded-[32px] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden group hover:border-yen-accent/30 transition-all duration-300">
                  <div className="relative w-full rounded-[24px] overflow-hidden group">
                    {!isPlaying ? (
                      /* Custom Premium Thumbnail Cover */
                      <div
                        onClick={() => setIsPlaying(true)}
                        className="relative w-full cursor-pointer overflow-hidden group/video"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <img
                          src="https://img.youtube.com/vi/4kYQDhYrMB4/maxresdefault.jpg"
                          alt="Video Brand Cover"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-101 group-hover/video:scale-105 filter brightness-[0.7] group-hover/video:brightness-[0.4]"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40" />

                        {/* Floating Video Info */}
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                          {/* Stylized Logo Icon */}
                          <div className="w-8 h-8 rounded-full ring-2 ring-white/10 shadow-md overflow-hidden">
                            <img
                              src="/LOGO-YEN.png"
                              alt=""
                              className="w-full h-full object-cover scale-125"
                            />
                          </div>
                          <div>
                            <h4 className="text-white text-xs font-bold font-jakarta tracking-wide">
                              Company Profile Pabrik Mie, Baso & Sosis YEN
                            </h4>
                            <p className="text-yen-cream/60 text-[10px] font-jakarta">
                              baso yen
                            </p>
                          </div>
                        </div>

                        {/* Custom Pulsing Glass Play Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                          <div className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 group-hover/video:scale-110">
                            {/* Outer Pulse rings */}
                            <div className="absolute inset-0 rounded-full bg-yen-accent/40 animate-ping opacity-75" />
                            <div className="absolute -inset-2 rounded-full border border-white/20 backdrop-blur-md bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" />

                            {/* Inner Play triangle */}
                            <svg
                              className="relative w-6 h-6 fill-yen-accent filter drop-shadow-md ml-1 transition-transform duration-500 group-hover/video:scale-110"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Active YouTube Iframe */
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src="https://www.youtube.com/embed/4kYQDhYrMB4?autoplay=1&si=VJSf1El5VFt_MZSG"
                          title="Video Brand Baso Yen Bandung"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ border: 0 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom caption bar */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-yen-accent animate-pulse" />
                      <span className="font-jakarta text-[11px] font-bold text-yen-cream/70 uppercase tracking-wider">
                        Video Brand Resmi · Baso Yen Bandung
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
