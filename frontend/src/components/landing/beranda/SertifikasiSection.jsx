import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";
import { homepageCertifications } from "../../../data/certificates";

import logoHalal from "../../../assets/logo-sertifikasi/Logo_Halal.png";
import logoBPOM from "../../../assets/logo-sertifikasi/Logo_Badan_POM.png";
import logoHACCP from "../../../assets/logo-sertifikasi/logo-haccp.png";

const logoMap = {
  halal: logoHalal,
  bpom: logoBPOM,
  haccp: logoHACCP,
};

export default function SertifikasiSection() {

  return (
    <section className="bg-yen-white text-yen-dark py-24 relative overflow-hidden border-t-2 border-yen-white bg-grid-pattern">
      <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
      <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Summary / Guarantee Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <ScrollReveal direction="right">
              <SectionLabel variant="bebas" color="accent">
                Legalitas &amp; Jaminan
              </SectionLabel>
              <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl lg:text-5xl text-yen-dark mt-2 leading-tight">
                Jaminan Mutu &amp; Keamanan Pangan
              </h2>
              <div className="w-16 h-1 bg-yen-accent mt-6 mb-6" />
              <p className="font-jakarta text-yen-neutral text-sm leading-relaxed mb-8">
                Seluruh fasilitas produksi, rantai pasok dingin, dan produk
                olahan Baso Yen telah diaudit secara berkala demi menjamin
                keamanan konsumsi tingkat tinggi, pemenuhan syariat Islam
                (Halal), serta standar mutu pangan nasional.
              </p>

              {/* Trust Seals Badge Box */}
              <div className="p-6 md:p-8 bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] relative overflow-hidden shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)]">
                {/* Ambient decorative glow inside shelf */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yen-accent/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-emerald-500 via-blue-500 to-amber-500 z-10" />
                <span className="relative z-10 font-jakarta font-black text-xs tracking-wider text-yen-accent block mb-4">
                  DIJAMIN OLEH OTORITAS RESMI:
                </span>

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-jakarta text-xs text-yen-dark font-bold">
                      BPJPH Kementerian Agama &amp; LPPOM MUI
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="font-jakarta text-xs text-yen-dark font-bold">
                      Badan Pengawas Obat dan Makanan (BPOM)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="font-jakarta text-xs text-yen-dark font-bold">
                      Hazard Analysis Critical Control Point (HACCP)
                    </span>
                  </div>
                </div>

                {/* Stamp Graphic */}
                <div className="relative z-10 mt-6 pt-6 border-t border-yen-cream flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl select-none">🛡️</span>
                    <span className="font-bebas text-sm tracking-wider text-yen-dark">
                      AMAN &amp; HIGIENIS 100%
                    </span>
                  </div>
                  <span className="text-[10px] font-jakarta font-black text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-full bg-emerald-50">
                    TERVERIFIKASI
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT COLUMN: Point-by-Point Key Certifications */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="left">
              <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden space-y-6">
                {/* Ambient decorative glow inside shelf */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />

                {homepageCertifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="relative z-10 bg-white p-6 border-2 border-yen-cream hover:border-yen-accent/25 rounded-[24px] shadow-[0_12px_32px_rgba(30,27,26,0.10)] hover:shadow-[0_20px_40px_rgba(227,30,36,0.18)] transition-all duration-300 flex flex-col md:flex-row gap-5 items-start group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white border border-yen-cream p-1 overflow-hidden shadow-xs animate-none">
                      <img
                        src={logoMap[cert.logoKey]}
                        alt={cert.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-[10px] font-jakarta font-black tracking-wider text-white px-2.5 py-0.5 rounded-full uppercase ${cert.badgeColor}`}>
                          {cert.badge}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] font-jakarta font-black px-2 py-0.5 rounded-full border ${cert.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${cert.dotColor}`} />
                          {cert.status}
                        </span>
                      </div>
                      <h3 className="font-jakarta font-extrabold text-lg text-yen-dark">
                        {cert.title}
                      </h3>
                      <p className="font-jakarta text-xs text-yen-neutral leading-relaxed">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link to Tentang Kami */}
              <div className="pt-6 text-right">
                <a
                  href="/tentang-kami"
                  className="inline-flex items-center gap-2 text-xs font-bold text-yen-accent hover:text-yen-dark hover:underline transition-all duration-300 relative z-10"
                >
                  <span>
                    Lihat detail registrasi & lembar dokumen sertifikat lengkap
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
