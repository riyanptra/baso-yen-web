import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-center floating-buttons-container transition-all duration-300">
      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 bg-[#12100F] hover:bg-yen-accent text-white rounded-full flex items-center justify-center border-2 border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer group relative ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        title="Kembali ke Atas"
      >
        <svg
          className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-14 bg-[#12100F] text-yen-cream text-xs font-jakarta font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
          Kembali Ke Atas
        </span>
      </button>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/6281223700010"
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer group relative z-50"
        title="Hubungi Kami via WhatsApp"
      >
        {/* Pulse ring effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.666.988 3.396 1.51 5.357 1.51 5.467 0 9.911-4.444 9.914-9.913.002-2.65-1.02-5.14-2.877-6.998C17.18 1.9 14.693.882 12.008.882c-5.474 0-9.915 4.446-9.918 9.916-.002 1.879.49 3.714 1.424 5.334l-.955 3.486 3.578-.938zm11.365-7.135c-.3-.15-1.77-.875-2.04-.972-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.225-.65.075-.302-.15-1.276-.47-2.43-1.502-.897-.8-1.502-1.79-1.678-2.09-.178-.3-.02-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.67-1.625-.92-2.225-.24-.58-.49-.5-.67-.513-.17-.008-.37-.01-.57-.01-.2 0-.525.075-.8.375-.27.3-1.03 1.01-1.03 2.46s1.07 2.85 1.22 3.05c.15.2 2.11 3.22 5.11 4.517.714.31 1.27.495 1.7.63.717.228 1.368.196 1.884.12.573-.085 1.77-.724 2.02-1.423.25-.7.25-1.3 1.75-1.423.075-.013.15-.025.22-.038z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-15 bg-[#12100F] text-yen-cream text-xs font-jakarta font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md border border-white/10">
          Chat WhatsApp Kami
        </span>
      </a>
    </div>
  );
}
