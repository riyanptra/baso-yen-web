import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../../ui/ScrollReveal";

function ArticleImage({ src, alt, category }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const getGradient = (cat) => {
      const lower = (cat || "").toLowerCase();
      if (lower.includes("tips") || lower.includes("trik")) return "from-[#FFEDE3] to-[#FFD8C6] text-[#E31E24]";
      if (lower.includes("kuliner")) return "from-[#FFF5E6] to-[#FFE2B7] text-[#FF8800]";
      if (lower.includes("edukasi")) return "from-[#F1EAFF] to-[#E1D0FF] text-[#8B5CF6]";
      return "from-[#FAF9F6] to-[#EFECE6] text-[#4A4543]";
    };
    const gradient = getGradient(category);
    
    const getIcon = (cat) => {
      const lower = (cat || "").toLowerCase();
      if (lower.includes("tips") || lower.includes("trik")) return "💡";
      if (lower.includes("kuliner")) return "🍜";
      return "📚";
    };
    
    const getLabel = (cat) => {
      const lower = (cat || "").toLowerCase();
      if (lower.includes("tips") || lower.includes("trik")) return "Tips & Trik";
      if (lower.includes("kuliner")) return "Kuliner";
      if (lower.includes("edukasi")) return "Edukasi";
      return cat;
    };

    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center select-none`}
      >
        <div className="text-4xl filter drop-shadow-md mb-2">
          {getIcon(category)}
        </div>
        <span className="font-bebas text-[10px] tracking-widest uppercase opacity-70">
          {getLabel(category)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
    />
  );
}

const ArticleCard = ({ article, onSelectArticle, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
    className="bg-white border border-yen-cream p-6 flex flex-col justify-between shadow-[0_12px_35px_rgba(30,27,26,0.15)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.25)] hover:border-yen-accent/30 transition-all duration-500 rounded-[28px] relative group overflow-hidden min-h-[480px]"
  >
    {/* Soft inner glow decorator */}
    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#FAF9F7]/30 pointer-events-none rounded-[28px]" />

    <div className="relative z-10 flex-1 flex flex-col">
      {/* Visual Thumbnail */}
      <div className="aspect-[16/11] bg-[#FFF6F0] border border-yen-cream/50 flex items-center justify-center rounded-[20px] mb-5 relative overflow-hidden group">
        <ArticleImage
          src={article.image}
          alt={article.title}
          category={article.category}
        />

        {/* Float Category Badge */}
        <span
          className={`absolute top-3.5 left-3.5 text-[9px] font-jakarta font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md select-none ${
            (article.category || "").toLowerCase().includes("tips")
              ? "bg-emerald-500 text-white"
              : (article.category || "").toLowerCase().includes("kuliner")
                ? "bg-amber-500 text-white"
                : "bg-indigo-600 text-white"
          }`}
        >
          {(() => {
             const c = (article.category || "").toLowerCase();
             if (c.includes("tips") || c.includes("trik")) return "Tips & Trik";
             if (c.includes("kuliner")) return "Kuliner";
             if (c.includes("edukasi")) return "Edukasi";
             return article.category;
          })()}
        </span>
      </div>

      {/* Meta Date & Author */}
      <div className="flex items-center gap-2 text-[10px] font-jakarta font-bold text-yen-neutral/60 mb-2.5">
        <span>{article.date}</span>
        <span>•</span>
        <span>Oleh {article.author}</span>
      </div>

      {/* Title */}
      <h3
        className="font-jakarta font-black text-lg text-yen-dark mb-3 leading-snug line-clamp-2 hover:text-yen-accent transition-colors duration-300 cursor-pointer tracking-tight"
        onClick={() => onSelectArticle(article)}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="font-jakarta text-xs text-yen-neutral leading-relaxed line-clamp-3 text-justify mb-4">
        {article.excerpt}
      </p>
    </div>

    {/* Footer Row */}
    <div className="pt-5 border-t border-yen-cream/60 mt-5 flex items-center justify-between relative z-10">
      <button
        onClick={() => onSelectArticle(article)}
        className="group/btn flex items-center gap-1.5 text-yen-dark hover:text-yen-accent font-bebas text-xs tracking-widest transition-colors duration-300 cursor-pointer"
      >
        Selengkapnya
        <svg
          className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-300 text-yen-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>

      <span className="font-bebas text-[9px] tracking-wider text-yen-neutral/40">
        BASO YEN
      </span>
    </div>
  </motion.div>
);

const ITEMS_PER_PAGE = 6;

export default function RegularArticlesGrid({ articles, onSelectArticle }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document
      .getElementById("artikel-grid-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ScrollReveal className="w-full">
      <div id="artikel-grid-section" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedArticles.map((article, idx) => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelectArticle={onSelectArticle}
            idx={idx}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-yen-cream bg-[#FCFAF8] text-yen-dark font-jakarta font-black text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-yen-dark hover:enabled:text-white hover:enabled:border-yen-dark shadow-[0_2px_8px_rgba(30,27,26,0.06)]"
            aria-label="Halaman sebelumnya"
          >
            ‹
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-jakarta font-black text-sm transition-all duration-200 ${
                page === currentPage
                  ? "bg-yen-accent text-white border-yen-accent shadow-[0_4px_16px_rgba(227,30,36,0.18)]"
                  : "bg-[#FCFAF8] text-yen-dark border-yen-cream shadow-[0_2px_8px_rgba(30,27,26,0.06)] hover:bg-yen-dark hover:text-white hover:border-yen-dark"
              }`}
              aria-label={`Halaman ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-yen-cream bg-[#FCFAF8] text-yen-dark font-jakarta font-black text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-yen-dark hover:enabled:text-white hover:enabled:border-yen-dark shadow-[0_2px_8px_rgba(30,27,26,0.06)]"
            aria-label="Halaman berikutnya"
          >
            ›
          </button>
        </div>
      )}
    </ScrollReveal>
  );
}
