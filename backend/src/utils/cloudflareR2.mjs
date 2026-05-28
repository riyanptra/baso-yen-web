import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import crypto from "crypto";
import "dotenv/config";

// Inisialisasi S3 Client untuk Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Mengunggah file (berupa buffer) ke layanan Cloudflare R2 setelah dioptimasi.
 * @param {Buffer} fileBuffer - Buffer dari file gambar asli
 * @param {string} [folder="basoyen"] - Nama folder tujuan di bucket
 * @returns {Promise<object>} Objek berisi URL publik dan object key
 */
export const uploadImageToR2 = async (fileBuffer, folder = "basoyen") => {
  try {
    if (!fileBuffer) return null;

    // 1. Optimasi gambar: paksa ke WebP, kompresi, batas ukuran 1200px
    const optimizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // 2. Buat nama file (Key) yang unik
    const uniqueFileName = `${crypto.randomUUID()}.webp`;
    const objectKey = `${folder}/${uniqueFileName}`;

    // 3. Persiapkan perintah upload S3
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: objectKey,
      Body: optimizedImageBuffer,
      ContentType: "image/webp",
    });

    // 4. Eksekusi upload ke R2
    await s3.send(command);

    // 5. Kembalikan URL untuk disimpan ke DB
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${objectKey}`;

    return {
      secure_url: publicUrl,
    };
  } catch (error) {
    console.error("Gagal mengunggah gambar ke R2:", error);
    throw new Error(`Gagal mengunggah gambar ke penyimpanan: ${error.message}`);
  }
};

/**
 * Mengekstrak Object Key (lokasi asli file di R2) dari sebuah URL.
 * Contoh URL: https://pub-xxx.r2.dev/basoyen/products/file.webp
 * Menjadi: basoyen/products/file.webp
 */
export const extractObjectKey = (url) => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    // parsedUrl.pathname menghasilkan path dimulai dengan '/', misal: "/basoyen/file.webp"
    // Kita buang '/' di awalnya
    return parsedUrl.pathname.substring(1);
  } catch (e) {
    // Jika format URL tidak valid
    return null;
  }
};

/**
 * Menghapus file gambar dari Cloudflare R2 berdasarkan Key-nya.
 * @param {string} objectKey - Path lengkap file di dalam bucket (cth: basoyen/products/file.webp)
 */
export const deleteImageFromR2 = async (objectKey) => {
  try {
    if (!objectKey) return null;

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: objectKey,
    });
    
    await s3.send(command);
  } catch (error) {
    console.error("Gagal menghapus gambar dari R2:", error);
  }
};
