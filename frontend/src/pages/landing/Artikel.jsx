// No useState needed
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useArticles } from "../../hooks/api/useArticles";
import ArtikelHero from "../../components/landing/artikel/ArtikelHero";
import FeaturedArticle from "../../components/landing/artikel/FeaturedArticle";
import RegularArticlesGrid from "../../components/landing/artikel/RegularArticlesGrid";

export default function Artikel() {
  const navigate = useNavigate();

  // Mengambil data artikel menggunakan mesin React Query (Otomatis menggunakan Cache)
  const { data: articlesList = [], isLoading } = useArticles();

  const handleSelectArticle = (article) => {
    if (article) {
      navigate(`/article/${article.slug}`); // Langsung buka halaman penuh
    }
  };

  // Pisahkan artikel pertama sebagai featured, sisanya reguler
  const featuredArticle = articlesList[0];
  const regularArticles = articlesList.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ArtikelHero />

      {/* EDITORIAL MAGAZINE GRID */}
      <section className="bg-yen-white py-24 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-12">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-yen-cream border-t-yen-accent rounded-full animate-spin"></div>
                  <p className="font-jakarta font-bold tracking-wider text-yen-neutral">Menyiapkan Berita Terbaru...</p>
                </div>
              ) : articlesList.length === 0 ? (
                <div className="text-center py-20 font-jakarta text-yen-neutral">
                  Belum ada artikel yang diterbitkan.
                </div>
              ) : (
                <>
                  <FeaturedArticle
                    article={featuredArticle}
                    onSelectArticle={handleSelectArticle}
                  />
                  {regularArticles.length > 0 && (
                    <RegularArticlesGrid
                      articles={regularArticles}
                      onSelectArticle={handleSelectArticle}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
