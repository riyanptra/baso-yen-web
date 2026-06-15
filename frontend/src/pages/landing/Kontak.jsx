import { motion } from "framer-motion";
import KontakHero from "../../components/landing/kontak/KontakHero";
import SimpleKontakSection from "../../components/landing/kontak/SimpleKontakSection";

export default function Kontak() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <KontakHero />
      <SimpleKontakSection />
    </motion.div>
  );
}
