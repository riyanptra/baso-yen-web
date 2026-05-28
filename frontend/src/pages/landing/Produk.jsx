import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/api/useProducts";
import ProdukHero from "../../components/landing/produk/ProdukHero";
import ProdukGridSection from "../../components/landing/produk/ProdukGridSection";
import ProdukMarketplaceSection from "../../components/landing/produk/ProdukMarketplaceSection";

export default function Produk() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mengambil data produk menggunakan mesin React Query (Otomatis menggunakan Cache)
  const { data: products = [], isLoading } = useProducts();

  const handleSelectProduct = (product) => {
    if (product) {
      navigate(`/produk/${product.slug}`); // Langsung loncat ke halaman penuh
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ProdukHero />
      <ProdukGridSection
        products={products}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectProduct={handleSelectProduct}
      />
      <ProdukMarketplaceSection />
    </motion.div>
  );
}

