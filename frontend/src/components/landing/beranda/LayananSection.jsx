import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const FeatureItem = ({ bgColor, icon, title, desc }) => (
  <li className="flex items-start gap-4">
    <div className={`p-2 ${bgColor} text-white rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
      {icon}
    </div>
    <div>
      <p className="font-jakarta font-extrabold text-yen-dark text-sm">
        {title}
      </p>
      <p className="text-yen-neutral text-xs mt-0.5">
        {desc}
      </p>
    </div>
  </li>
);

export default function LayananSection() {
  const b2cFeatures = [
    {
      title: "Counter Factory BKR",
      desc: "Outlet utama nyaman bersebelahan langsung dengan tempat produksi higienis.",
      bgColor: "bg-yen-accent",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
        </svg>
      )
    },
    {
      title: "Meatball Factory Paskal",
      desc: "Factory outlet strategis pusat kota untuk kemudahan belanja kuliner Anda.",
      bgColor: "bg-[#FF8800]",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: "Bandung Same-Day Delivery",
      desc: "Pengantaran instan praktis ke depan rumah Anda lewat kurir online internal/ojol.",
      bgColor: "bg-yen-accent",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Tokopedia & Shopee Official",
      desc: "Kemudahan transaksi digital dengan penawaran promo dan gratis ongkir marketplace.",
      bgColor: "bg-blue-600",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      title: "Ekspedisi Next-Day Pulau Jawa",
      desc: "Layanan ekspedisi khusus frozen food bergaransi aman sampai esok hari.",
      bgColor: "bg-emerald-600",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.945M11 20.965V19a2 2 0 012-2h3.08a2 2 0 001.242-.433l2-1.6A2 2 0 0021 13.376V11a2 2 0 00-2-2h-3.08a2 2 0 00-1.242.433l-2 1.6A2 2 0 0011 12.624V14H9a2 2 0 01-2-2v-1.035" />
        </svg>
      )
    }
  ];

 const b2bFeatures = [
   {
     title: "Harga Kompetitif",
     desc: "Harga yang ditawarkan untuk pemilik usaha kompetitif dan pasti menguntungkan sebanding dengan kualitas produk dan layanan.",
     bgColor: "bg-yen-accent",
     icon: (
       <svg
         className="w-4 h-4"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
         />
       </svg>
     ),
   },
   {
     title: "Produk Beragam",
     desc: "Menyuplai produk untuk usaha kuliner Anda. Setidaknya ada 50 produk yang bisa dipilih sesuai dengan kebutuhan Anda",
     bgColor: "bg-yen-gold",
     icon: (
       <svg
         className="w-4 h-4"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4"
         />
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M4 4v7a4 4 0 004 4h4a4 4 0 004-4V4M9 19l3 3 3-3M12 15v4"
         />
       </svg>
     ),
   },
   {
     title: "Custom Order",
     desc: "Melayani konsultasi custom orderan dengan minimal jumlah tertentu untuk bakso, mie basah, sosis dan kulit pangsit.",
     bgColor: "bg-[#24201E]",
     icon: (
       <svg
         className="w-4 h-4"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"
         />
       </svg>
     ),
   },
   {
     title: "Pengiriman Gratis",
     desc: "Khusus area Kota Bandung, konsumen bisa mendapatkan gratis ongkir dengan melakukan minimal pembelian tertentu.",
     bgColor: "bg-blue-600",
     icon: (
       <svg
         className="w-4 h-4"
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
         />
       </svg>
     ),
   },
 ];

  return (
    <section className="bg-yen-white text-yen-dark py-24 relative overflow-hidden border-t-2 border-yen-white bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel variant="bebas" color="accent">
              YANG KAMI LAKUKAN
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-6xl font-bold text-yen-dark mt-2">
              Layanan Kami
            </h2>
            <p className="font-jakarta text-md text-yen-neutral mt-4 max-w-2xl mx-auto leading-relaxed text-center">
              Baso Yen hadir melayani kebutuhan kuliner baik untuk rumah tangga
              (B2C) maupun kemitraan bisnis kuliner (B2B). Kami berkomitmen
              menyediakan layanan prima, distribusi andal, serta jaminan produk
              berkualitas tinggi untuk menyukseskan bisnis dan memanjakan
              keluarga Anda.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="w-full relative">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto w-full relative z-10">
              {/* B2C ROW (Card Left, Image Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* B2C Card */}
                <div className="lg:col-span-9 w-full">
                  <ScrollReveal
                    direction="right"
                    className="bg-[#FCFAF8] border-2 border-yen-cream hover:border-yen-accent/30 p-8 md:p-10 rounded-[28px] overflow-hidden group shadow-[0_20px_48px_-8px_rgba(30,27,26,0.18),0_8px_24px_rgba(30,27,26,0.08)] hover:shadow-[0_24px_50px_rgba(227,30,36,0.25)] transition-all duration-300 relative z-10 w-full"
                  >
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-yen-gold/50 to-yen-gold group-hover:from-yen-gold group-hover:to-amber-400 transition-all duration-500" />

                    {/* Background Watermark */}
                    <div className="absolute -right-8 -top-8 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none select-none text-yen-gold">
                      <svg
                        className="w-48 h-48"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10 text-left">
                      {/* LEFT COLUMN: Title & Description */}
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                          <span className="inline-block bg-[#FF8800] text-white text-[10px] font-jakarta font-black tracking-wider px-3.5 py-1 rounded-full uppercase mb-4 shadow-xs">
                            RETAIL & KONSUMSI
                          </span>
                          <h3 className="font-jakarta font-black text-2xl md:text-3xl text-yen-dark mb-4">
                            Business To Customer (B2C)
                          </h3>
                          <p className="font-jakarta text-sm text-yen-neutral mb-6 leading-relaxed">
                            Melayani kebutuhan pangan harian rumah tangga secara
                            langsung dengan mengutamakan kepraktisan penyajian
                            tanpa mengurangi cita rasa khas restoran bintang
                            lima.
                          </p>
                        </div>

                        <div className="mt-auto">
                          <Link to="/layanan?tab=b2c">
                            <Button
                              variant="accent"
                              size="sm"
                              className="w-full lg:w-auto px-8 rounded-full font-bebas !text-white shadow-[0_4px_15px_rgba(255,136,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,136,0,0.4)]"
                            >
                              Info B2C Detail
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Grid Bullet Points list */}
                      <div className="lg:col-span-7 border-t-2 border-yen-cream/50 lg:border-t-0 lg:border-l-2 lg:border-yen-cream/50 pt-6 lg:pt-0 lg:pl-8 flex items-center">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-jakarta text-sm text-yen-dark w-full">
                          {b2cFeatures.map((feature, idx) => (
                            <FeatureItem
                              key={idx}
                              title={feature.title}
                              desc={feature.desc}
                              icon={feature.icon}
                              bgColor={feature.bgColor}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* B2C Image (Visually on the Right) */}
                <div className="lg:col-span-3 w-full max-w-[280px] mx-auto lg:mx-0 flex justify-center">
                  <div className="relative group/img overflow-hidden border-2 border-yen-cream rounded-[24px] shadow-[0_12px_32px_rgba(30,27,26,0.12)] hover:shadow-[0_20px_40px_rgba(227,30,36,0.22)] transition-all duration-500 hover:-translate-y-1 bg-yen-white p-2 rotate-2 hover:rotate-0 w-full aspect-square">
                    <div className="w-full h-full overflow-hidden rounded-[18px] bg-yen-cream/35 flex items-center justify-center relative">
                      <span className="absolute text-xs text-yen-neutral">
                        Loading B2C...
                      </span>
                      <img
                        src="/foto-layanan/b2c.jpg"
                        alt="Baso Yen Retail B2C"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500 relative z-10 will-change-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* B2B ROW (Image Left, Card Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* B2B Image (Visually on the Left) */}
                <div className="lg:col-span-3 w-full max-w-[280px] mx-auto lg:mx-0 lg:order-1 order-2 flex justify-center">
                  <div className="relative group/img overflow-hidden border-2 border-yen-cream rounded-[24px] shadow-[0_12px_32px_rgba(30,27,26,0.12)] hover:shadow-[0_20px_40px_rgba(227,30,36,0.22)] transition-all duration-500 hover:-translate-y-1 bg-yen-white p-2 -rotate-2 hover:rotate-0 w-full aspect-square">
                    <div className="w-full h-full overflow-hidden rounded-[18px] bg-yen-cream/35 flex items-center justify-center relative">
                      <span className="absolute text-xs text-yen-neutral">
                        Loading B2B...
                      </span>
                      <img
                        src="/foto-layanan/b2b.jpg"
                        alt="Baso Yen Horeka B2B"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500 relative z-10 will-change-transform"
                      />
                    </div>
                  </div>
                </div>

                {/* B2B Card */}
                <div className="lg:col-span-9 w-full lg:order-2 order-1">
                  <ScrollReveal
                    direction="left"
                    className="bg-[#FCFAF8] border-2 border-yen-cream hover:border-yen-accent/30 p-8 md:p-10 rounded-[28px] overflow-hidden group shadow-[0_20px_48px_-8px_rgba(30,27,26,0.18),0_8px_24px_rgba(30,27,26,0.08)] hover:shadow-[0_24px_50px_rgba(227,30,36,0.25)] transition-all duration-300 relative z-10 w-full"
                  >
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-yen-accent/50 to-yen-accent group-hover:from-yen-accent group-hover:to-rose-600 transition-all duration-500" />

                    {/* Background Watermark */}
                    <div className="absolute -right-8 -top-8 opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none select-none text-yen-accent">
                      <svg
                        className="w-48 h-48"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10 text-left">
                      {/* LEFT COLUMN: Title & Description (visually on the right on desktop) */}
                      <div className="lg:col-span-5 lg:order-2 lg:border-l-2 lg:border-yen-cream/50 lg:pl-8 flex flex-col justify-between">
                        <div>
                          <span className="inline-block bg-yen-accent text-white text-[10px] font-jakarta font-black tracking-wider px-3.5 py-1 rounded-full uppercase mb-4 shadow-xs">
                            HOREKA & KEMITRAAN
                          </span>
                          <h3 className="font-jakarta font-black text-2xl md:text-3xl text-yen-dark mb-4">
                            Business To Business (B2B)
                          </h3>
                          <p className="font-jakarta text-sm text-yen-neutral mb-6 leading-relaxed">
                            Menjadi mitra andalan penyuplai bahan baku mie
                            mentah, bakso, dan sosis bersertifikat lengkap untuk
                            menjamin kredibilitas dan kelezatan usaha kuliner
                            Anda.
                          </p>
                        </div>

                        <div className="mt-auto pt-4 lg:pt-0">
                          <Link to="/layanan?tab=b2b">
                            <Button
                              variant="primary"
                              size="sm"
                              className="w-full lg:w-auto px-8 rounded-full font-bebas !text-white shadow-[0_4px_15px_rgba(255,136,0,0.3)] hover:shadow-[0_8px_20px_rgba(255,136,0,0.4)]"
                            >
                              Info Kemitraan B2B
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Grid Bullet Points list (visually on the left on desktop) */}
                      <div className="lg:col-span-7 lg:order-1 border-t-2 border-yen-cream/50 lg:border-t-0 pt-6 lg:pt-0 flex items-center">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-jakarta text-sm text-yen-dark w-full">
                          {b2bFeatures.map((feature, idx) => (
                            <FeatureItem
                              key={idx}
                              title={feature.title}
                              desc={feature.desc}
                              icon={feature.icon}
                              bgColor={feature.bgColor}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
