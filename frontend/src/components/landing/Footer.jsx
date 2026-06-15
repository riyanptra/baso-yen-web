const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/basoyen/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@miebasoyen",
      icon: (
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08-.07-.17-.17-.25-.25v6.52c-.03 2.32-.4 4.8-2.12 6.51-1.92 1.93-4.93 2.34-7.46 1.65-2.92-.81-5.11-3.62-5.19-6.68-.08-3.9 3.03-7.4 6.96-7.14V9.06c-1.44-.02-2.99.41-4.04 1.43-.88.85-1.32 2.05-1.31 3.26.02 2.38 1.99 4.41 4.39 4.38 2.08-.03 3.94-1.71 4.02-3.85.08-1.58.03-3.17.04-4.75V.02z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCQLcnQA2X6I8kZGCGzVN5Fg",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-[#12100F] text-yen-cream relative overflow-hidden grain-overlay border-t-4 border-yen-accent"
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-yen-gold opacity-80" />

      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 font-bebas text-[100px] sm:text-[160px] md:text-[220px] font-black text-white/2 tracking-widest select-none pointer-events-none whitespace-nowrap z-0.5">
        SAJIAN PRAKTIS ISTIMEWA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:text-12 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Kolom 1 (lg:col-span-4): Brand Sticker Badge */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start">
            <a href="/" className="group mb-6">
              <div className="bg-yen-accent text-white p-6 rounded-[28px] border-2 border-white shadow-[0_8px_25px_rgba(227,30,36,0.3)] transition-transform duration-300 flex flex-col items-center text-center">
                <img decoding="async" loading="lazy" 
                  src="/LOGO-YEN.png"
                  alt=""
                  className="h-20 w-auto object-contain -mt-2 -mb-1 filter drop-shadow-sm"
                />
                <span className="font-jakarta text-[9px] uppercase tracking-widest text-yen-cream block mt-2 font-black">
                  ESTD. 1988 · BANDUNG
                </span>
                <p className="font-jakarta text-[11px] text-yen-cream/90 mt-3 leading-relaxed max-w-[240px]">
                  {" "}
                  Pionir produsen mie basah bebas pengawet, bakso premium, dan
                  sosis sapi berkualitas tinggi di Kota Kembang.
                </p>
              </div>
            </a>
            <p className="font-jakarta text-xs text-yen-cream/60 leading-relaxed max-w-xs">
              {" "}
              Dipercaya oleh puluhan katering ternama, hotel berbintang, dan
              jutaan keluarga Indonesia untuk sajian praktis istimewa setiap
              hari.
            </p>
          </div>

          {/* kolom 2 toko online*/}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-lg tracking-wider text-yen-gold mb-6 uppercase border-b border-yen-gold/35 pb-2">
              MarketPlace
            </h4>
            <ul className="space-y-3 font-jakarta text-xs text-yen-cream/75">
              {/* shopee */}
              <li>
                <a
                  href="https://shopee.co.id/miebasososisyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-[#42B549] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8V6a4 4 0 0 0-8 0v2H5v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h-3zm-6-2a2 2 0 0 1 4 0v2h-4V6z" />
                    <circle cx="9" cy="14" r="2.2" fill="white" />
                    <circle cx="15" cy="14" r="2.2" fill="white" />
                    <circle cx="9" cy="14" r="1.1" fill="#42B549" />
                    <circle cx="15" cy="14" r="1.1" fill="#42B549" />
                    <path d="M12 14.5l-1.5 2h3z" fill="#FF9800" />
                  </svg>
                  <span>Tokopedia Official</span>
                </a>
              </li>
              {/* tokopedia */}
              <li>
                <a
                  href="https://shopee.co.id/miebasososisyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#EE4D2D] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" />
                    <path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
                    <path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
                  </svg>
                  <span>Shopee Mall</span>
                </a>
              </li>
              {/* grabfood */}
              <li>
                <a
                  href="https://food.grab.com/id/en/restaurant/mie-baso-sosis-yen-fresh-food-bkr-delivery/IDGFSTI00000ppi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#00B14F] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>GrabFood Toko BKR</span>
                </a>
              </li>
              <li>
                <a
                  href="https://food.grab.com/id/en/restaurant/mie-baso-sosis-yen-fresh-food-pasirkaliki-delivery/IDGFSTI00000obo?sourceID=20240709_165325_D81B40FE60264526AF7D895FD8CF0788_MEXMPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#00B14F] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>GrabFood Toko Pasir Kaliki</span>
                </a>
              </li>
              {/* gofood */}
              <li>
                <a
                  href="https://gofood.co.id/bandung/restaurant/mie-baso-sosis-yen-bkr-f2c1dd60-280e-44e4-907e-d5182b660fac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#EE2737] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>GoFood Toko BKR</span>
                </a>
              </li>
              <li>
                <a
                  href="https://gofood.co.id/bandung/restaurant/meatball-factory-by-baso-yen-pasirkaliki-20046216-f86b-44e4-8866-0b20eee99493"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#EE2737] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>GoFood Toko Pasir Kaliki</span>
                </a>
              </li>
              {/* shopeefood */}
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#EE4D2D] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>ShopeeFood Toko BKR</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#EE4D2D] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                  <span>ShopeeFood Toko Pasir Kaliki</span>
                </a>
              </li>
            </ul>
          </div>

          {/* kolom 3 sosial media */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-lg tracking-wider text-yen-accent mb-6 uppercase border-b border-yen-accent/35 pb-2">
              Ikuti Kami
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={soc.name}
                  className="w-10 h-10 rounded-full bg-yen-white/5 hover:bg-yen-accent hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-110 hover:-rotate-12 text-base"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* kolom 4 outlet card */}
          <div className="lg:col-span-4">
            <h4 className="font-bebas text-lg tracking-wider text-yen-accent mb-6 uppercase border-b border-yen-accent/35 pb-2">
              Factory & Outlet
            </h4>
            <div className="space-y-4">
              {/* oulet BKR */}
              <div className="bg-yen-white text-yen-dark p-4 rounded-[20px] border-2 border-yen-cream shadow-md space-y-1.5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-[10px] tracking-wider bg-yen-accent text-white px-2.5 py-0.5 rounded-full">
                    OUTLET BKR
                  </span>
                  <span className="font-jakarta text-[10px] font-bold text-yen-neutral">
                    {" "}
                    📍 Regol
                  </span>
                </div>
                <p className="font-jakarta text-[11px] text-yen-neutral">
                  Komp. Puri BKR Kav 61 Regol, Bandung
                </p>
                <div className="flex items-center justify-between border-t border-yen-cream pt-2 mt-2">
                  <span className="font-jakarta text-[10px] text-yen-neutral font-semibold">
                    🕒 07.00 - 17.00 WIB
                  </span>
                  <a
                    href="https://maps.app.goo.gl/nDMSxMc6e5jGukVD8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bebas text-xs text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Outlet Paskal */}
              <div className="bg-yen-white text-yen-dark p-4 rounded-[20px] border-2 border-yen-cream shadow-md space-y-1.5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-[10px] tracking-wider bg-yen-accent text-white px-2.5 py-0.5 rounded-full">
                    OUTLET PASKAL
                  </span>
                  <span className="font-jakarta text-[10px] font-bold text-yen-neutral">
                    📍 Cicendo
                  </span>
                </div>
                <p className="font-jakarta text-[11px] text-yen-neutral">
                  Jl. Pasirkaliki 106 Cicendo, Bandung
                </p>
                <div className="flex items-center justify-between border-t border-yen-cream pt-2 mt-2">
                  <span className="font-jakarta text-[10px] text-yen-neutral font-semibold">
                    🕒 08.00 - 20.00 WIB
                  </span>{" "}
                  <a
                    href="https://maps.app.goo.gl/Z8wVFbYgvnSYwhBk8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bebas text-xs text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-yen-cream/50 gap-6">
          <p>© {currentYear} basoyen.com. All rights reserved.</p>

          <div className="flex gap-6 font-jakarta text-xs">
            <a href="#about" className="hover:text-yen-gold transition-colors">
              Tentang Kami
            </a>
            <a
              href="#contact"
              className="hover:text-yen-gold transition-colors"
            >
              Kontak
            </a>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-yen-gold hover:underline font-bold"
            >
              Kembali ke Atas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
