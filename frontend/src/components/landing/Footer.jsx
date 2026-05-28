import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/miebasoyen",
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
      url: "https://tiktok.com/@miebasoyen",
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
      name: "Facebook",
      url: "https://facebook.com/miebasoyen",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
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
    <footer className="bg-[#12100F] text-yen-cream relative overflow-hidden grain-overlay border-t-4 border-yen-accent">
      {/* Decorative Scallop Top Edge (Double line) */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-yen-gold opacity-80" />

      {/* Background Huge Watermark */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 font-bebas text-[100px] sm:text-[160px] md:text-[220px] font-black text-white/2 tracking-widest select-none pointer-events-none whitespace-nowrap z-0">
        SAJIAN PRAKTIS ISTIMEWA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Kolom 1 (lg:col-span-3): Brand Sticker Badge */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-start">
            <Link to="/" className="group mb-6">
              <div className="bg-yen-accent text-white p-6 rounded-[28px] border-2 border-white shadow-[0_8px_25px_rgba(227,30,36,0.3)]  transition-transform duration-300 flex flex-col items-center text-center">
                <img
                  src="/LOGO-YEN.png"
                  alt="Baso Yen Logo"
                  className="h-20 w-auto object-contain -mt-2 -mb-1 filter drop-shadow-sm"
                />
                <span className="font-jakarta text-[9px] uppercase tracking-widest text-yen-cream block mt-2 font-black">
                  ESTD. 1988 · BANDUNG
                </span>
                <p className="font-jakarta text-[11px] text-yen-cream/90 mt-3 leading-relaxed max-w-[240px]">
                  Pionir produsen mie basah bebas pengawet, bakso premium, dan
                  sosis sapi berkualitas tinggi di Kota Kembang.
                </p>
              </div>
            </Link>
            <p className="font-jakarta text-xs text-yen-cream/60 leading-relaxed max-w-xs">
              Dipercaya oleh puluhan katering ternama, hotel berbintang, dan
              jutaan keluarga Indonesia untuk sajian praktis istimewa setiap
              hari.
            </p>
          </div>

          {/* Kolom 2 (lg:col-span-2): Layanan Kami */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-lg tracking-wider text-yen-accent mb-6 uppercase border-b border-yen-accent/25 pb-2">
              Layanan Kami
            </h4>
            <ul className="space-y-3 font-jakarta text-xs text-yen-cream/75">
              <li>
                <Link
                  to="/layanan"
                  className="hover:text-yen-gold transition-colors flex items-center gap-1.5"
                >
                  <span className="text-yen-gold">▪</span> B2C Retail Order
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className="hover:text-yen-gold transition-colors flex items-center gap-1.5"
                >
                  <span className="text-yen-gold">▪</span> B2B Supply Horeka
                </Link>
              </li>
              <li>
                <Link
                  to="/produk"
                  className="hover:text-yen-gold transition-colors flex items-center gap-1.5"
                >
                  <span className="text-yen-gold">▪</span> Katalog Produk
                </Link>
              </li>
              <li>
                <Link
                  to="/tentang-kami"
                  className="hover:text-yen-gold transition-colors flex items-center gap-1.5"
                >
                  <span className="text-yen-gold">▪</span> Kemitraan Reseller
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3 (lg:col-span-2): Toko Online */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-lg tracking-wider text-yen-gold mb-6 uppercase border-b border-yen-gold/25 pb-2">
              Marketplace
            </h4>
            <ul className="space-y-3 font-jakarta text-xs text-yen-cream/75">
              <li>
                <a
                  href="https://www.tokopedia.com"
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
              <li>
                <a
                  href="https://shopee.co.id"
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
              <li>
                <a
                  href="https://instagram.com/miebasoyen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yen-gold transition-colors flex items-center gap-2 group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 stroke-[#E1306C] transition-transform duration-300 group-hover:scale-110 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram Update</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4 (lg:col-span-2): Ikuti Kami / Sosial Media */}
          <div className="lg:col-span-2">
            <h4 className="font-bebas text-lg tracking-wider text-yen-accent mb-6 uppercase border-b border-yen-accent/25 pb-2">
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

          {/* Kolom 5 (lg:col-span-3): Outlet Cards */}
          <div className="lg:col-span-3">
            <h4 className="font-bebas text-lg tracking-wider text-yen-accent mb-6 uppercase border-b border-yen-accent/25 pb-2">
              Factory & Outlet
            </h4>
            <div className="space-y-4">
              {/* Outlet BKR */}
              <div className="bg-yen-white text-yen-dark p-4 rounded-[20px] border-2 border-yen-cream shadow-md space-y-1.5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-[10px] tracking-wider bg-yen-accent text-white px-2.5 py-0.5 rounded-full">
                    FACTORY BKR (PUSAT)
                  </span>
                  <span className="font-jakarta text-[10px] font-bold text-yen-neutral">
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
                    href="https://wa.me/628972078800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bebas text-xs text-[#25D366] hover:text-[#1ebe57] flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-[#25D366] shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.212 3.464 8.379-.003 6.535-5.328 11.859-11.859 11.859-2.004-.001-3.972-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.277 0 9.584-4.302 9.586-9.582.001-2.553-1-4.954-2.817-6.772C16.326 2.43 13.932 1.432 11.86 1.432c-5.281 0-9.593 4.303-9.596 9.585-.001 1.62.43 3.199 1.248 4.61l-.974 3.559 3.633-.953c1.472.802 2.91 1.206 4.417 1.206zM17.07 14.12c-.284-.143-1.687-.832-1.947-.927-.26-.096-.45-.143-.639.143-.19.284-.733.927-.899 1.117-.166.19-.332.213-.616.071-.284-.143-1.202-.443-2.289-1.411-.847-.756-1.42-1.689-1.586-1.973-.166-.284-.018-.437.125-.578.128-.127.284-.332.427-.497.143-.166.19-.284.284-.473.095-.19.047-.355-.024-.497-.071-.143-.639-1.538-.876-2.107-.23-.554-.464-.479-.639-.488-.166-.008-.356-.01-.546-.01s-.498.071-.758.355c-.26.284-1 .976-1 2.378s1.02 2.75 1.162 2.94c.143.19 2.007 3.066 4.863 4.302.679.294 1.21.469 1.623.6a3.91 3.91 0 0 0 1.784.112c.59-.088 1.687-.689 1.924-1.355.237-.666.237-1.238.166-1.355-.07-.118-.26-.188-.545-.331z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Outlet Paskal */}
              <div className="bg-yen-white text-yen-dark p-4 rounded-[20px] border-2 border-yen-cream shadow-md space-y-1.5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="font-bebas text-[10px] tracking-wider bg-yen-gold text-white px-2.5 py-0.5 rounded-full">
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
                  </span>
                  <a
                    href="https://wa.me/6285100805080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bebas text-xs text-[#25D366] hover:text-[#1ebe57] flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 fill-[#25D366] shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.212 3.464 8.379-.003 6.535-5.328 11.859-11.859 11.859-2.004-.001-3.972-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.277 0 9.584-4.302 9.586-9.582.001-2.553-1-4.954-2.817-6.772C16.326 2.43 13.932 1.432 11.86 1.432c-5.281 0-9.593 4.303-9.596 9.585-.001 1.62.43 3.199 1.248 4.61l-.974 3.559 3.633-.953c1.472.802 2.91 1.206 4.417 1.206zM17.07 14.12c-.284-.143-1.687-.832-1.947-.927-.26-.096-.45-.143-.639.143-.19.284-.733.927-.899 1.117-.166.19-.332.213-.616.071-.284-.143-1.202-.443-2.289-1.411-.847-.756-1.42-1.689-1.586-1.973-.166-.284-.018-.437.125-.578.128-.127.284-.332.427-.497.143-.166.19-.284.284-.473.095-.19.047-.355-.024-.497-.071-.143-.639-1.538-.876-2.107-.23-.554-.464-.479-.639-.488-.166-.008-.356-.01-.546-.01s-.498.071-.758.355c-.26.284-1 .976-1 2.378s1.02 2.75 1.162 2.94c.143.19 2.007 3.066 4.863 4.302.679.294 1.21.469 1.623.6a3.91 3.91 0 0 0 1.784.112c.59-.088 1.687-.689 1.924-1.355.237-.666.237-1.238.166-1.355-.07-.118-.26-.188-.545-.331z" />
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
            <Link
              to="/tentang-kami"
              className="hover:text-yen-gold transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              to="/kontak"
              className="hover:text-yen-gold transition-colors"
            >
              Kontak Kami
            </Link>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-yen-gold hover:underline font-bold"
            >
              Kembali Ke Atas ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
