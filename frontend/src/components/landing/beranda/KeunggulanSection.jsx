import { motion } from "framer-motion";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const getAdvIcon = (num) => {
  switch (num) {
    case "01": // Hot Soup Bowl / Meat
      return (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 12h20c0 4.42-3.58 8-8 8h-4c-4.42 0-8-3.58-8-8zm9-10c0-1.1.9-2 2-2s2 .9 2 2v2h-4V2zm-4 0c0-1.1.9-2 2-2s2 .9 2 2v2H7V2zm8 6c0-1.1.9-2 2-2s2 .9 2 2v2h-4V8z" />
        </svg>
      );
    case "02": // Natural Leaf / Veggie
      return (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 8c-1.45 0-3.32.94-5 2.58C10.32 8.94 8.45 8 7 8c-2.76 0-5 2.24-5 5 0 4.42 5.58 8.5 10 9 4.42-.5 10-4.58 10-9 0-2.76-2.24-5-5-5zM7 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm10 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      );
    case "03": // Fresh / Water drop
      return (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "04": // Premium Star
      return (
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    default:
      return null;
  }
};

const listItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const KeunggulanCard = ({ adv }) => (
  <motion.div
    variants={listItem}
    className="bg-yen-white border-2 border-yen-cream rounded-[28px] overflow-hidden flex flex-col shadow-[0_12px_32px_rgba(30,27,26,0.10)] hover:shadow-[0_20px_40px_rgba(227,30,36,0.18)] hover:border-yen-accent/25 transition-all duration-500 hover:-translate-y-2 group"
  >
    {/* Card Header Photo */}
    <div className="relative w-full aspect-4/3 overflow-hidden bg-yen-dark/10">
      <img decoding="async" loading="lazy" 
        src={adv.img}
        alt={adv.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      />
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Badge Tag in Header */}
      <span
        className={`absolute top-4 right-4 text-[9px] font-jakarta font-black tracking-wider px-3 py-1.5 rounded-full uppercase shadow-md border border-white/10 ${adv.color}`}
      >
        {adv.tag}
      </span>
    </div>

    {/* Card Body */}
    <div className="p-6 pt-8 relative flex-1 flex flex-col justify-between">
      {/* Floating sticker icon */}
      <div
        className={`absolute -top-7.5 left-6 p-3 rounded-full ${adv.badgeColor} shadow-[0_8px_20px_rgba(0,0,0,0.15)] border-4 border-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shrink-0`}
      >
        {getAdvIcon(adv.num)}
      </div>

      <div>
        <h3 className="font-jakarta font-extrabold text-base text-yen-dark mb-2.5 mt-1 group-hover:text-yen-accent transition-colors duration-300">
          {adv.title}
        </h3>
        <p className="font-jakarta text-xs text-yen-neutral leading-relaxed">
          {adv.desc}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function KeunggulanSection() {
  // Animasi Stagger Grid/List
  const listContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const advantages = [
    {
      num: "01",
      tag: "MUTU TERJAMIN",
      title: "Bahan Baku Pilihan",
      desc: "Bahan-bahan berkualitas dan terbaik adalah syarat untuk setiap pembuatan produk Yen. Sehingga rasa serta produknya tetap terjaga.",
      color: "bg-yen-accent/90 backdrop-blur-md text-white border-white/20",
      badgeColor: "bg-yen-accent text-white",
      img: "/foto-keunggulan/bahan-baku.jpg",
    },
    {
      num: "02",
      tag: "SEHAT & ALAMI",
      title: "Tanpa Pengawet dan bahan berbahaya",
      desc: "Peduli akan kesehatan konsumen, setiap produk Yen menggunakan standard food grade sehingga lebih sehat dan aman dikonsumsi.",
      color: "bg-emerald-600/90 backdrop-blur-md text-white border-white/20",
      badgeColor: "bg-emerald-500 text-white",
      img: "/foto-keunggulan/tanpa-pengawet.jpg",
    },
    {
      num: "03",
      tag: "HIGIENITAS TINGGI",
      title: "Fresh & Higienis",
      desc: "Untuk menjaga kualitas rasa dan demi menghasilkan produk yang sehat, Yen selalu menjual produk yang fresh dan baru.",
      color: "bg-sky-600/90 backdrop-blur-md text-white border-white/20",
      badgeColor: "bg-sky-500 text-white",
      img: "/foto-keunggulan/fresh.png",
    },
    {
      num: "04",
      tag: "RASA KHAS RESTO",
      title: "Citarasa Premium",
      desc: "Bahan yang dipilih sudah pasti berkualitas dan menggunakan bahan pilihan yang membuat produk memiliki citarasa selezat di resto.",
      color: "bg-amber-600/90 backdrop-blur-md text-white border-white/20",
      badgeColor: "bg-amber-500 text-white",
      img: "/foto-keunggulan/premium.jpg",
    },
  ];

  return (
    <section className="bg-yen-white py-24 relative overflow-hidden bg-grid-pattern">
      {/* Playful background spots */}
      <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
      <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <SectionLabel variant="bebas" color="accent">
              KENAPA HARUS BASO YEN?
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-6xl font-black text-yen-dark mt-3 leading-none uppercase">
              Keistimewaan <span className="text-yen-accent">Produk Kami</span>
            </h2>
            <p className="font-jakarta text-md text-yen-neutral mt-4 max-w-lg mx-auto leading-relaxed">
              Diolah dengan resep legendaris untuk menghadirkan kualitas rasa
              makanan terbaik ke meja makan Anda.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Cards wrapped in a single shelf box container */}
        <ScrollReveal>
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            {/* Ambient decorative glow inside shelf */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full relative z-10"
            >
              {advantages.map((adv) => (
                <KeunggulanCard key={adv.num} adv={adv} />
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
