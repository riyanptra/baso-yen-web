import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

export default function SejarahSection() {
  const timelineItems = [
    {
      year: "1988",
      title: "Awal Berdiri",
      desc: "Didirikan pertama kali di Bandung dengan idealisme menyajikan produk mie basah tradisional berkarakter khas.",
    },
    {
      year: "2000-an",
      title: "Ekspansi B2B",
      desc: "Mulai dipercaya menyuplai restoran, hotel, katering, dan kafe di wilayah Jawa Barat karena konsistensi rasanya.",
    },
    {
      year: "2010-an",
      title: "Armada Mobil Toko",
      desc: "Meluncurkan layanan ikonik Moko (Mobil Toko) untuk menjangkau pemukiman di seluruh Bandung secara mobile.",
    },
    {
      year: "Sekarang",
      title: "Pabrik Modern",
      desc: "Mengoperasikan pabrik higienis bersertifikasi halal dan BPOM penuh, didampingi 2 factory store di Bandung.",
    },
  ];

  return (
    <section className="bg-yen-white py-24 bg-grid-pattern">
      <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
      <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Kiri: Narasi */}
        <ScrollReveal direction="right">
          <SectionLabel variant="dm" color="accent">
            Filosofi & motto kami
          </SectionLabel>
          <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark mb-4 leading-none uppercase">
            &ldquo;Paduan Kualitas dan{" "}
            <span className="text-yen-accent">Layanan Sempurna</span>&rdquo;
          </h2>
          <div className="w-12 h-1 bg-yen-accent mb-8" />

          <div className="space-y-6 font-jakarta text-sm md:text-base text-yen-neutral leading-relaxed">
            <p>
              Perusahaan Mie &amp; Baso Yen adalah sebuah perusahaan mie, baso,
              &amp; sosis yang didirikan sejak tahun 1988. Sejak berdiri,
              perusahaan Mie, Baso &amp; Sosis Yen mengusung idealisme untuk
              memberikan kualitas yang terbaik. Perusahaan Mie, Baso, &amp;
              Sosis Yen yang berlokasi di Jln. BKR Komp. Puri. Kav 61 ini kini
              telah berkembang menjadi tempat produksi yang higienis dan modern
              berpadu dengan counter penjualan yang nyaman, hal ini sangatlah
              sesuai dengan moto perusahaan mie baso &amp; sosis Yen yaitu
              &ldquo;Paduan Kualitas dan Layanan Sempurna&rdquo;.
            </p>
            <p>
              Keunggulan dari produk mie baso &amp; sosis Yen ini tidak lain
              adalah karena produk Yen terbuat dari bahan-bahan pilihan yang
              berkualitas. Pengolahan mie baso &amp; sosis Yen ini pun mudah,
              sehingga setiap orang dapat memasak mie baso &amp; sosis selezat
              di resto.{" "}
              <span className="font-bold">
                Sejak berdiri perusahaan Yen telah dipercaya sebagai pemasok di
                restoran-restoran, hotel-hotel, cafe, dan foodcourt.
              </span>{" "}
              Dengan terus berkreasi dan tetap mempertahankan idealisme awal
              dari perusahaan mie baso &amp; sosis Yen yaitu memberikan dan
              menghasilkan kualitas produk yang prima, kami yakin produk-produk
              yang dihasilkan tetap terpercaya di mata masyarakat.
            </p>
          </div>
        </ScrollReveal>

        {/* Kanan: Timeline Vertikal */}
        <div className="w-full">
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <ScrollReveal
                direction="left"
                className="relative pl-6 sm:pl-8 border-l border-yen-accent/25 py-4 space-y-12"
              >
                {timelineItems.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-[-31px] sm:left-[-39px] top-1.5 w-4 h-4 rounded-full bg-yen-accent border-4 border-yen-white shadow-sm" />
                    <span className="font-bebas text-2xl text-yen-accent block tracking-wider mb-1">
                      {item.year}
                    </span>
                    <h4 className="font-bebas text-xl font-bold text-yen-dark mb-2 uppercase">
                      {item.title}
                    </h4>
                    <p className="font-jakarta text-sm text-yen-neutral leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
