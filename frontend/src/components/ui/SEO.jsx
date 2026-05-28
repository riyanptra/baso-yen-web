import { Helmet } from "react-helmet-async";

/**
 * Komponen SEO (Search Engine Optimization)
 * Digunakan untuk mengatur meta tags secara dinamis agar website
 * terlihat bagus saat dibagikan di WhatsApp, Facebook, Twitter, dll.
 */
export default function SEO({ title, description, image, url, isExactTitle = false }) {
  const defaultTitle = "Baso Yen - Sajian Praktis Istimewa | Mie, Bakso & Sosis Sapi Premium Bandung";
  const defaultDescription = "Baso Yen menyediakan produk olahan daging sapi premium khas Bandung. Tersedia bakso, mie basah, dan sosis sapi.";
  const defaultImage = "/LOGO-YEN.png"; // Gambar default jika tidak ada gambar spesifik
  const siteUrl = "https://basoyen.com"; // Ganti dengan URL domain asli Anda saat rilis

  // Tentukan judul akhir (apakah butuh imbuhan "| Baso Yen" atau tidak)
  const finalTitle = isExactTitle ? title : (title ? `${title} | Baso Yen` : defaultTitle);

  return (
    <Helmet>
      {/* Meta Standar */}
      <title>{finalTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${url || ''}`} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${siteUrl}${url || ''}`} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
