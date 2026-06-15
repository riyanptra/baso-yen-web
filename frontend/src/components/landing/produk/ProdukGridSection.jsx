import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../ui/Button";

function ProductImage({ src, alt, category }) {
  const [hasError, setHasError] = useState(false);

  const getIcon = (cat) => {
    if (!cat) return "🏺";
    const lower = cat.toLowerCase();
    if (lower.includes("bakso") || lower.includes("baso")) return "🍲";
    if (lower.includes("mie")) return "🍜";
    if (lower.includes("sosis")) return "🌭";
    if (lower.includes("pangsit")) return "🥟";
    return "🏺";
  };

  if (hasError || !src) {
    const getGradient = (cat) => {
      if (!cat) return "from-[#FAF9F6] to-[#EFECE6] text-[#4A4543]";
      const lower = cat.toLowerCase();
      if (lower.includes("bakso") || lower.includes("baso")) return "from-[#FFEDE3] to-[#FFD8C6] text-[#E31E24]";
      if (lower.includes("mie")) return "from-[#FFF5E6] to-[#FFE2B7] text-[#FF8800]";
      if (lower.includes("sosis")) return "from-[#FFEBEC] to-[#FFCCD1] text-[#E31E24]";
      if (lower.includes("pangsit")) return "from-[#FFF9E6] to-[#FFF0C2] text-[#FFB000]";
      return "from-[#F3F4F6] to-[#E5E7EB] text-[#4B5563]";
    };
    const gradient = getGradient(category);

    return (
      <div
        className={`w-full h-full bg-linear-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center select-none`}
      >
        <div className="text-5xl filter drop-shadow-md mb-2">
          {getIcon(category)}
        </div>
        <span className="font-bebas text-[11px] tracking-widest uppercase opacity-70">
          {category}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
    />
  );
}

const ProductCard = ({ product, onSelectProduct }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-yen-cream p-6 flex flex-col justify-between shadow-[0_12px_35px_rgba(30,27,26,0.15)] hover:shadow-[0_20px_45px_rgba(227,30,36,0.25)] hover:border-yen-accent/30 transition-all duration-500 rounded-[28px] relative group overflow-hidden"
  >
    {/* Soft inner glow decorator */}
    <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#FAF9F7]/30 pointer-events-none rounded-[28px]" />

    <div className="relative z-10 flex-1 flex flex-col">
      {/* Image Container with high style */}
      <div className="aspect-[16/11] bg-[#FFF6F0] border border-yen-cream/50 flex items-center justify-center rounded-[20px] mb-5 relative overflow-hidden group">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
        />

        {/* Float Category Badge */}
        <span className="absolute bottom-3.5 left-3.5 bg-yen-dark/85 backdrop-blur-xs text-white font-jakarta font-black text-[9px] tracking-widest px-3 py-1 rounded-full uppercase shadow-md z-10 select-none">
          {(() => {
             const c = (product.category || "").toLowerCase();
             if (c.includes("mie")) return "Mie Basah";
             if (c.includes("sosis")) return "Sosis Sapi";
             if (c.includes("pangsit")) return "Kulit Pangsit";
             return product.category;
          })()}
        </span>

        {/* Dynamic Badge sticker */}
        {product.badge && product.badge  && (
          <span className="absolute top-3.5 right-3.5 bg-yen-accent text-white font-jakarta font-black text-[9px] tracking-widest px-3 py-1.5 rounded-full uppercase shadow-md z-20 select-none flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            {product.badge.toUpperCase()}
          </span>
        )}
      </div>

      {/* Text area */}
      <div className="space-y-2 flex-1 flex flex-col">
        <h3 className="font-jakarta font-black text-lg text-yen-dark group-hover:text-yen-accent transition-colors duration-300 line-clamp-1 leading-tight tracking-tight">
          {product.name}
        </h3>
        <p className="font-jakarta text-xs text-yen-neutral leading-relaxed line-clamp-2 text-justify">
          {product.description}
        </p>
      </div>
    </div>

    {/* Footer and CTA button */}
    <div className="pt-5 border-t border-yen-cream/60 mt-5 flex justify-between items-center relative z-10">
      <div className="text-left">
        <span className="text-[9px] font-bebas tracking-wider text-yen-neutral/50 block">
          KEMASAN
        </span>
        <span className="font-jakarta font-black text-xs text-yen-gold uppercase tracking-wide">
          {product.pack}
        </span>
      </div>
      <Button
        variant="accent"
        size="sm"
        onClick={() => onSelectProduct(product)}
        className="rounded-full font-bebas text-xs tracking-wider"
      >
        Detail Produk
      </Button>
    </div>
  </motion.div>
);

const ITEMS_PER_PAGE = 6;

export default function ProdukGridSection({
  products = [],
  isLoading = false,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const categoryItems = [
    { id: "All", label: "Semua", icon: "🍽️" },
    { id: "Bakso", label: "Bakso", icon: "🍲" },
    { id: "Mie Basah", label: "Mie Basah", icon: "🍜" },
    { id: "Sosis Sapi", label: "Sosis Sapi", icon: "🌭" },
    { id: "Kulit Pangsit", label: "Kulit Pangsit", icon: "🥟" },
    { id: "Lainnya", label: "Lainnya", icon: "🏺" },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => {
          const catStr = (p.category || "").toLowerCase();
          const filterStr = selectedCategory.toLowerCase();
          
          if (filterStr === "bakso") return catStr.includes("bakso") || catStr.includes("baso");
          if (filterStr === "mie basah") return catStr.includes("mie");
          if (filterStr === "sosis sapi") return catStr.includes("sosis");
          if (filterStr === "kulit pangsit") return catStr.includes("pangsit") || catStr.includes("kulit");
          if (filterStr === "lainnya") return !["bakso", "baso", "mie", "sosis", "pangsit", "kulit"].some(k => catStr.includes(k));
          
          return catStr.includes(filterStr);
        });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll back up to the grid section
    document
      .getElementById("produk-grid-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-yen-white py-20 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
          {/* Ambient decorative glow inside shelf */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Category Filter Pills */}
            <div className="mb-16">
              <div className="flex sm:flex-wrap sm:justify-center items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-1 px-1">
                {categoryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryChange(item.id)}
                    className={` shrink-0 flex items-center gap-2 px-5 py-2.5 font-jakarta font-black text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 rounded-full ${
                      selectedCategory === item.id
                        ? "bg-yen-accent text-yen-white border-2 border-yen-accent shadow-[0_4px_16px_rgba(227,30,36,0.18)] hover:shadow-[0_6px_20px_rgba(227,30,36,0.25)] -translate-y-0.5"
                        : "bg-[#FCFAF8] text-yen-dark border-2 border-yen-cream shadow-[0_2px_8px_rgba(30,27,26,0.06)] hover:shadow-[0_4px_12px_rgba(30,27,26,0.10)] hover:bg-yen-dark hover:text-yen-white hover:border-yen-dark hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="text-sm select-none">{item.icon}</span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Produk */}
            <div id="produk-grid-section" />
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-yen-cream border-t-yen-accent rounded-full animate-spin"></div>
                <p className="font-jakarta font-bold tracking-wider text-yen-neutral">Menyiapkan Etalase Produk...</p>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-20 font-jakarta text-yen-neutral">
                Maaf, belum ada produk di kategori ini.
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={onSelectProduct}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  ),
                )}

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
          </div>
        </div>
      </div>
    </section>
  );
}
