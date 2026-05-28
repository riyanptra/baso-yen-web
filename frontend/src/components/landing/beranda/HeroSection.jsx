import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  // Animasi Hero Text
  const heroTextContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const heroTextItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-yen-dark pt-28 pb-24 md:py-24">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 bg-no-repeat"
        style={{
          backgroundImage: `url('/bg-herosection.jpg')`,
        }}
      />
      {/* Dark overlay to make the photo darker and enhance text readability */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      <div className="relative z-20 max-w-4xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center justify-center">
        <motion.div
          variants={heroTextContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center space-y-6"
        >
          {/* Subtitle / Top Header Label */}
          <motion.p
            variants={heroTextItem}
            className="font-jakarta text-xs sm:text-sm tracking-[0.25em] font-extrabold text-yen-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          >
            BAKSO • MIE BASAH • SOSIS SAPI PREMIUM KHAS BANDUNG
          </motion.p>

          {/* Premium Main Heading (Solid White, Bubbly Fredoka Font, Drop Shadow) */}
          <motion.h1
            variants={heroTextItem}
            className="font-bebas text-5xl sm:text-7xl md:text-[84px] text-yen-white leading-[0.95] tracking-tight uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] text-center"
          >
            SAJIAN PRAKTIS, <br />
            ISTIMEWA SELALU
          </motion.h1>

          {/* Helper Badge / Tagline */}
          <motion.p
            variants={heroTextItem}
            className="font-jakarta text-[11px] sm:text-xs tracking-[0.2em] font-bold text-yen-white/95 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-xl"
          >
            100% Halal, Higienis, & Tanpa Pengawet Buatan
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            variants={heroTextItem}
            className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full"
          >
            <Link to="/produk">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="bg-yen-accent hover:bg-yen-dark text-yen-white border-none font-bebas tracking-widest rounded-full px-8 py-3.5 text-sm uppercase shadow-lg cursor-pointer transition-all duration-300"
              >
                Lihat Produk
              </motion.button>
            </Link>
            <Link to="/kontak">
              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                className="bg-transparent hover:bg-white/10 text-yen-white border border-white/50 font-bebas tracking-widest rounded-full px-8 py-3.5 text-sm uppercase shadow-lg cursor-pointer transition-all duration-300"
              >
                Hubungi Kami
              </motion.button>
            </Link>
          </motion.div>

          {/* Mini Helper Text below buttons */}
          <motion.p
            variants={heroTextItem}
            className="font-jakarta text-[10px] sm:text-[11px] tracking-wider text-yen-white/80 uppercase font-semibold mt-2 drop-shadow-sm"
          >
            Percayakan kepada kami
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Ticker/Marquee Banner at the bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-yen-dark border-t border-b border-white/10 py-3.5 overflow-hidden whitespace-nowrap select-none z-20 flex">
        <div className="animate-marquee whitespace-nowrap font-bebas text-yen-white text-xs sm:text-sm tracking-[0.22em] uppercase flex shrink-0">
          <span className="px-4">
            SAJIAN PRAKTIS ISTIMEWA SELALU • BASO YEN BANDUNG • 100% HALAL &
            PREMIUM • FOOD THAT FITS YOU
          </span>
          <span className="px-4">
            SAJIAN PRAKTIS ISTIMEWA SELALU • BASO YEN BANDUNG • 100% HALAL &
            PREMIUM • FOOD THAT FITS YOU
          </span>
        </div>
        <div className="animate-marquee whitespace-nowrap font-bebas text-yen-white text-xs sm:text-sm tracking-[0.22em] uppercase flex shrink-0">
          <span className="px-4">
            SAJIAN PRAKTIS ISTIMEWA SELALU • BASO YEN BANDUNG • 100% HALAL &
            PREMIUM • FOOD THAT FITS YOU
          </span>
          <span className="px-4">
            SAJIAN PRAKTIS ISTIMEWA SELALU • BASO YEN BANDUNG • 100% HALAL &
            PREMIUM • FOOD THAT FITS YOU
          </span>
        </div>
      </div>
    </section>
  );
}
