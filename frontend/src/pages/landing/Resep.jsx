import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecipes } from "../../hooks/api/useRecipes";
import ResepHero from "../../components/landing/resep/ResepHero";
import ResepGridSection from "../../components/landing/resep/ResepGridSection";

export default function Resep() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Mengambil data resep menggunakan mesin React Query (Otomatis menggunakan Cache)
  const { data: recipes = [], isLoading } = useRecipes();


  const handleSelectRecipe = (recipe) => {
    if (recipe) {
      navigate(`/resep/${recipe.slug}`); // Pindah halaman penuh
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ResepHero />
      <ResepGridSection
        recipes={recipes}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectRecipe={handleSelectRecipe}
      />
    </motion.div>
  );
}
