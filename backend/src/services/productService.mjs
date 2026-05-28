import { prisma } from "../lib/prisma.mjs";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.mjs";
import {
  uploadImageToR2,
  deleteImageFromR2,
  extractObjectKey,
} from "../utils/cloudflareR2.mjs";
import fs from "fs";

/**
 * Membuat Slug URL (Sama seperti Kategori)
 */
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};



/**
 * 1. MENDAPATKAN SEMUA PRODUK
 */
/**
 * Mengambil semua data produk beserta kategori dan foto unggulannya (Featured).
 * @returns {Promise<Array>} Daftar semua produk
 */
export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });
  return products;
};

/**
 * 2. MENDAPATKAN PRODUK BERDASARKAN ID
 */
/**
 * Mengambil data satu produk berdasarkan ID beserta semua relasinya (kategori, galeri foto).
 * @param {string} id - ID produk
 * @returns {Promise<object>} Data lengkap produk
 * @throws {Error} Jika produk tidak ditemukan
 */
export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true } },
      createdBy: { select: { id: true, name: true } },
    },
  });

  if (!product) {
    const error = new Error("Produk tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

/**
 * 3. MEMBUAT PRODUK BARU
 */
/**
 * Membuat data produk baru beserta banyak foto sekaligus.
 * Mengunggah setiap foto ke Cloudinary, menetapkan foto pertama sebagai unggulan (featured),
 * lalu menyimpan data produk dan relasi galerinya ke database dalam satu transaksi.
 * @param {object} payload - Data teks produk
 * @param {Array<object>} [files] - Array berisi file gambar produk (opsional)
 * @returns {Promise<object>} Data produk yang baru dibuat
 */
export const createProduct = async (payload, file, adminId) => {
  // 1. Validasi teks
  const validatedData = createProductSchema.parse(payload);

  // 2. Wajib ada gambar untuk produk baru
  if (!file) {
    const error = new Error("Gambar produk wajib diunggah!");
    error.statusCode = 400;
    throw error;
  }

  // 3. Upload gambar ke R2
  let imageUrl = "";
  try {
    const uploadResult = await uploadImageToR2(
      file.buffer,
      "basoyen/products"
    );
    imageUrl = uploadResult.secure_url;
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  // 5. Buat slug unik
  let finalSlug = generateSlug(validatedData.name);
  let counter = 1;
  while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${generateSlug(validatedData.name)}-${counter}`;
    counter++;
  }

  // 6. Simpan ke Database
  const newProduct = await prisma.product.create({
    data: {
      ...validatedData,
      slug: finalSlug,
      image: imageUrl,
      createdById: adminId, // ID admin yang sedang login
    },
  });

  return newProduct;
};

/**
 * 4. MEMPERBARUI PRODUK
 */
/**
 * Memperbarui data produk yang sudah ada. 
 * Jika terdapat array gambar baru, gambar lama di Cloudinary dan database akan dihapus terlebih dahulu,
 * kemudian diganti dengan kumpulan gambar yang baru.
 * @param {string} id - ID produk
 * @param {object} payload - Perubahan data produk
 * @param {Array<object>} [files] - Kumpulan file gambar baru (opsional)
 * @returns {Promise<object>} Data produk setelah diperbarui
 */
export const updateProduct = async (id, payload, file) => {
  const validatedData = updateProductSchema.parse(payload);
  const existingProduct = await getProductById(id);
  const updateData = { ...validatedData };

  // Jika update nama, perbarui slug
  if (validatedData.name) {
    let finalSlug = generateSlug(validatedData.name);
    let counter = 1;
    while (true) {
      const existing = await prisma.product.findUnique({
        where: { slug: finalSlug },
      });
      if (!existing || existing.id === id) break;
      finalSlug = `${generateSlug(validatedData.name)}-${counter}`;
      counter++;
    }
    updateData.slug = finalSlug;
  }

  // Jika admin mengunggah gambar baru
  if (file) {
    try {
      // 1. Upload gambar baru ke R2
      const uploadResult = await uploadImageToR2(
        file.buffer,
        "basoyen/products"
      );
      updateData.image = uploadResult.secure_url;

      // 2. Hapus gambar lama di R2 agar tidak jadi sampah digital
      const oldObjectKey = extractObjectKey(existingProduct.image);
      if (oldObjectKey) {
        await deleteImageFromR2(oldObjectKey);
      }
    } catch (error) {
      const err = new Error(error.message);
      err.statusCode = 500;
      throw err;
    }
  }

  // Simpan ke DB
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: updateData,
  });

  return updatedProduct;
};

/**
 * 5. MENGHAPUS PRODUK
 */
/**
 * Menghapus produk secara permanen dari database.
 * Juga akan menghapus semua foto fisik yang terhubung di Cloudinary.
 * @param {string} id - ID produk yang akan dihapus
 * @returns {Promise<object>} Data produk yang telah dihapus
 */
export const deleteProduct = async (id) => {
  const existingProduct = await getProductById(id);

  // 1. Hapus gambar dari R2
  const objectKey = extractObjectKey(existingProduct.image);
  if (objectKey) {
    await deleteImageFromR2(objectKey);
  }

  // 2. Hapus dari Database
  await prisma.product.delete({ where: { id } });

  return { message: "Produk berhasil dihapus beserta gambarnya" };
};
