import { useState } from "react";
import ScrollReveal from "../../ui/ScrollReveal";
import Button from "../../ui/Button";

function ArticleImage({ src, alt, category }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const bgGradients = {
      "Tips & Trik": "from-[#FFEDE3] to-[#FFD8C6] text-[#E31E24]",
      "Kuliner": "from-[#FFF5E6] to-[#FFE2B7] text-[#FF8800]",
      "Edukasi": "from-[#F1EAFF] to-[#E1D0FF] text-[#8B5CF6]",
    };
    const gradient = bgGradients[category] || "from-[#FAF9F6] to-[#EFECE6] text-[#4A4543]";

    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center select-none`}>
        <div className="text-5xl filter drop-shadow-md mb-2">
          {category === "Tips & Trik" ? "💡" : category === "Kuliner" ? "🍜" : "📚"}
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
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
    />
  );
}

export default function FeaturedArticle({ article, onSelectArticle }) {
  if (!article) return null;

  return (
    <ScrollReveal className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white border border-yen-cream overflow-hidden shadow-[0_20px_50px_rgba(30,27,26,0.1)] hover:shadow-[0_24px_60px_rgba(227,30,36,0.12)] hover:border-yen-accent/30 transition-all duration-500 rounded-[32px] group">
        {/* Visual Thumbnail */}
        <div className="lg:col-span-7 aspect-[16/10] bg-[#FFF6F0] relative overflow-hidden">
          <div className="w-full h-full">
            <ArticleImage
              src={article.image}
              alt={article.title}
              category={article.category}
            />
          </div>
          
          {/* Overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-6 left-6 z-10 flex gap-2">
            <span className="bg-yen-accent text-white font-jakarta font-black text-[9px] tracking-widest px-3.5 py-1.5 rounded-full uppercase shadow-md select-none">
              ARTIKEL TERBARU
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white to-[#FCFAF7] relative">
          {/* Background watermark */}
          <div className="absolute right-4 bottom-4 font-bebas text-7xl text-yen-dark/[0.02] tracking-widest select-none pointer-events-none uppercase">
            YEN NEWS
          </div>

          <div className="space-y-5 relative z-10">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-jakarta font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-xs select-none ${
                article.category === "Tips & Trik" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                article.category === "Kuliner" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                "bg-indigo-50 text-indigo-600 border border-indigo-100"
              }`}>
                {article.category}
              </span>
            </div>

            <h2
              className="font-jakarta font-black text-2xl sm:text-3xl text-yen-dark leading-tight hover:text-yen-accent transition-colors duration-300 cursor-pointer tracking-tight"
              onClick={() => onSelectArticle(article)}
            >
              {article.title}
            </h2>

            <div className="flex items-center gap-2.5 text-[11px] font-jakarta font-semibold text-yen-neutral/70">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yen-accent/65" />
                Oleh <span className="font-bold text-yen-dark">{article.author}</span>
              </span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            <p className="font-jakarta text-xs sm:text-sm text-yen-neutral leading-relaxed text-justify">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-yen-cream/60 mt-8 flex items-center justify-between relative z-10">
            <Button
              variant="accent"
              size="sm"
              onClick={() => onSelectArticle(article)}
              className="rounded-full font-bebas text-xs tracking-wider"
            >
              Baca Selengkapnya
            </Button>

            <span className="font-bebas text-[10px] tracking-wider text-yen-neutral/40">
              EST. 1988
            </span>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

