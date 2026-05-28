import ScrollReveal from "../../ui/ScrollReveal";
import SectionLabel from "../../ui/SectionLabel";

export default function KontakInfoSection() {
  return (
    <ScrollReveal
      direction="left"
      className="lg:col-span-7 space-y-12 text-left pt-2 lg:pl-6"
    >
      <div>
        <SectionLabel variant="bebas" color="accent">
          Hubungan Bisnis
        </SectionLabel>
        <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark mb-5 uppercase leading-none">
          Layanan Pelanggan
        </h2>
        <p className="font-jakarta text-sm text-yen-neutral max-w-lg mb-8 leading-relaxed">
          Kami siap melayani kebutuhan personal maupun bisnis Anda. Silakan
          hubungi kontak spesifik di bawah untuk respon yang lebih cepat.
        </p>

        {/* Grid of Contact Sticker Cards wrapped in a cream container */}
        <div className="bg-[#FFF6F0]/65 border border-yen-cream rounded-[32px] p-6 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yen-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email Resmi */}
            <div className="bg-white p-6 border border-yen-cream rounded-[24px] shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 transition-all duration-500 flex flex-col gap-3 group">
              <div className="w-12 h-12 rounded-[14px] bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                ✉️
              </div>
              <div>
                <span className="font-bebas text-[10px] tracking-wider text-emerald-600 block mb-1">
                  EMAIL RESMI
                </span>
                <a
                  href="mailto:marketing@basoyen.com"
                  className="text-yen-dark font-extrabold text-sm hover:text-yen-accent transition-colors break-all"
                >
                  marketing@basoyen.com
                </a>
              </div>
            </div>

            {/* Horeka */}
            <div className="bg-white p-6 border border-yen-cream rounded-[24px] shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 transition-all duration-500 flex flex-col gap-3 group">
              <div className="w-12 h-12 rounded-[14px] bg-yen-cream text-yen-accent border border-yen-accent/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                📞
              </div>
              <div>
                <span className="font-bebas text-[10px] tracking-wider text-yen-accent block mb-1">
                  MARKETING HOREKA (B2B)
                </span>
                <a
                  href="tel:08112335080"
                  className="text-yen-dark font-extrabold text-sm hover:text-yen-accent transition-colors"
                >
                  0811-2335-080
                </a>
              </div>
            </div>

            {/* Order Retail */}
            <div className="bg-white p-6 border border-yen-cream rounded-[24px] shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 transition-all duration-500 flex flex-col gap-3 group">
              <div className="w-12 h-12 rounded-[14px] bg-[#FFFDF0] text-[#FF8800] border border-[#FF8800]/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                🛒
              </div>
              <div>
                <span className="font-bebas text-[10px] tracking-wider text-[#FF8800] block mb-1">
                  ORDER ONLINE RETAIL
                </span>
                <a
                  href="tel:089678391030"
                  className="text-yen-dark font-extrabold text-sm hover:text-yen-accent transition-colors"
                >
                  0896-7839-1030
                </a>
              </div>
            </div>

            {/* Moko */}
            <div className="bg-white p-6 border border-yen-cream rounded-[24px] shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 transition-all duration-500 flex flex-col gap-3 group">
              <div className="w-12 h-12 rounded-[14px] bg-[#F4F9FF] text-blue-500 border border-blue-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                🚚
              </div>
              <div>
                <span className="font-bebas text-[10px] tracking-wider text-blue-600 block mb-1">
                  MOKO (MOBIL TOKO)
                </span>
                <span className="text-yen-dark font-extrabold text-xs block leading-relaxed">
                  Keliling Bandung Harian
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Factory stores */}
      <div className="border-t border-yen-cream/60 pt-10 space-y-6">
        <h3 className="font-bebas text-3xl text-yen-dark uppercase tracking-wide">
          Factory Outlet Bandung
        </h3>

        {/* Factory Outlet Cards wrapped in a cream container */}
        <div className="bg-[#FFF6F0]/65 border border-yen-cream rounded-[32px] p-6 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yen-accent/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Yen Factory BKR */}
            <div className="bg-white p-6 rounded-[24px] border border-yen-cream shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[170px] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bebas text-[10px] tracking-wider bg-yen-accent text-white px-3 py-1 rounded-full shadow-sm">
                    FACTORY BKR
                  </span>
                  <span className="font-jakarta text-[10px] font-bold text-yen-neutral bg-yen-cream px-2 py-0.5 rounded">
                    📍 Regol
                  </span>
                </div>
                <p className="font-jakarta text-xs text-yen-neutral leading-relaxed group-hover:text-yen-dark transition-colors">
                  Komp. Puri BKR Kav 61 Regol, Bandung
                </p>
              </div>
              <div className="border-t border-yen-cream/60 pt-4 mt-5 flex items-center justify-between">
                <span className="font-jakarta text-[10px] text-yen-neutral font-semibold">
                  🕒 07.00 - 17.00
                </span>
                <a
                  href="https://api.whatsapp.com/send?phone=628972078800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bebas text-xs tracking-wider text-[#25D366] hover:text-[#1ebe57] flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366] shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.212 3.464 8.379-.003 6.535-5.328 11.859-11.859 11.859-2.004-.001-3.972-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.277 0 9.584-4.302 9.586-9.582.001-2.553-1-4.954-2.817-6.772C16.326 2.43 13.932 1.432 11.86 1.432c-5.281 0-9.593 4.303-9.596 9.585-.001 1.62.43 3.199 1.248 4.61l-.974 3.559 3.633-.953c1.472.802 2.91 1.206 4.417 1.206zM17.07 14.12c-.284-.143-1.687-.832-1.947-.927-.26-.096-.45-.143-.639.143-.19.284-.733.927-.899 1.117-.166.19-.332.213-.616.071-.284-.143-1.202-.443-2.289-1.411-.847-.756-1.42-1.689-1.586-1.973-.166-.284-.018-.437.125-.578.128-.127.284-.332.427-.497.143-.166.19-.284.284-.473.095-.19.047-.355-.024-.497-.071-.143-.639-1.538-.876-2.107-.23-.554-.464-.479-.639-.488-.166-.008-.356-.01-.546-.01s-.498.071-.758.355c-.26.284-1 .976-1 2.378s1.02 2.75 1.162 2.94c.143.19 2.007 3.066 4.863 4.302.679.294 1.21.469 1.623.6a3.91 3.91 0 0 0 1.784.112c.59-.088 1.687-.689 1.924-1.355.237-.666.237-1.238.166-1.355-.07-.118-.26-.188-.545-.331z"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Meatball Factory Paskal */}
            <div className="bg-white p-6 rounded-[24px] border border-yen-cream shadow-[0_12px_35px_rgba(30,27,26,0.06)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] hover:border-yen-accent/30 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[170px] group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bebas text-[10px] tracking-wider bg-[#FF8800] text-white px-3 py-1 rounded-full shadow-sm">
                    OUTLET PASKAL
                  </span>
                  <span className="font-jakarta text-[10px] font-bold text-yen-neutral bg-yen-cream px-2 py-0.5 rounded">
                    📍 Cicendo
                  </span>
                </div>
                <p className="font-jakarta text-xs text-yen-neutral leading-relaxed group-hover:text-yen-dark transition-colors">
                  Jl. Pasirkaliki 106 Cicendo, Bandung
                </p>
              </div>
              <div className="border-t border-yen-cream/60 pt-4 mt-5 flex items-center justify-between">
                <span className="font-jakarta text-[10px] text-yen-neutral font-semibold">
                  🕒 08.00 - 20.00
                </span>
                <a
                  href="https://api.whatsapp.com/send?phone=6285100805080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bebas text-xs tracking-wider text-[#25D366] hover:text-[#1ebe57] flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25D366] shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.212 3.464 8.379-.003 6.535-5.328 11.859-11.859 11.859-2.004-.001-3.972-.51-5.713-1.479L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.277 0 9.584-4.302 9.586-9.582.001-2.553-1-4.954-2.817-6.772C16.326 2.43 13.932 1.432 11.86 1.432c-5.281 0-9.593 4.303-9.596 9.585-.001 1.62.43 3.199 1.248 4.61l-.974 3.559 3.633-.953c1.472.802 2.91 1.206 4.417 1.206zM17.07 14.12c-.284-.143-1.687-.832-1.947-.927-.26-.096-.45-.143-.639.143-.19.284-.733.927-.899 1.117-.166.19-.332.213-.616.071-.284-.143-1.202-.443-2.289-1.411-.847-.756-1.42-1.689-1.586-1.973-.166-.284-.018-.437.125-.578.128-.127.284-.332.427-.497.143-.166.19-.284.284-.473.095-.19.047-.355-.024-.497-.071-.143-.639-1.538-.876-2.107-.23-.554-.464-.479-.639-.488-.166-.008-.356-.01-.546-.01s-.498.071-.758.355c-.26.284-1 .976-1 2.378s1.02 2.75 1.162 2.94c.143.19 2.007 3.066 4.863 4.302.679.294 1.21.469 1.623.6a3.91 3.91 0 0 0 1.784.112c.59-.088 1.687-.689 1.924-1.355.237-.666.237-1.238.166-1.355-.07-.118-.26-.188-.545-.331z"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
