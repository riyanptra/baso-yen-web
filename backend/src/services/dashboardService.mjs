import { prisma } from "../lib/prisma.mjs";

/**
 * Mengambil ringkasan statistik (jumlah baris data) dari tabel-tabel utama.
 * Digunakan untuk ditampilkan pada halaman Dasbor Utama (Overview).
 * @returns {Promise<object>} Objek berisi jumlah produk, resep, artikel, klien, dan sertifikat
 */
export const getDashboardStats = async () => {
  const [
    productsCount,
    recipesCount,
    articlesCount,
    clientsCount,
    certificatesCount
  ] = await Promise.all([
    prisma.product.count(),
    prisma.recipe.count(),
    prisma.article.count(),
    prisma.client.count(),
    prisma.certificate.count()
  ]);

  return {
    products: productsCount,
    recipes: recipesCount,
    articles: articlesCount,
    clients: clientsCount,
    certificates: certificatesCount
  };
};
