import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function LayananB2B() {
  const b2bBenefits = [
    {
      title: "Skema Harga Grosir & Horeka Khusus",
      desc: "Dapatkan margin bisnis yang sangat menarik dan kompetitif melalui sistem penawaran harga kemitraan partai besar kami.",
      icon: "💰",
    },
    {
      title: "Jasa Maklon & Kustomisasi Resep",
      desc: "Kembangkan menu eksklusif dengan formula rasa, ketebalan mie, atau diameter bakso yang disesuaikan khusus bisnis Anda.",
      icon: "⚙️",
    },
    {
      title: "Konsistensi Kualitas Premium Kontinu",
      desc: "Pabrik modern bersertifikasi penuh menjamin setiap pengiriman memiliki cita rasa, higienitas, dan tekstur konsisten.",
      icon: "🍜",
    },
    {
      title: "Dukungan Sampel & Promosi Produk",
      desc: "Kami menyediakan sampel produk gratis untuk uji coba menu baru Anda serta aset promosi digital siap pakai.",
      icon: "📈",
    },
  ];

  return (
    <motion.div
      key="b2b-content"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-16"
    >
      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="font-jakarta text-base md:text-lg text-yen-neutral leading-relaxed">
          &ldquo;Baso Yen dipercaya menjadi supplier utama bakso sapi, mie basah
          mentah, sosis gourmet dan kulit pangsit premium. Mulai dari kedai
          kuliner lokal, resto populer, café kekinian hingga hotel bintang lima
          di pulau Jawa. Pabrik modern Baso Yen siap memenuhi kebutuhan usaha
          Anda mulai dari UMKM hingga partai besar.&rdquo;
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {b2bBenefits.map((benefit, idx) => (
          <div
            key={idx}
            className="p-8 border-2 border-yen-cream bg-yen-white flex items-start gap-6 shadow-[0_12px_35px_rgba(30,27,26,0.15)] hover:shadow-[0_20px_45px_rgba(255,136,0,0.25)] hover:border-yen-gold/25 transition-all duration-300 rounded-[24px] relative group overflow-hidden"
          >
            <div
              className={`w-14 h-14 shrink-0 text-white flex items-center justify-center rounded-full text-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 select-none ${
                benefit.icon === "💰"
                  ? "bg-amber-500"
                  : benefit.icon === "⚙️"
                    ? "bg-zinc-500"
                    : benefit.icon === "🍜"
                      ? "bg-yen-accent"
                      : "bg-blue-500"
              }`}
            >
              {benefit.icon}
            </div>
            <div>
              <h4 className="font-jakarta font-extrabold text-lg text-yen-dark mb-2 leading-snug">
                {benefit.title}
              </h4>
              <p className="font-jakarta text-sm text-yen-neutral leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-yen-accent text-yen-white p-8 md:p-12 text-center max-w-3xl mx-auto rounded-[28px] grain-overlay border-2 border-yen-cream/15">
        <h3 className="font-bebas text-3xl md:text-4xl font-black mb-3 uppercase">
          Kembangkan Bisnis Kuliner Anda
        </h3>
        <p className="font-jakarta text-yen-cream/80 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Hubungi tim marketing Horeka kami untuk berdiskusi mengenai penawaran
          harga khusus, sampel produk gratis, dan konsultasi kerjasama jangka
          panjang.
        </p>
        <Link to="/kontak">
          <Button variant="dark" className="rounded-full px-8 py-3">
            Hubungi Kami untuk Kemitraan
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
