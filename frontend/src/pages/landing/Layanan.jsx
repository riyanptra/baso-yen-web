import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LayananHero from "../../components/landing/layanan/LayananHero";
import LayananB2C from "../../components/landing/layanan/LayananB2C";
import LayananB2B from "../../components/landing/layanan/LayananB2B";

export default function Layanan() {
  const [activeTab, setActiveTab] = useState("b2c"); // 'b2c' atau 'b2b'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <LayananHero />

      {/* TABS CONTAINER */}
      <section className="bg-yen-white py-24 bg-grid-pattern">
        <div className="absolute top-12 left-12 w-6 h-6 bg-yen-accent/10 rounded-full z-0" />
        <div className="absolute bottom-16 right-16 w-8 h-8 bg-yen-gold/10 rounded-full z-0" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Tab Pill Selector */}
          <div className="flex justify-center mb-16">
            <div className="bg-[#FCFAF8] p-2 border-2 border-yen-cream rounded-full flex gap-2 shadow-[0_4px_20px_rgba(30,27,26,0.12)]">
              <button
                onClick={() => setActiveTab("b2c")}
                className={`px-8 py-3 rounded-full font-jakarta font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "b2c"
                    ? "bg-yen-accent text-white shadow-[0_6px_20px_rgba(227,30,36,0.35)]"
                    : "text-yen-dark hover:bg-yen-cream/35"
                }`}
              >
                Retail (B2C)
              </button>
              <button
                onClick={() => setActiveTab("b2b")}
                className={`px-8 py-3 rounded-full font-jakarta font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "b2b"
                    ? "bg-yen-accent text-white shadow-[0_6px_20px_rgba(227,30,36,0.35)]"
                    : "text-yen-dark hover:bg-yen-cream/35"
                }`}
              >
                Kemitraan Bisnis (B2B)
              </button>
            </div>
          </div>

          {/* TAB CONTENT PANEL */}
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === "b2c" ? (
                  <LayananB2C key="b2c" />
                ) : (
                  <LayananB2B key="b2b" />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
