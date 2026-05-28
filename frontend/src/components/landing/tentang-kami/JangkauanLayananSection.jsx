import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const ServiceCard = ({ service, idx }) => (
  <div className="p-8 border-2 border-yen-cream bg-yen-white shadow-[0_12px_35px_rgba(30,27,26,0.15)] hover:shadow-[0_20px_45px_rgba(255,136,0,0.25)] hover:border-yen-gold/25 transition-all duration-300 rounded-[24px] relative group overflow-hidden">
    <div
      className={`w-14 h-14 text-white flex items-center justify-center rounded-full text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 select-none ${
        idx % 2 === 0 ? "bg-yen-accent" : "bg-yen-gold"
      }`}
    >
      {service.icon}
    </div>
    <h4 className="font-jakarta font-extrabold text-lg text-yen-dark mb-3">
      {service.title}
    </h4>
    <p className="font-jakarta text-sm text-yen-neutral leading-relaxed">
      {service.desc}
    </p>
  </div>
);

export default function JangkauanLayananSection() {
  const servicesRingkas = [
    {
      title: "Supplier Utama",
      desc: "Sejak berdiri, Yen melayani suplai bahan baku untuk perhotelan, restoran, catering, café, hingga rumah sakit.",
      icon: "🏢",
    },
    {
      title: "Mobil Toko (Moko)",
      desc: "Armada keliling legendaris yang telah melayani selama 10 tahun berkeliling ke berbagai penjuru kota Bandung.",
      icon: "🚚",
    },
    {
      title: "Online Store",
      desc: "Kemudahan bertransaksi produk beku premium melalui Tokopedia, Shopee, dan platform digital lainnya.",
      icon: "💻",
    },
    {
      title: "Offline Store",
      desc: "Dua outlet resmi yang nyaman: Counter Yen Factory BKR dan Meatball Factory Yen Pasirkaliki.",
      icon: "🏪",
    },
    {
      title: "Program Reseller",
      desc: "Peluang usaha reseller dengan skema kemitraan yang saling menguntungkan dan pendampingan bisnis.",
      icon: "🤝",
    },
    {
      title: "Cooking Class",
      desc: "Program edukatif memasak mie dan membuat bakso sehat khusus untuk anak-anak dan instansi sekolah.",
      icon: "👨‍🍳",
    },
  ];

  return (
    <section className="bg-yen-white py-24 border-t border-yen-accent/10 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <SectionLabel variant="bebas" color="accent">
              MENGAPA KAMI
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark uppercase">
              Jangkauan Layanan Kami
            </h2>
            <p className="font-jakarta text-sm text-yen-neutral mt-4 max-w-2xl leading-relaxed mx-auto text-center">
              Kami senantiasa berupaya hadir lebih dekat untuk memenuhi kebutuhan kuliner Anda. Melalui berbagai unit layanan terpadu—mulai dari pasokan kemitraan bisnis (B2B), armada keliling legendaris, toko fisik resmi, hingga kemudahan belanja online—Baso Yen siap menyajikan produk berkualitas tinggi dengan jaminan kesegaran terbaik ke seluruh penjuru wilayah.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesRingkas.map((service, idx) => (
                <ServiceCard key={idx} service={service} idx={idx} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
