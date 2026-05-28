import { motion } from "framer-motion";
import KontakHero from "../../components/landing/kontak/KontakHero";
import KontakFormSection from "../../components/landing/kontak/KontakFormSection";
import KontakInfoSection from "../../components/landing/kontak/KontakInfoSection";
import KontakMapSection from "../../components/landing/kontak/KontakMapSection";

export default function Kontak() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <KontakHero />

      {/* 2 COLUMN LAYOUT */}
      <section className="bg-yen-white py-24 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <KontakFormSection />
            <KontakInfoSection />
          </div>
        </div>
        <KontakMapSection />
      </section>
    </motion.div>
  );
}
