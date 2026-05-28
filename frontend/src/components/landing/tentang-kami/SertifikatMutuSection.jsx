import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import { certificates as dummyCertificates } from "../../../data/certificates";
import axiosInstance from "../../../lib/axios";

import logoHalal from "../../../assets/logo-sertifikasi/Logo_Halal.png";
import logoBPOM from "../../../assets/logo-sertifikasi/Logo_Badan_POM.png";
import logoHCCP from "../../../assets/logo-sertifikasi/logo-haccp.png";
import logoDinkes from "../../../assets/logo-sertifikasi/logo-dinkes.png";

const SertifikatCard = ({ cert, handleCopy, copiedId, setSelectedCert }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-6 border border-yen-cream hover:border-yen-accent/30 shadow-[0_12px_35px_rgba(30,27,26,0.07)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)] transition-all duration-300 relative flex flex-col justify-between min-h-[290px] rounded-[24px] group"
  >
    <div>
      {/* Header Badges */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-jakarta font-black tracking-wider text-white px-3 py-1 rounded-full uppercase shadow-xs ${
          cert.type === "HALAL" ? "bg-emerald-500" :
          cert.type === "BPOM" ? "bg-blue-600" :
          cert.type === "SANITASI" ? "bg-purple-600" :
          cert.type === "HACCP" ? "bg-amber-600" :
          "bg-slate-700"
        }`}>
          {cert.type === "HALAL" ? "HALAL INDONESIA" :
           cert.type === "BPOM" ? "BPOM RI MD" :
           cert.type === "SANITASI" ? "DINKES RI" :
           cert.type === "HACCP" ? "GLOBAL SAFETY" :
           cert.issuer}
        </span>

        <div className="flex items-center gap-1.5 text-[10px] font-jakarta font-black tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          TERVERIFIKASI
        </div>
      </div>

      {/* Title and Icon Area */}
      <div className="flex gap-4 items-start mt-5 mb-4">
        {/* Circle Icon Container */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-white border border-yen-cream p-1.5 overflow-hidden shadow-xs">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : cert.type === "HALAL" ? (
            <img
              src={logoHalal}
              alt="Halal Indonesia"
              className="w-full h-full object-contain"
            />
          ) : cert.type === "BPOM" ? (
            <img
              src={logoBPOM}
              alt="BPOM RI"
              className="w-full h-full object-contain"
            />
          ) : cert.type === "SANITASI" ? (
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-white p-1">
              <img
                src={logoDinkes}
                alt="Sanitasi"
                className="w-full h-full object-contain"
              />
            </div>
          ) : cert.type === "HACCP" ? (
            <img
              src={logoHCCP}
              alt="HACCP"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl uppercase">
               {cert.title ? cert.title.charAt(0) : "C"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h4 className="font-jakarta font-extrabold text-base text-yen-dark leading-snug group-hover:text-yen-accent transition-colors duration-300">
            {cert.title}
          </h4>
          <p className="font-jakarta text-xs text-yen-neutral/70 mt-1">
            Otoritas:{" "}
            <span className="font-semibold text-yen-dark/80">
              {cert.issuer}
            </span>
          </p>
        </div>
      </div>

      {/* Cakupan (Red left line & italic text) */}
      <div className="border-l-2 border-yen-accent pl-3 py-0.5 mb-5 mt-3">
        <p className="font-jakarta text-xs text-yen-neutral/80 leading-relaxed">
          Cakupan:{" "}
          <span className="font-medium italic text-yen-dark/95">
            {cert.scope}
          </span>
        </p>
      </div>
    </div>

    {/* Bottom area */}
    <div className="bg-[#FAF9F7] border border-yen-cream/50 rounded-xl px-4 py-2.5 flex items-center justify-between mt-auto gap-2">
      <span className="font-bebas text-[9px] text-yen-neutral/50 tracking-wider shrink-0">
        REGISTRASI
      </span>

      <div className="flex items-center gap-2.5 min-w-0">
        <span className="font-mono text-xs font-bold text-yen-accent tracking-wide truncate select-all">
          {cert.code}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Copy button */}
          <button
            onClick={() => handleCopy(cert.code)}
            className="text-yen-neutral hover:text-yen-dark p-1 hover:bg-yen-cream rounded-md transition-all cursor-pointer relative animate-none"
            title="Salin Nomor Registrasi"
          >
            <AnimatePresence>
              {copiedId === cert.code && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-[9px] text-dark -400 font-bebas absolute -top-8 left-1/2 -translate-x-1/2 bg-white border border-dark px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-10"
                >
                  Tersalin!
                </motion.span>
              )}
            </AnimatePresence>
            <svg
              className="w-4 h-4 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>

          {/* View Document Modal Trigger / External Link */}
          {cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yen-neutral hover:text-yen-dark p-1 hover:bg-yen-cream rounded-md transition-all cursor-pointer"
              title="Buka Dokumen Resmi"
            >
              <svg
                className="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <button
              onClick={() => setSelectedCert(cert)}
              className="text-yen-neutral hover:text-yen-dark p-1 hover:bg-yen-cream rounded-md transition-all cursor-pointer"
              title="Lihat Detail Sertifikat"
            >
              <svg
                className="w-4 h-4 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function SertifikatMutuSection() {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("SEMUA");
  const [certificates, setCertificates] = useState(dummyCertificates);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axiosInstance.get("/certificates");
        if (response.data && response.data.data && response.data.data.length > 0) {
          const mappedCerts = response.data.data.map((cert) => {
            const authLower = (cert.authority || "").toLowerCase();
            const type = authLower.includes("bpom") ? "BPOM" 
                       : (authLower.includes("halal") || authLower.includes("mui")) ? "HALAL" 
                       : authLower.includes("dinkes") ? "SANITASI" 
                       : authLower.includes("haccp") ? "HACCP"
                       : "UMUM";
            return {
              id: cert.id,
              type: type,
              title: cert.name,
              issuer: cert.authority,
              scope: cert.scope,
              code: cert.registrationNumber,
              image: cert.image,
              link: cert.link
            };
          });
          setCertificates(mappedCerts);
        }
      } catch (error) {
        console.error("Gagal mengambil sertifikat:", error);
      }
    };
    fetchCertificates();
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCertificates = certificates.filter((cert) => {
    if (activeCategory === "SEMUA") return true;
    if (activeCategory === "HALAL") return cert.type === "HALAL";
    if (activeCategory === "BPOM") return cert.type === "BPOM";
    if (activeCategory === "LAINNYA")
      return cert.type === "SANITASI" || cert.type === "HACCP" || cert.type === "UMUM";
    return true;
  });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="bg-yen-white py-24 bg-grid-pattern relative overflow-hidden">
      <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
      <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Kiri: Judul dan Filter Sidebar */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-8">
            <ScrollReveal direction="right">
              <SectionLabel variant="bebas" color="neutral">
                LEGALITAS & STANDAR
              </SectionLabel>
              <h2 className="font-bebas text-4xl sm:text-5xl font-black text-yen-dark uppercase mt-2 leading-none">
                Sertifikasi <span className="text-yen-accent">Mutu Kami</span>
              </h2>
              <p className="font-jakarta text-xs text-yen-neutral/90 leading-relaxed mt-4">
                Baso Yen berkomitmen menjaga mutu kebersihan, keamanan, dan
                kehalalan produk secara konsisten. Seluruh lini produk kami
                terdaftar resmi dan diawasi oleh badan otoritas nasional secara
                berkala guna menjamin standar kualitas tinggi.
              </p>
            </ScrollReveal>

            {/* Filter Tabs */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="flex flex-col gap-2.5 bg-white p-4 rounded-[20px] border border-yen-cream/60 shadow-[0_10px_30px_rgba(30,27,26,0.06)]">
                <span className="font-bebas text-[10px] text-yen-neutral/50 tracking-widest uppercase px-1">
                  Kategori Sertifikasi
                </span>

                {[
                  {
                    id: "SEMUA",
                    label: "Semua Sertifikasi",
                    count: certificates.length,
                  },
                  {
                    id: "HALAL",
                    label: "Halal Indonesia",
                    count: certificates.filter((c) => c.type === "HALAL")
                      .length,
                  },
                  {
                    id: "BPOM",
                    label: "BPOM RI MD",
                    count: certificates.filter((c) => c.type === "BPOM").length,
                  },
                  {
                    id: "LAINNYA",
                    label: "Lainnya",
                    count: certificates.filter(
                      (c) => c.type === "SANITASI" || c.type === "HACCP" || c.type === "UMUM",
                    ).length,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 font-jakarta text-xs font-bold text-left cursor-pointer ${
                      activeCategory === tab.id
                        ? "bg-yen-accent text-white border-yen-accent shadow-sm"
                        : "bg-white hover:bg-yen-cream/20 text-yen-dark border-yen-cream/60 hover:border-yen-accent/20"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeCategory === tab.id
                          ? "bg-white/20 text-white"
                          : "bg-yen-cream text-yen-neutral"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Kanan: Grid Kartu Sertifikat (Filtered) */}
          <div className="lg:col-span-3">
            <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCertificates.map((cert) => (
                      <SertifikatCard
                        key={cert.code}
                        cert={cert}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                        setSelectedCert={setSelectedCert}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL SERTIFIKAT DETAIL */}
    </section>
  );
}
