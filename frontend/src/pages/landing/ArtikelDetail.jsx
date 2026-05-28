import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useArticles } from "../../hooks/api/useArticles";
import SocialShare from "../../components/ui/SocialShare";
import SEO from "../../components/ui/SEO";

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
      <div className={`w-full h-full bg-linear-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center select-none`}>
        <div className="text-5xl filter drop-shadow-md mb-2">
          {category === "Tips & Trik" ? "💡" : category === "Kuliner" ? "🍜" : "📚"}
        </div>
        <span className="font-bebas text-sm tracking-widest uppercase opacity-70">
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
      className="w-full h-full object-cover"
    />
  );
}

export default function ArtikelDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mengambil data dari React Query
  const { data: allArticles = [], isLoading } = useArticles();
  
  // Mencari artikel yang cocok dengan slug
  const article = allArticles.find((a) => a.slug === slug);

  // Jika artikel tidak ditemukan (dan proses loading sudah selesai), tendang kembali ke daftar
  useEffect(() => {
    if (!isLoading && !article) {
      navigate("/article", { replace: true });
    }
  }, [isLoading, article, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-yen-white pt-32 pb-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-yen-cream border-t-yen-accent rounded-full animate-spin"></div>
        <p className="font-jakarta font-bold tracking-wider text-yen-neutral">Menyiapkan Artikel...</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <>
      <SEO 
        title={article.title} 
        description={`Baca artikel informatif tentang ${article.title} dari Baso Yen.`}
        image={article.image}
        url={`/article/${slug}`}
        isExactTitle={false}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-yen-white pt-24 pb-20 relative overflow-hidden bg-grid-pattern"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yen-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <button
          onClick={() => navigate("/article")}
          className="flex items-center gap-2 text-yen-neutral hover:text-yen-accent font-jakarta text-sm font-bold mb-8 transition-colors group cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Kembali ke Daftar Artikel
        </button>

        <div className="bg-white border border-yen-cream rounded-[36px] p-8 md:p-14 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.1)]">
          
          {/* Header info (Modern Left-Aligned Redesign) */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-jakarta font-bold text-[11px] tracking-widest text-yen-gold bg-yen-gold/10 px-4 py-2 rounded-full uppercase">
                {article.category}
              </span>
              <span className="text-gray-300 text-sm hidden sm:inline-block">•</span>
              <span className="text-sm font-jakarta text-gray-500 font-medium flex items-center gap-2">
                <span className="sm:hidden">📅</span> {article.date}
              </span>
            </div>
            
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-yen-dark leading-[1.1] mb-8">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-xl shadow-sm">
                ✍️
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-0.5 wrap-break-word">Penulis</p>
                <p className="text-base font-bold text-yen-dark font-jakarta">{article.author}</p>
              </div>
            </div>

            {/* Tombol Bagikan */}
            <SocialShare 
              url={`https://basoyen.com/article/${slug}`}
              title={article.title}
              text={article.excerpt || "Baca artikel menarik ini dari Baso Yen!"}
            />
          </div>

          {/* Article Image Banner */}
          {article.image && (
            <div className="w-full h-64 md:h-[400px] rounded-[24px] overflow-hidden mb-12 border-2 border-yen-cream shadow-sm relative select-none">
              <ArticleImage src={article.image} alt={article.title} category={article.category} />
            </div>
          )}

          {/* Excerpt panel */}
          <div className="bg-[#FFF6F0] p-6 border-l-4 border-yen-accent mb-10 rounded-r-[16px] max-w-3xl mx-auto">
            <p className="font-jakarta text-sm md:text-base text-yen-dark italic leading-relaxed wrap-break-word">
              "{article.excerpt}"
            </p>
          </div>

          {/* Article body content (Rich Text) */}
          <div className="max-w-3xl mx-auto overflow-hidden wrap-break-word">
            <div 
              className="prose prose-sm md:prose-base prose-p:leading-relaxed prose-li:leading-relaxed max-w-none wrap-break-word
                         [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8
                         [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-yen-dark
                         [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-6
                         [&>p]:mb-6 [&>p]:text-justify [&>p]:text-yen-neutral
                         [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-yen-neutral
                         [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-yen-neutral
                         [&>strong]:font-bold [&>em]:italic
                         [&>blockquote]:border-l-4 [&>blockquote]:border-yen-accent [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-yen-cream/10 [&>blockquote]:py-2"
              dangerouslySetInnerHTML={{ __html: article.content || "<p>Konten artikel belum tersedia.</p>" }} 
            />
          </div>

        </div>
      </div>
    </motion.div>
    </>
  );
}
