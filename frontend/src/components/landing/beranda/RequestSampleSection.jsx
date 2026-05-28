import { useState } from "react";
import axiosInstance from "../../../lib/axios";
import { motion } from "framer-motion";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const FeatureCard = ({ bgClass, textClass, hoverBgClass, icon, title, desc }) => (
  <div className="bg-white p-5 border-2 border-yen-cream hover:border-yen-accent/25 rounded-[24px] shadow-[0_12px_32px_rgba(30,27,26,0.06)] hover:shadow-[0_16px_36px_rgba(227,30,36,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex gap-4 items-start text-left group">
    <span className={`p-2.5 ${bgClass} ${textClass} rounded-full text-lg shrink-0 transition-colors group-hover:${hoverBgClass} flex items-center justify-center w-11 h-11`}>
      {icon}
    </span>
    <div>
      <h4 className="font-jakarta font-bold text-sm text-yen-dark group-hover:text-yen-accent transition-colors duration-300">
        {title}
      </h4>
      <p className="font-jakarta text-xs text-yen-neutral mt-1.5 leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default function RequestSampleSection() {
  const [sampleForm, setSampleForm] = useState({
    name: "",
    email: "",
    business: "",
    city: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /**
   * Mengirimkan pengajuan formulir 'Request Sample' ke backend API.
   * Menampilkan efek pemuatan (loading), membersihkan input form jika sukses, 
   * dan memunculkan notifikasi visual ke pengunjung.
   * @param {object} e - Event form (DOM) untuk mencegah reload halaman
   */
  const handleSampleSubmit = async (e) => {
    e.preventDefault();
    if (
      !sampleForm.name ||
      !sampleForm.email ||
      !sampleForm.business ||
      !sampleForm.city ||
      !sampleForm.phone
    ) {
      alert("Harap lengkapi semua field form.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      // Kirim data ke Backend (Dasbor Admin)
      await axiosInstance.post("/messages/sample-request", {
        name: sampleForm.name,
        email: sampleForm.email,
        businessName: sampleForm.business,
        city: sampleForm.city,
        phone: sampleForm.phone,
      });

      setSubmitSuccess(true);

    } catch (error) {
      console.error("Gagal mengirim pengajuan sampel:", error);
      alert("Maaf, terjadi kesalahan pada server. Silakan coba beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sampleFeatures = [
    {
      title: "Pilihan Varian Lengkap",
      desc: "Dapatkan sampel Mie Basah (berbagai ketebalan), Bakso Sapi, atau Sosis Premium.",
      icon: "🍜",
      bgClass: "bg-emerald-50",
      textClass: "text-emerald-600",
      hoverBgClass: "bg-emerald-100",
    },
    {
      title: "Legalitas & Sertifikasi",
      desc: "Seluruh produk telah bersertifikat resmi Halal MUI dan terdaftar BPOM RI MD.",
      icon: "🛡️",
      bgClass: "bg-blue-50",
      textClass: "text-blue-600",
      hoverBgClass: "bg-blue-100",
    },
    {
      title: "Pengiriman Cold Chain",
      desc: "Sampel dikirim dengan kemasan beku rantai dingin agar kualitasnya tetap terjaga.",
      icon: "🚚",
      bgClass: "bg-amber-50",
      textClass: "text-amber-600",
      hoverBgClass: "bg-amber-100",
    },
    {
      title: "Kustomisasi Spesifikasi",
      desc: "Konsultasikan kebutuhan tekstur, kekenyalan, atau rasa mie khusus untuk resep unik Anda.",
      icon: "⚙️",
      bgClass: "bg-purple-50",
      textClass: "text-purple-600",
      hoverBgClass: "bg-purple-100",
    }
  ];

  return (
    <section className="bg-yen-white text-yen-dark py-24 relative overflow-hidden border-t border-yen-cream/60 bg-grid-pattern">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-yen-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yen-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: B2B Info */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right">
              <SectionLabel variant="bebas" color="accent">
                KEMITRAAN B2B PREMIUM
              </SectionLabel>
              <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-yen-dark tracking-tight leading-none mt-2 text-left">
                UJI RASA GRATIS UNTUK{" "}
                <span className="text-yen-accent">BISNIS KULINER ANDA</span>
              </h2>
              <div className="w-16 h-1 bg-yen-accent mt-4 mb-6" />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="p-6 md:p-8 lg:p-10 bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] relative overflow-hidden shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)]">
                {/* Ambient decorative glow inside shelf */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yen-accent/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-6 text-left">
                  <p className="font-jakarta text-sm text-yen-neutral leading-relaxed">
                    Kami mengerti bahwa kualitas rasa konsisten adalah kunci
                    sukses bisnis kuliner Anda. Oleh karena itu, Baso Yen
                    menyediakan program sampel produk gratis/khusus untuk
                    pemilik restoran, hotel, katering, café, maupun penjual mie
                    bakso.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {sampleFeatures.map((feature, idx) => (
                      <FeatureCard
                        key={idx}
                        title={feature.title}
                        desc={feature.desc}
                        icon={feature.icon}
                        bgClass={feature.bgClass}
                        textClass={feature.textClass}
                        hoverBgClass={feature.hoverBgClass}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Interactive Request Form */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="bg-white border-2 border-yen-cream rounded-[32px] p-8 shadow-[0_20px_50px_rgba(30,27,26,0.06)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-yen-accent to-yen-gold" />

                {!submitSuccess ? (
                  <form onSubmit={handleSampleSubmit} className="space-y-5">
                    <div className="text-center mb-4">
                      <h3 className="font-bebas text-2xl tracking-wide text-yen-dark">
                        FORM PENGAJUAN SAMPLE USAHA
                      </h3>
                      <p className="font-jakarta text-xs text-yen-neutral mt-1">
                        Lengkapi data usaha Anda untuk mendapatkan paket tester
                        gratis
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="space-y-1.5 text-left">
                      <label
                        htmlFor="sample-name"
                        className="font-jakarta font-bold text-xs text-yen-dark uppercase tracking-wider block"
                      >
                        Nama Pemilik / Perwakilan
                      </label>
                      <input
                        type="text"
                        id="sample-name"
                        placeholder="Nama Anda"
                        required
                        value={sampleForm.name}
                        onChange={(e) =>
                          setSampleForm({
                            ...sampleForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF9F5] border border-yen-cream hover:border-yen-accent/30 focus:border-yen-accent focus:bg-white text-yen-dark font-jakarta text-xs rounded-xl px-4.5 py-3 transition-all outline-none"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5 text-left">
                      <label
                        htmlFor="sample-email"
                        className="font-jakarta font-bold text-xs text-yen-dark uppercase tracking-wider block"
                      >
                        Email / Surel Aktif
                      </label>
                      <input
                        type="email"
                        id="sample-email"
                        placeholder="email@perusahaan.com"
                        required
                        value={sampleForm.email}
                        onChange={(e) =>
                          setSampleForm({
                            ...sampleForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF9F5] border border-yen-cream hover:border-yen-accent/30 focus:border-yen-accent focus:bg-white text-yen-dark font-jakarta text-xs rounded-xl px-4.5 py-3 transition-all outline-none"
                      />
                    </div>

                    {/* Business Name */}
                    <div className="space-y-1.5 text-left">
                      <label
                        htmlFor="sample-business"
                        className="font-jakarta font-bold text-xs text-yen-dark uppercase tracking-wider block"
                      >
                        Nama Usaha Kuliner
                      </label>
                      <input
                        type="text"
                        id="sample-business"
                        placeholder="Contoh: Depot Mie Sinar Baru, Hotel Grand Bandung"
                        required
                        value={sampleForm.business}
                        onChange={(e) =>
                          setSampleForm({
                            ...sampleForm,
                            business: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF9F5] border border-yen-cream hover:border-yen-accent/30 focus:border-yen-accent focus:bg-white text-yen-dark font-jakarta text-xs rounded-xl px-4.5 py-3 transition-all outline-none"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5 text-left">
                      <label
                        htmlFor="sample-city"
                        className="font-jakarta font-bold text-xs text-yen-dark uppercase tracking-wider block"
                      >
                        Kota Lokasi Usaha
                      </label>
                      <input
                        type="text"
                        id="sample-city"
                        placeholder="Contoh: Bandung, Jakarta"
                        required
                        value={sampleForm.city}
                        onChange={(e) =>
                          setSampleForm({
                            ...sampleForm,
                            city: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF9F5] border border-yen-cream hover:border-yen-accent/30 focus:border-yen-accent focus:bg-white text-yen-dark font-jakarta text-xs rounded-xl px-4.5 py-3 transition-all outline-none"
                      />
                    </div>

                    {/* WhatsApp / Phone */}
                    <div className="space-y-1.5 text-left">
                      <label
                        htmlFor="sample-phone"
                        className="font-jakarta font-bold text-xs text-yen-dark uppercase tracking-wider block"
                      >
                        Nomor WhatsApp (Aktif)
                      </label>
                      <input
                        type="tel"
                        id="sample-phone"
                        placeholder="Contoh: 08123456789"
                        required
                        value={sampleForm.phone}
                        onChange={(e) =>
                          setSampleForm({
                            ...sampleForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF9F5] border border-yen-cream hover:border-yen-accent/30 focus:border-yen-accent focus:bg-white text-yen-dark font-jakarta text-xs rounded-xl px-4.5 py-3 transition-all outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yen-accent hover:bg-yen-dark text-white font-jakarta font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Memproses Pengajuan...</span>
                        </>
                      ) : (
                        <>
                          <span>Ajukan Sample Gratis Sekarang</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-emerald-100">
                      ✓
                    </div>
                    <h3 className="font-bebas text-3xl tracking-wide text-yen-dark">
                      PENGAJUAN DIKIRIM!
                    </h3>
                    <p className="font-jakarta text-xs text-yen-neutral leading-relaxed max-w-sm mx-auto">
                      Terima kasih, data Anda telah tercatat dan terkirim kepada kami.
                      Tim Layanan Pelanggan kami akan segera menghubungi Anda
                      melalui Email atau WhatsApp untuk kelanjutan pengiriman sampel.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setSampleForm({
                          name: "",
                          business: "",
                          city: "",
                          phone: "",
                        });
                      }}
                      className="inline-block text-xs font-bold text-yen-accent hover:underline mt-4 cursor-pointer"
                    >
                      ← Ajukan Kembali
                    </button>
                  </motion.div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
