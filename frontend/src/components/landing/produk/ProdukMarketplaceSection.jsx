import ScrollReveal from "../../ui/ScrollReveal";

export default function ProdukMarketplaceSection() {
  return (
    <section className="bg-yen-white py-20 md:py-28 border-t border-yen-cream relative overflow-hidden bg-grid-pattern">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[#24201E]/95 p-10 md:p-16 text-center shadow-2xl grain-overlay transition-all duration-500 hover:shadow-yen-accent/5">
            {/* Ambient glows */}
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-yen-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yen-gold/15 rounded-full blur-3xl pointer-events-none" />

            {/* Background Watermark */}
            <div className="absolute -bottom-6 right-8 font-bebas text-[90px] md:text-[130px] text-white opacity-[0.025] [select-none pointer-events-none tracking-widest leading-none">
              BASO YEN
            </div>

            {/* Badge */}
            <div className="relative z-10 inline-flex items-center gap-2.5 font-bebas text-xs tracking-widest text-yen-gold bg-yen-gold/10 border border-yen-gold/25 px-5 py-2 rounded-full uppercase mb-6 shadow-[0_0_15px_rgba(255,136,0,0.05)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yen-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yen-gold"></span>
              </span>
              <span>Official Store</span>
            </div>

            {/* Heading */}
            <h2 className="relative z-10 font-bebas text-4xl sm:text-6xl text-white uppercase leading-tight mb-5 tracking-wide">
              Belanja Produk Yen{" "}
              <span className="text-yen-accent">Lebih Mudah</span>
            </h2>
            <p className="relative z-10 font-jakarta text-sm md:text-base text-yen-cream/80 max-w-xl mx-auto leading-relaxed mb-10">
              Produk bakso, mie, dan sosis sapi premium Baso Yen kini tersedia
              di marketplace favorit Anda. Pengiriman aman ke seluruh Jawa
              dengan kemasan beku khusus.
            </p>

            {/* Marketplace Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-5 justify-center items-center">
              {/* Shopee Button */}
              <a
                href="https://shopee.co.id/basoyen_official"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-4 px-8 rounded-full font-bebas text-base tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(238,77,45,0.45)] active:scale-95 min-w-55 justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #EE4D2D 0%, #FF7337 100%)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" />
                  <path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
                  <path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
                </svg>
                <span>Beli di Shopee</span>
                <svg
                  className="w-4 h-4 opacity-70 group-hover:translate-x-1.5 transition-transform duration-300"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              {/* Tokopedia Button */}
              <a
                href="https://www.tokopedia.com/basoyen"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 py-4 px-8 rounded-full font-bebas text-base tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(3,172,14,0.45)] active:scale-95 min-w-55 justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #03AC0E 0%, #10C41C 100%)",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8V6a4 4 0 0 0-8 0v2H5v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h-3zm-6-2a2 2 0 0 1 4 0v2h-4V6z"
                    fill="white"
                  />
                  <circle cx="9" cy="14" r="1.2" fill="#03AC0E" />
                  <circle cx="15" cy="14" r="1.2" fill="#03AC0E" />
                  <path d="M12 14.5l-1.5 2h3z" fill="#FF9800" />
                </svg>
                <span>Beli di Tokopedia</span>
                <svg
                  className="w-4 h-4 opacity-70 group-hover:translate-x-1.5 transition-transform duration-300"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>

            {/* Fine print */}
            <div className="relative z-10 font-jakarta text-[11px] text-yen-cream/45 mt-10 tracking-widest uppercase flex flex-wrap justify-center gap-x-8 gap-y-2.5 font-medium">
              <span>
                <span className="text-yen-gold mr-1.5 font-semibold">✓</span>
                Pengiriman Beku Aman
              </span>
              <span className="hidden sm:inline text-white/10">•</span>
              <span>
                <span className="text-yen-gold mr-1.5 font-semibold">✓</span>
                Halal MUI
              </span>
              <span className="hidden sm:inline text-white/10">•</span>
              <span>
                <span className="text-yen-gold mr-1.5 font-semibold">✓</span>
                P-IRT 2013 273011620
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
