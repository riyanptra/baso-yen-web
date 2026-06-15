import { motion } from "framer-motion";

// Import modular section components
import HeroSection from "../../components/landing/beranda/HeroSection";
import TentangSingkatSection from "../../components/landing/beranda/TentangSingkatSection";
import MitraSection from "../../components/landing/beranda/MitraSection";

import KeunggulanSection from "../../components/landing/beranda/KeunggulanSection";
import ProdukUnggulanSection from "../../components/landing/beranda/ProdukUnggulanSection";
import TestimoniSection from "../../components/landing/beranda/TestimoniSection";
import SertifikasiSection from "../../components/landing/beranda/SertifikasiSection";
import LayananSection from "../../components/landing/beranda/LayananSection";
import JangkauanSection from "../../components/landing/beranda/JangkauanSection";
import FotoGaleriSection from "../../components/landing/beranda/FotoGaleriSection";

export default function Beranda() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <TentangSingkatSection />
      <MitraSection />
      <TestimoniSection />
      <KeunggulanSection />
      <ProdukUnggulanSection />
      <LayananSection />
      <SertifikasiSection />
      <JangkauanSection />
      <FotoGaleriSection />
    </motion.div>
  );
}
