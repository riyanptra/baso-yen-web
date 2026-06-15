import { useState } from "react";
import { Copy, Check } from "lucide-react"; 

/**
 * Komponen SocialShare (Bagikan ke Media Sosial)
 * 
 * Fungsi: Menyediakan deretan tombol interaktif agar pengunjung bisa
 * membagikan tautan halaman (Produk, Resep, Artikel) ke WhatsApp, Facebook, 
 * X (Twitter), atau sekadar menyalin tautannya secara langsung.
 * 
 * @param {string} url - Tautan lengkap yang akan dibagikan (misal: https://basoyen.com/produk/bakso)
 * @param {string} title - Judul konten (opsional, untuk format teks)
 * @param {string} text - Deskripsi singkat konten (opsional)
 */
export default function SocialShare({ url, title = "", text = "" }) {
  const [copied, setCopied] = useState(false);

  // Jika URL tidak dikirim dari luar, gunakan URL dari browser saat ini secara otomatis
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  
  // Encode teks agar aman dilewatkan ke dalam format URL (mengubah spasi menjadi %20, dll)
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} - ${text}`);

  /**
   * Fungsi untuk menyalin tautan ke clipboard (Papan Klip) bawaan perangkat.
   * Memberikan feedback visual berupa tombol berubah menjadi warna hijau selama 2 detik.
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      // Kembalikan status tombol setelah 2 detik
      setTimeout(() => setCopied(false), 2000);
    });
  };

  /**
   * Fungsi pembantu untuk membuka jendela dialog (pop-up) sosial media
   * dengan ukuran yang rapi di tengah layar pengunjung.
   */
  const openShareWindow = (shareLink) => {
    window.open(shareLink, "share-dialog", "width=600,height=400,left=100,top=100");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-6 border-t border-b border-yen-cream/30 my-8">
      <span className="font-jakarta text-xs font-bold text-yen-neutral tracking-widest uppercase">
        Bagikan:
      </span>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Tombol WhatsApp */}
        <button
          onClick={() => openShareWindow(`https://api.whatsapp.com/send?text=${encodedText}%0A%0A${encodedUrl}`)}
          className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          aria-label="Bagikan ke WhatsApp"
          title="Bagikan ke WhatsApp"
        >
          <svg className="w-[18px] h-[18px] fill-current translate-x-[1px] translate-y-[1px]" viewBox="0 0 24 24">
            <path d="M12.031 0C5.385 0 .001 5.385.001 12.031c0 2.124.553 4.195 1.605 6.014L0 24l6.111-1.603c1.763.957 3.754 1.464 5.92 1.464 6.645 0 12.029-5.384 12.029-12.029C24.06 5.385 18.676 0 12.031 0zm3.618 17.291c-.551 1.552-3.155 2.148-4.321 2.215-1.127.065-2.613-.257-4.225-1.042-3.415-1.666-5.617-5.184-5.786-5.41-.169-.226-1.381-1.841-1.381-3.513 0-1.672.871-2.497 1.182-2.836.311-.339.678-.424.904-.424.226 0 .452 0 .649.011.205.011.48-.083.748.563.282.678.96 2.345 1.045 2.514.085.169.141.367.028.593-.113.226-.169.367-.339.565-.169.198-.352.408-.507.552-.169.155-.353.324-.155.663.198.339.882 1.455 1.892 2.355 1.306 1.164 2.399 1.525 2.738 1.681.339.155.536.127.734-.085.198-.212.847-.989 1.073-1.328.226-.339.452-.282.762-.169.311.113 1.977.932 2.316 1.102.339.169.565.254.649.395.085.141.085.819-.466 2.371z" />
          </svg>
        </button>

        {/* Tombol X (Twitter) */}
        <button
          onClick={() => openShareWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)}
          className="w-10 h-10 rounded-full bg-black/5 text-black flex items-center justify-center hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          aria-label="Bagikan ke X"
          title="Bagikan ke X (Twitter)"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.126H5.078z" />
          </svg>
        </button>

        {/* Tombol Facebook */}
        <button
          onClick={() => openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
          className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
          aria-label="Bagikan ke Facebook"
          title="Bagikan ke Facebook"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* Pemisah Vertikal (Khusus Layar Besar) */}
        <div className="hidden sm:block w-px h-6 bg-yen-cream/50 mx-1"></div>

        {/* Tombol Salin Tautan (Copy Link) */}
        <button
          onClick={handleCopy}
          className={`group flex items-center gap-2 px-5 h-10 rounded-full font-jakarta text-[11px] font-bold tracking-wider transition-all duration-300 shadow-sm uppercase ${
            copied 
              ? "bg-green-500 text-white shadow-[0_4px_14px_rgba(34,197,94,0.3)] border border-transparent" 
              : "bg-white border border-yen-cream/50 text-yen-neutral hover:bg-yen-dark hover:text-white hover:border-yen-dark hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          }`}
          aria-label="Salin Tautan"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Tautan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
