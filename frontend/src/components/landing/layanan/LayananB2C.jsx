import { motion } from "framer-motion";

export default function LayananB2C() {
  const b2cCertificates = [
    "P-IRT 2013 273011620",
    "Halal MUI Resmi",
    "Keamanan Pangan Dinkes",
    "HACCP Terverifikasi",
  ];

  return (
    <motion.div
      key="b2c-content"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-16"
    >
      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="font-jakarta text-base md:text-lg text-yen-neutral leading-relaxed">
          &ldquo;Baso Yen merintis usaha dengan menjual produk berkualitas,
          bergizi dan higienis untuk sajian bagi keluarga di rumah. Soal
          kehalalan tidak perlu diragukan lagi karena produk dari Baso Yen sudah
          kembali memiliki sertifikat Halal MUI.&rdquo;
        </p>

        {/* Cert badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {b2cCertificates.map((cert, idx) => (
            <span
              key={idx}
              className="bg-yen-cream text-yen-accent border-2 border-yen-cream px-4 py-1.5 font-jakarta font-black text-[10px] tracking-wider rounded-full uppercase shadow-xs"
            >
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Grid Info Outlet & Delivery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Offline Store Area */}
        <div className="bg-yen-white p-8 border-2 border-yen-cream flex flex-col justify-between rounded-[24px] shadow-[0_8px_30px_rgba(30,27,26,0.15)] hover:shadow-[0_12px_25px_rgba(227,30,36,0.20)] hover:border-yen-accent/25 transition-all duration-300 relative group overflow-hidden">
          <div>
            <div className="w-14 h-14 bg-yen-accent text-white flex items-center justify-center rounded-full text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 select-none">
              🏪
            </div>
            <h3 className="font-jakarta font-extrabold text-xl text-yen-dark mb-4 leading-tight">
              Layanan Area Bandung
            </h3>
            <p className="font-jakarta text-xs text-yen-neutral mb-6 leading-relaxed">
              Kunjungi outlet resmi kami di Bandung untuk berbelanja produk
              segar maupun siap saji langsung dari pabrik.
            </p>
            <ul className="space-y-4 text-xs font-jakarta text-yen-neutral">
              <li>
                <p className="font-bold text-yen-dark">Yen Factory BKR</p>
                <p>Komp. Puri BKR Kav 61 Regol, Bandung</p>
              </li>
              <li>
                <p className="font-bold text-yen-dark">
                  Meatball Factory Paskal
                </p>
                <p>Jl. Pasirkaliki 106 Cicendo, Bandung</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Same Day Delivery */}
        <div className="bg-yen-white p-8 border-2 border-yen-cream flex flex-col justify-between rounded-[24px] shadow-[0_8px_30px_rgba(30,27,26,0.15)] hover:shadow-[0_12px_25px_rgba(227,30,36,0.20)] hover:border-yen-accent/25 transition-all duration-300 relative group overflow-hidden">
          <div>
            <div className="w-14 h-14 bg-emerald-500 text-white flex items-center justify-center rounded-full text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 select-none">
              🛵
            </div>
            <h3 className="font-jakarta font-extrabold text-xl text-yen-dark mb-4 leading-tight">
              Bandung Delivery Same-Day
            </h3>
            <p className="font-jakarta text-xs text-yen-neutral mb-6 leading-relaxed">
              Pesan praktis langsung sampai hari ini ke rumah Anda lewat layanan
              pesan antar online terpercaya.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-jakarta font-black text-[10px] tracking-wider text-yen-accent bg-yen-accent/5 border border-yen-accent/20 px-2 py-0.5 rounded-full inline-block">
                  VIA GOFOOD
                </p>
                <div className="flex gap-3 text-xs font-jakarta font-semibold mt-2 pl-1">
                  <a
                    href="https://gofood.link/u/yBrmj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    Gofood BKR ↗
                  </a>
                  <span className="text-yen-neutral/30">|</span>
                  <a
                    href="https://gofood.link/u/DAr7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    Gofood Paskal ↗
                  </a>
                </div>
              </div>
              <div className="pt-3 border-t border-yen-cream">
                <p className="font-jakarta font-black text-[10px] tracking-wider text-yen-accent bg-yen-accent/5 border border-yen-accent/20 px-2 py-0.5 rounded-full inline-block">
                  VIA WHATSAPP OUTLET
                </p>
                <div className="flex gap-3 text-xs font-jakarta font-semibold mt-2 pl-1">
                  <a
                    href="https://api.whatsapp.com/send?phone=628972078800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    WA Yen BKR ↗
                  </a>
                  <span className="text-yen-neutral/30">|</span>
                  <a
                    href="https://api.whatsapp.com/send?phone=6285100805080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    WA Paskal ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Day & Marketplace */}
        <div className="bg-yen-white p-8 border-2 border-yen-cream flex flex-col justify-between rounded-[24px] shadow-[0_8px_30px_rgba(30,27,26,0.15)] hover:shadow-[0_12px_25px_rgba(227,30,36,0.20)] hover:border-yen-accent/25 transition-all duration-300 relative group overflow-hidden">
          <div>
            <div className="w-14 h-14 bg-sky-500 text-white flex items-center justify-center rounded-full text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 select-none">
              📦
            </div>
            <h3 className="font-jakarta font-extrabold text-xl text-yen-dark mb-4 leading-tight">
              Luar Kota & Marketplace
            </h3>
            <p className="font-jakarta text-xs text-yen-neutral mb-6 leading-relaxed">
              Kami menjamin keamanan pengiriman beku next-day ke berbagai
              wilayah luar kota di Pulau Jawa, serta tersedia di marketplace
              favorit Anda.
            </p>
            <ul className="space-y-4 text-xs font-jakarta text-yen-neutral">
              <li>
                <p className="font-jakarta font-black text-[10px] tracking-wider text-yen-accent bg-yen-accent/5 border border-yen-accent/20 px-2 py-0.5 rounded-full inline-block">
                  WHATSAPP ORDER LUAR KOTA
                </p>
                <p className="font-semibold text-yen-dark mt-2 pl-1">
                  +62-896-7839-1030 / +62-898-1368-800
                </p>
              </li>
              <li className="pt-3 border-t border-yen-cream">
                <p className="font-jakarta font-black text-[10px] tracking-wider text-yen-accent bg-yen-accent/5 border border-yen-accent/20 px-2 py-0.5 rounded-full inline-block">
                  OFFICIAL STORE
                </p>
                <div className="flex gap-3 font-semibold mt-2 pl-1">
                  <a
                    href="https://www.tokopedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    Tokopedia ↗
                  </a>
                  <span className="text-yen-neutral/30">|</span>
                  <a
                    href="https://shopee.co.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yen-gold hover:underline"
                  >
                    Shopee ↗
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
