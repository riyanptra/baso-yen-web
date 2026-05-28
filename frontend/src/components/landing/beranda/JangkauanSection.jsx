import { Link } from "react-router-dom";
import ScrollReveal from "../../ui/ScrollReveal";
import SectionLabel from "../../ui/SectionLabel";
import Button from "../../ui/Button";

// Custom MapPin Component
function MapPin({ top, left, right, name, type = "outlet" }) {
  const isPusat = type === "pusat";
  
  const positionStyle = {
    top: top,
    ...(left ? { left: left } : { right: right })
  };

  return (
    <div
      className="absolute group/pin cursor-pointer z-20"
      style={positionStyle}
    >
      {/* Pulsing indicator under the pin */}
      <span className="absolute -left-1.5 -bottom-0.5 w-3 h-1.5 bg-black/20 rounded-full blur-[1px] transform scale-x-150 transition-all duration-300 group-hover/pin:scale-x-200 group-hover/pin:opacity-40" />
      
      {isPusat ? (
        <>
          {/* Gold pulsing ring */}
          <span className="absolute -left-3 -bottom-3 w-6 h-6 bg-yen-gold/30 rounded-full animate-ping" />
          
          {/* Custom Star Pin */}
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center group-hover/pin:-translate-y-[105%] transition-all duration-300 ease-out">
            <div className="bg-yen-gold text-white p-1.5 sm:p-2 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-colors group-hover/pin:bg-yen-accent duration-300">
              <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            
            {/* Star Premium Pulse ring */}
            <div className="absolute inset-0 -m-1 rounded-full border border-yen-gold/40 animate-pulse pointer-events-none" />
          </div>
        </>
      ) : (
        <>
          {/* Red pulsing ring */}
          <span className="absolute -left-2 -bottom-2 w-4 h-4 bg-yen-accent/30 rounded-full animate-ping" />
          
          {/* Custom Red Pin */}
          <div className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center group-hover/pin:-translate-y-[105%] transition-all duration-300 ease-out">
            <div className="bg-yen-accent text-white p-1.5 sm:p-2 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-colors group-hover/pin:bg-yen-dark duration-300">
              <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Tooltip */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 bg-yen-dark/95 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-jakarta font-semibold tracking-wider px-2.5 py-1 rounded-lg shadow-lg border border-white/10 whitespace-nowrap opacity-0 scale-90 group-hover/pin:opacity-100 group-hover/pin:scale-100 transition-all duration-200 pointer-events-none origin-bottom z-30 flex flex-col items-center gap-0.5 ${
        isPusat ? 'border-yen-gold/40' : ''
      }`}>
        {isPusat && <span className="text-yen-gold font-bebas text-[9px] tracking-widest leading-none">Pusat & Pabrik</span>}
        <span className="leading-none">{name}</span>
      </div>
    </div>
  );
}

export default function JangkauanSection() {
  return (
    <section className="bg-yen-white text-yen-dark py-24 relative overflow-hidden flex flex-col items-center justify-center border-t-2 border-yen-white bg-grid-pattern">
      {/* Decorative glows */}
      <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
      <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />
      <div className="absolute left-[10%] top-[20%] w-[300px] h-[300px] bg-yen-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center w-full">
        <ScrollReveal>
          <SectionLabel variant="bebas" color="accent">
            Jangkauan Pengiriman
          </SectionLabel>
          <h2 className="font-bebas text-4xl sm:text-6xl font-bold text-yen-dark mt-2 mb-8 uppercase leading-[1.05] tracking-tight">
            Siap Melayani Pengiriman
            <br />
            <span className="text-yen-accent block mt-1">
              Seluruh Indonesia
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link to="/kontak">
            <Button variant="primary" size="lg" className="flex items-center gap-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  className="transform rotate-45 origin-center"
                />
              </svg>
              Pesan Pengiriman
            </Button>
          </Link>
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          delay={0.2}
          className="w-full max-w-5xl mt-12"
        >
          {/* Premium Indonesia Map Illustration Card */}
          <div className="relative w-full aspect-video sm:aspect-[2.4/1] rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(227,30,36,0.06)] border border-yen-cream bg-white p-0 mt-8 group">
            <img
              src="/indonesia_map.png"
              alt="Peta Jangkauan Distribusi Baso Yen"
              className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out"
            />

            {/* Custom Interactive Map Pins */}
            <MapPin top="30%" left="25%" name="Sumatera" />
            <MapPin top="55%" left="32%" name="Jabodetabek" />
            <MapPin top="60%" left="45%" name="Bandung" type="pusat" />
            <MapPin top="65%" left="55%" name="Jawa Timur" />
            <MapPin top="35%" right="35%" name="Kalimantan" />
            <MapPin top="50%" right="25%" name="Sulawesi" />
            <MapPin top="65%" right="15%" name="Bali & Nusa Tenggara" />

            {/* Decorative vignette overlay styling */}
            <div className="absolute inset-0 bg-linear-to-t from-white/30 via-transparent to-transparent pointer-events-none rounded-[36px]" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
