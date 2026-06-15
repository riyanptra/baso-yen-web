import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan folder temp ada untuk menyimpan file sementara
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Konfigurasi penyimpanan memori (buffer) untuk Multer.
 * File yang diunggah tidak disimpan di disk server, melainkan di memori (RAM)
 * agar bisa langsung diteruskan/diunggah ke layanan R2
 */
const storage = multer.memoryStorage();

// Filter hanya menerima file gambar
/**
 * Middleware untuk memfilter file yang diunggah agar hanya menerima format gambar (JPEG, PNG, WEBP, dll).
 */
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Format file tidak didukung! Hanya diperbolehkan JPG, PNG, dan WEBP.",
      ),
      false,
    );
  }
};

// Inisialisasi multer
/**
 * Instansiasi middleware unggahan tunggal (single upload).
 * Dibatasi maksimal ukuran file sebesar 5 Megabytes.
 */
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal 5MB per file
  },
});

/**
 * Middleware untuk menangani error dari Multer (misal file terlalu besar)
 * Dibungkus agar tidak membuat server crash
 */
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Error bawaan multer (misal: LIMIT_FILE_SIZE)
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Ukuran gambar terlalu besar (Maksimal 5MB)",
        data: null,
        errors: null,
      });
    }
    return res
      .status(400)
      .json({ success: false, message: err.message, data: null, errors: null });
  } else if (err) {
    // Error dari fileFilter (format tidak didukung)
    return res
      .status(400)
      .json({ success: false, message: err.message, data: null, errors: null });
  }
  next();
};
