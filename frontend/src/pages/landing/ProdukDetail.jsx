import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../../hooks/api/useProducts";
import Button from "../../components/ui/Button";
import SocialShare from "../../components/ui/SocialShare";
import SEO from "../../components/ui/SEO";

import { whatsappConfig } from "../../data/whatsappMessage";

function ProductImage({ src, alt, category }) {
  const [hasError, setHasError] = useState(false);

  const getIcon = (cat) => {
    switch (cat) {
      case "Bakso": return "🍲";
      case "Mie": return "🍜";
      case "Sosis": return "🌭";
      case "Kulit Pangsit": return "🥟";
      default: return "🏺";
    }
  };

  if (hasError || !src) {
    const bgGradients = {
      "Bakso": "from-[#FFEDE3] to-[#FFD8C6] text-[#E31E24]",
      "Mie": "from-[#FFF5E6] to-[#FFE2B7] text-[#FF8800]",
      "Sosis": "from-[#FFEBEC] to-[#FFCCD1] text-[#E31E24]",
      "Kulit Pangsit": "from-[#FFF9E6] to-[#FFF0C2] text-[#FFB000]",
      "Lainnya": "from-[#F3F4F6] to-[#E5E7EB] text-[#4B5563]"
    };
    const gradient = bgGradients[category] || "from-[#FAF9F6] to-[#EFECE6] text-[#4A4543]";

    return (
      <div className={`w-full h-full bg-linear-to-br ${gradient} flex flex-col items-center justify-center p-6 text-center select-none`}>
        <div className="text-5xl filter drop-shadow-md mb-2">{getIcon(category)}</div>
        <span className="font-bebas text-sm tracking-widest uppercase opacity-70">{category}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-500 ease-out"
    />
  );
}

export default function ProdukDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mengambil data dari React Query
  const { data: allProducts = [], isLoading } = useProducts();
  
  // Mencari produk yang cocok dengan slug
  const product = allProducts.find(p => p.slug === slug);

  // Jika produk tidak ditemukan (dan proses loading sudah selesai), tendang kembali ke katalog
  useEffect(() => {
    if (!isLoading && !product) {
      navigate("/produk", { replace: true });
    }
  }, [isLoading, product, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-yen-white pt-32 pb-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-yen-cream border-t-yen-accent rounded-full animate-spin"></div>
        <p className="font-jakarta font-bold tracking-wider text-yen-neutral">Menyiapkan Produk...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <SEO 
        title={product.name} 
        description={`Beli ${product.name} kualitas premium hanya di Baso Yen.`}
        image={product.image}
        url={`/produk/${slug}`}
        isExactTitle={false}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-yen-white pt-24 pb-20 relative overflow-hidden bg-grid-pattern"
    >
      {/* Decorative Background Patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yen-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Breadcrumb / Back Navigation */}
        <button
          onClick={() => navigate("/produk")}
          className="flex items-center gap-2 text-yen-neutral hover:text-yen-accent font-jakarta text-sm font-bold mb-8 transition-colors group cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Kembali ke Katalog
        </button>

        <div className="bg-white border border-yen-cream rounded-[36px] p-8 md:p-12 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.1)] flex flex-col lg:flex-row gap-12">
          
          {/* Sisi Kiri: Gambar Produk */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-[#FFF6F0] border-2 border-yen-cream rounded-[28px] overflow-hidden shadow-sm relative group">
              <ProductImage src={product.image} alt={product.name} category={product.category} />
            </div>
          </div>

          {/* Sisi Kanan: Rincian Produk */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="mb-6">
              <span className="font-jakarta font-black text-[10px] tracking-widest text-yen-gold bg-yen-gold/5 border border-yen-gold/25 px-3 py-1 rounded-full uppercase inline-block mb-3">
                {product.category}
              </span>
              <h1 className="font-fredoka font-bold text-4xl lg:text-5xl text-yen-dark leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-[10px] font-jakarta font-black tracking-widest text-yen-neutral/60 block uppercase mb-1">
                  Kemasan & Ukuran
                </span>
                <span className="font-jakarta font-bold text-base text-yen-dark">
                  {product.packSize}
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <span className="text-[10px] font-jakarta font-black tracking-widest text-yen-neutral/60 block uppercase mb-1">
                  Status Kualitas
                </span>
                <span className="font-jakarta font-black tracking-wider text-[10px] text-white bg-yen-accent px-3 py-1.5 rounded-full inline-block uppercase">
                  {product.badge}
                </span>
              </div>
            </div>

            <div className="mb-10">
              <h4 className="font-jakarta font-black text-[11px] tracking-widest text-yen-neutral/60 mb-3 uppercase border-b border-yen-cream pb-2">
                Deskripsi Produk
              </h4>
              <p className="font-jakarta text-sm text-yen-neutral leading-relaxed text-justify">
                {product.description}
              </p>
            </div>

            {/* Aksi Pembelian */}
            <div className="space-y-4">

              
              <a href={whatsappConfig.generateOrderUrl()} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" className="w-full py-4 text-sm tracking-wider gap-2 shadow-md hover:shadow-red-500/25">
                  Pesan Sekarang via WhatsApp
                </Button>
              </a>
            </div>

            {/* Tombol Bagikan */}
            <SocialShare 
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={product.name}
              text={`Lihat ${product.name} kualitas premium dari Baso Yen!`}
            />

          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
