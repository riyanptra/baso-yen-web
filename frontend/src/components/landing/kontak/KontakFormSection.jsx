import { useState } from "react";
import ScrollReveal from "../../ui/ScrollReveal";
import Button from "../../ui/Button";
import axiosInstance from "../../../lib/axios";

export default function KontakFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Mengirimkan isi pesan formulir Kontak (Kirim Pesan) ke backend API.
   * Menampilkan proses loading saat menunggu balasan dan memberikan pesan peringatan berhasil/gagal via alert.
   * @param {object} e - Event form (DOM) untuk mencegah reload halaman (e.preventDefault)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/messages/contact", formData);
      alert("Pesan Anda telah berhasil dikirim! Tim marketing kami akan membalas via email atau WhatsApp secepatnya.");
      setFormData({ name: "", email: "", phone: "", content: "" });
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollReveal direction="right" className="lg:col-span-5 w-full">
      <div className="bg-yen-dark p-8 md:p-10 border-2 border-yen-dark rounded-[32px] shadow-[0_20px_50px_rgba(30,27,26,0.3)] relative overflow-hidden group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yen-gold/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* Playful top right badge sticker */}
        <div className="absolute top-0 right-8 bg-yen-accent text-white font-bebas text-[10px] tracking-widest px-4 py-2 rounded-b-[12px] shadow-lg uppercase group-hover:py-3 transition-all duration-300">
          Fast Response ⚡
        </div>

        <div className="relative z-10">
          <h3 className="font-bebas text-4xl sm:text-5xl text-yen-white mb-2 text-left uppercase">
            Kirim Pesan
          </h3>
          <p className="font-jakarta text-xs text-yen-cream/60 text-left mb-10 max-w-sm leading-relaxed">
            Punya pertanyaan seputar produk, reseller, atau kritik saran? Tim
            layanan pelanggan kami siap membantu Anda.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Name Input Box */}
            <div>
              <label className="font-bebas text-[10px] tracking-widest text-yen-cream/70 block mb-2">
                NAMA LENGKAP
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nama Lengkap Anda..."
                className="w-full px-5 py-4 rounded-[16px] bg-white/5 border-2 border-white/10 text-white placeholder-white/20 focus:border-yen-accent focus:bg-white/10 focus:outline-none transition-all duration-300 font-jakarta text-xs"
              />
            </div>

            {/* Email Input Box */}
            <div>
              <label className="font-bebas text-[10px] tracking-widest text-yen-cream/70 block mb-2">
                EMAIL SUREL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email aktif Anda..."
                className="w-full px-5 py-4 rounded-[16px] bg-white/5 border-2 border-white/10 text-white placeholder-white/20 focus:border-yen-accent focus:bg-white/10 focus:outline-none transition-all duration-300 font-jakarta text-xs"
              />
            </div>

            {/* Phone Input Box */}
            <div>
              <label className="font-bebas text-[10px] tracking-widest text-yen-cream/70 block mb-2">
                NOMOR KONTAK
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Nomor WhatsApp aktif..."
                className="w-full px-5 py-4 rounded-[16px] bg-white/5 border-2 border-white/10 text-white placeholder-white/20 focus:border-yen-accent focus:bg-white/10 focus:outline-none transition-all duration-300 font-jakarta text-xs"
              />
            </div>

            {/* Message Textarea Box */}
            <div>
              <label className="font-bebas text-[10px] tracking-widest text-yen-cream/70 block mb-2">
                ISI PESAN ANDA
              </label>
              <textarea
                rows={4}
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                className="w-full px-5 py-4 rounded-[16px] bg-white/5 border-2 border-white/10 text-white placeholder-white/20 focus:border-yen-accent focus:bg-white/10 focus:outline-none transition-all duration-300 font-jakarta text-xs resize-none"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full py-4 rounded-xl font-bebas text-sm tracking-wider uppercase shadow-[0_8px_20px_rgba(227,30,36,0.3)] hover:shadow-[0_12px_25px_rgba(227,30,36,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim Pesan..." : "Kirim Pesan Sekarang ✉️"}
              </Button>
            </div>

            {/* Marketplace Divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-bebas text-[10px] tracking-widest text-yen-cream/40 uppercase">
                atau belanja langsung di
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Marketplace Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Shopee */}
              <a
                href="https://shopee.co.id/basoyen_official"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-[16px] font-bebas text-xs tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                style={{ background: "linear-gradient(135deg, #EE4D2D, #FF7337)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" />
                  <path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
                  <path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
                </svg>
                Shopee
              </a>

              {/* Tokopedia */}
              <a
                href="https://www.tokopedia.com/basoyen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-[16px] font-bebas text-xs tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                style={{ background: "linear-gradient(135deg, #03AC0E, #029B0D)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8V6a4 4 0 0 0-8 0v2H5v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h-3zm-6-2a2 2 0 0 1 4 0v2h-4V6z" fill="white" />
                  <circle cx="9" cy="14" r="1.2" fill="#03AC0E" />
                  <circle cx="15" cy="14" r="1.2" fill="#03AC0E" />
                  <path d="M12 14.5l-1.5 2h3z" fill="#FF9800" />
                </svg>
                Tokopedia
              </a>
            </div>
          </form>

        </div>
      </div>
    </ScrollReveal>
  );
}
