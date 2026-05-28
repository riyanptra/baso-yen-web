import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/api/useProducts";
import Button from "../../ui/Button";
import SectionLabel from "../../ui/SectionLabel";
import ScrollReveal from "../../ui/ScrollReveal";

const ProductCard = ({ prod }) => (
  <div className="relative z-10 snap-center shrink-0 w-60 lg:w-auto bg-yen-white p-5 border-2 border-yen-cream rounded-[28px] shadow-[0_12px_32px_rgba(30,27,26,0.15)] hover:shadow-[0_20px_40px_rgba(227,30,36,0.25)] hover:border-yen-accent/25 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
    <div>
      {/* Image Container with high style */}
      <div className="aspect-square bg-[#FFF6F0] border border-yen-cream/50 flex items-center justify-center rounded-[20px] mb-4 relative overflow-hidden">
        {prod.image ? (
          <img
            src={prod.image}
            alt={prod.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="font-bebas text-yen-neutral/45 text-[10px] tracking-widest">
              BASO YEN
            </span>
            <span className="text-5xl mt-2 select-none filter drop-shadow-md group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
              🍲
            </span>
          </div>
        )}
        {prod.badge && (
          <span className="absolute top-2.5 left-2.5 bg-yen-accent text-white text-[9px] font-jakarta font-black px-2.5 py-1 rounded-full uppercase shadow-xs z-10">
            {prod.badge}
          </span>
        )}
      </div>
      <h3 className="font-jakarta font-black text-lg text-yen-dark mb-1 leading-snug group-hover:text-yen-accent transition-colors duration-300 line-clamp-1">
        {prod.name}
      </h3>
      <p className="font-jakarta text-xs text-yen-neutral leading-relaxed line-clamp-2">
        {prod.description}
      </p>
    </div>
    <div className="mt-6 border-t-2 border-yen-cream/60 pt-4 text-center">
      <Link to="/produk" className="block w-full">
        <button className="w-full bg-yen-accent hover:bg-yen-dark text-white font-bebas text-xs tracking-wider py-3 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md uppercase">
          Detail Produk
        </button>
      </Link>
    </div>
  </div>
);

export default function ProdukUnggulanSection() {
  // Mengambil data produk menggunakan mesin React Query (Otomatis menggunakan Cache)
  const { data: allProducts = [], isLoading } = useProducts();
  
  // Saring hanya produk yang berstatus Best Seller, maksimal ambil 5 buah
  const bestSellers = allProducts.filter(p => p.isBestSeller).slice(0, 5);

  return (
    <section className="bg-yen-white py-24 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionLabel variant="bebas" color="accent">
              BEST SELLER
            </SectionLabel>
            <h2 className="font-bebas text-4xl sm:text-6xl font-bold text-yen-dark mt-2">
              Produk Unggulan
            </h2>
            <p className="font-jakarta text-sm text-yen-neutral mt-4 max-w-2xl leading-relaxed text-left">
              Temukan varian produk terlaris pilihan kami, mulai dari mie basah artisan dengan kekenyalan sempurna, bakso sapi murni bertekstur padat, hingga sosis premium. Diproduksi higienis setiap hari demi menjaga kesegaran dan cita rasa otentik yang khas.
            </p>
          </div>
          <Link to="/produk">
            <Button variant="dark" size="sm" className="rounded-full">
              Lihat Semua Produk
            </Button>
          </Link>
        </div>

        <ScrollReveal>
          <div className="bg-[#FFF6F0]/65 backdrop-blur-md border border-yen-cream rounded-[36px] p-6 md:p-8 lg:p-10 shadow-[0_24px_60px_-10px_rgba(30,27,26,0.22),0_8px_30px_rgba(30,27,26,0.12)] relative overflow-hidden">
            {/* Ambient decorative glow inside shelf */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yen-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible lg:grid lg:grid-cols-5 gap-6 scrollbar-hide snap-x min-h-[350px]">
              {isLoading ? (
                <div className="col-span-5 flex items-center justify-center font-jakarta text-yen-neutral animate-pulse">
                  Mencari produk terbaik...
                </div>
              ) : bestSellers.length > 0 ? (
                bestSellers.map((prod) => (
                  <ProductCard key={prod.id} prod={prod} />
                ))
              ) : (
                <div className="col-span-5 flex items-center justify-center font-jakarta text-yen-neutral">
                  Belum ada produk yang ditambahkan.
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

