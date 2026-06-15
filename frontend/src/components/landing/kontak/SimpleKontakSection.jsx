import { MessageCircle, Package, ArrowRight } from "lucide-react";

import { whatsappConfig } from "../../../data/whatsappMessage";

export default function SimpleKontakSection() {
  return (
    <section className="bg-yen-white py-24 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-yen-accent text-sm font-bold tracking-widest uppercase mb-2 font-jakarta">HUBUNGI KAMI</h2>
          <h3 className="font-bebas text-5xl md:text-[5.5rem] font-black text-yen-dark leading-[0.9] uppercase">
            Butuh Bantuan <br/> Atau <span className="text-yen-accent">Ingin <br/> Memesan?</span>
          </h3>
          <div className="w-16 h-1 bg-yen-accent mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Card */}
          <div className="bg-[#FAF6F3] rounded-[2rem] p-8 md:p-12 border border-yen-accent/10 shadow-sm">
            <p className="text-yen-dark/80 font-jakarta text-sm md:text-[15px] leading-relaxed mb-10">
              Tim Baso Yen siap membantu memenuhi segala kebutuhan Anda. Mulai dari konsultasi ketersediaan produk, pemesanan eceran untuk disantap bersama keluarga di rumah, hingga kebutuhan penyuplaian partai besar untuk mitra bisnis kuliner Anda.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-black/5 flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-5">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-bold font-jakarta text-yen-dark text-sm mb-3">Layanan Pelanggan Responsif</h4>
                <p className="text-[13px] text-yen-dark/70 font-jakarta leading-relaxed">
                  Tim kami siap membalas pesan dan membantu pertanyaan Anda dengan cepat via WhatsApp.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-black/5 flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-5">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="font-bold font-jakarta text-yen-dark text-sm mb-3">Pemesanan Fleksibel</h4>
                <p className="text-[13px] text-yen-dark/70 font-jakarta leading-relaxed">
                  Melayani pembelian eceran untuk konsumsi pribadi maupun partai besar untuk usaha.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-14 border border-yen-accent/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Orange gradient bar on top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yen-accent to-orange-400"></div>
            
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 border-[6px] border-green-50/50">
              <svg
                className="w-10 h-10 fill-[#25D366]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.51 5.357 1.51 5.467 0 9.911-4.444 9.914-9.913.002-2.65-1.02-5.14-2.877-6.998C17.18 1.9 14.693.882 12.008.882c-5.474 0-9.915 4.446-9.918 9.916-.002 1.879.49 3.714 1.424 5.334l-.955 3.486 3.578-.938zm11.365-7.135c-.3-.15-1.77-.875-2.04-.972-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.225-.65.075-.302-.15-1.276-.47-2.43-1.502-.897-.8-1.502-1.79-1.678-2.09-.178-.3-.02-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.625-.92-2.225-.24-.58-.49-.5-.67-.513-.17-.008-.37-.01-.57-.01-.2 0-.525.075-.8.375-.27.3-1.03 1.01-1.03 2.46s1.07 2.85 1.22 3.05c.15.2 2.11 3.22 5.11 4.517.714.31 1.27.495 1.7.63.717.228 1.368.196 1.884.12.573-.085 1.77-.724 2.02-1.423.25-.7.25-1.3 1.75-1.423.075-.013.15-.025.22-.038z" />
              </svg>
            </div>
            
            <h3 className="font-bebas text-[2.5rem] md:text-5xl font-black text-yen-dark mb-4 tracking-wide uppercase">
              HUBUNGI KAMI SEKARANG
            </h3>
            
            <p className="text-yen-dark/70 font-jakarta text-sm md:text-[15px] leading-relaxed mb-10 max-w-[22rem]">
              Silakan hubungi kami kapan saja. Tim layanan pelanggan kami selalu siap melayani pertanyaan dan pesanan Anda melalui WhatsApp.
            </p>
            
            <a
              href={whatsappConfig.generateContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yen-accent hover:bg-yen-accent/90 text-white font-bold font-jakarta text-sm px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(227,30,36,0.3)] tracking-wider"
            >
              HUBUNGI ADMIN
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
