import { motion } from "framer-motion";
import TentangHero from "../../components/landing/tentang-kami/TentangHero";
import SejarahSection from "../../components/landing/tentang-kami/SejarahSection";
import FasilitasMediaSection from "../../components/landing/tentang-kami/FasilitasMediaSection";
import MisiSection from "../../components/landing/tentang-kami/MisiSection";
import SertifikatMutuSection from "../../components/landing/tentang-kami/SertifikatMutuSection";
import JangkauanLayananSection from "../../components/landing/tentang-kami/JangkauanLayananSection";

export default function TentangKami() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TentangHero />
      <SejarahSection />
      <FasilitasMediaSection />
      <MisiSection />
      <SertifikatMutuSection />
      <JangkauanLayananSection />
    </motion.div>
  );
}
