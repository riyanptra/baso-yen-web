import { prisma } from "../lib/prisma.mjs";
import { createSettingSchema, updateSettingSchema } from "../validations/settingValidation.mjs";

/**
 * 1. MENDAPATKAN SEMUA PENGATURAN
 */
/**
 * Mengambil semua pengaturan website (misalnya Nomor WA, Alamat, dll) dari database.
 * Merapikan array hasil menjadi sebuah objek tunggal berbentuk kamus (key-value).
 * @returns {Promise<object>} Kamus seluruh pengaturan
 */
export const getAllSettings = async () => {
  const settings = await prisma.setting.findMany({
    orderBy: { key: "asc" },
  });
  return settings;
};

/**
 * 2. MENDAPATKAN PENGATURAN BERDASARKAN KEY (BUKAN ID)
 */
export const getSettingByKey = async (key) => {
  const setting = await prisma.setting.findUnique({
    where: { key },
  });
  if (!setting) {
    const error = new Error(`Pengaturan dengan kunci '${key}' tidak ditemukan`);
    error.statusCode = 404;
    throw error;
  }
  return setting;
};

/**
 * 3. MEMBUAT PENGATURAN BARU
 */
export const createSetting = async (payload) => {
  // 1. Validasi input
  const validatedData = createSettingSchema.parse(payload);

  // 2. Cek apakah key sudah ada
  const existing = await prisma.setting.findUnique({
    where: { key: validatedData.key },
  });

  if (existing) {
    const error = new Error("Kunci pengaturan sudah digunakan");
    error.statusCode = 400;
    throw error;
  }

  // 3. Simpan ke database
  const newSetting = await prisma.setting.create({
    data: validatedData,
  });

  return newSetting;
};

/**
 * 4. MEMPERBARUI PENGATURAN BERDASARKAN KEY
 */
/**
 * Memperbarui sekumpulan pengaturan sekaligus dalam satu transaksi database (Transaction).
 * Jika kunci sudah ada, nilainya diperbarui. Jika belum, akan dibuatkan baris baru (Upsert).
 * @param {Array<object>} settingsArray - Kumpulan pengaturan baru [{ key: "PHONE", value: "08..." }]
 * @returns {Promise<Array>} Daftar pengaturan yang berhasil disimpan
 */
export const updateSettings = async (settingsArray) => {
  // 1. Validasi input
  const validatedData = updateSettingSchema.parse(payload);
  
  // 2. Pastikan setting ada
  const existingSetting = await getSettingByKey(key);

  // 3. Simpan perubahan
  const updatedSetting = await prisma.setting.update({
    where: { key },
    data: { value: validatedData.value },
  });

  return updatedSetting;
};

/**
 * 5. MENGHAPUS PENGATURAN BERDASARKAN KEY
 */
export const deleteSetting = async (key) => {
  // 1. Pastikan setting ada
  const existingSetting = await getSettingByKey(key);

  // 2. Hapus data
  await prisma.setting.delete({ where: { key } });

  return { message: "Pengaturan berhasil dihapus" };
};
