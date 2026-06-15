<div align="center">
  <img src="./LOGO-YEN.png" alt="Baso Yen Logo" />
  
  <h1>🍜 Baso Yen - Content Management System & Landing Page</h1>

  <p>
    <strong>Aplikasi Web Fullstack Modern untuk Manajemen Konten Perusahaan Kuliner Legendaris di Bandung.</strong>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  </p>
</div>

<br />

## 📋 Tentang Proyek

Proyek ini dibangun untuk mendigitalisasi dan memodernisasi manajemen konten website **Baso Yen**, sebuah produsen bakso, sosis sapi, dan mie premium asal Bandung yang telah berdiri sejak 1988.

Aplikasi ini memiliki 2 pilar utama:

1. **Landing Page (Publik):** Halaman depan interaktif untuk pengunjung melihat katalog produk, membaca artikel, menemukan resep, dan mengajukan permintaan sampel B2B.
2. **Dasbor CMS (Privat):** Panel kontrol khusus admin untuk mengelola semua konten website secara dinamis (CRUD Produk, Artikel, Galeri, Sertifikat, dll).

<br />

## ✨ Fitur Utama

### 🛍️ Landing Page

- **Katalog Dinamis:** Menampilkan produk, artikel, dan resep terbaru dari database.
- **Formulir Interaktif:** Pengunjung dapat mengirim pesan langsung (Contact Us) & mengajukan sampel produk (B2B).
- **Galeri & Sertifikat:** Etalase foto perusahaan, fasilitas pabrik, dan bukti sertifikasi mutu (BPOM, Halal).
- **Desain Responsif:** Tampilan sempurna di Desktop maupun Mobile (didukung oleh animasi dari Framer Motion).

### ⚙️ Dasbor Admin (CMS)

- **Autentikasi Aman:** Sistem Login menggunakan JWT (JSON Web Token) dengan HttpOnly Cookies.
- **Manajemen Konten (CRUD):** Kelola Kategori, Produk, Resep, Artikel, Galeri, Mitra, Testimoni, dan Sertifikat.
- **Manajemen Pesan:** Membaca, membalas, dan mengubah status pesan/pengajuan sampel dari pengunjung.
- **Upload Gambar Cloud:** Integrasi mulus dengan _Cloudflare R2_ dan _Sharp_ untuk kompresi dan penyimpanan gambar ultra cepat.
- **Rich Text Editor:** Menggunakan `React Quill` untuk penulisan konten artikel dan resep bergaya blog.
- **Keamanan Lapis Baja:** Dilengkapi _Global Interceptor_ Axios untuk auto-logout, validasi input menggunakan Zod, serta pencegahan serangan DDoS (Rate Limiting) dan XSS (Helmet).

<br />

## 📸 Cuplikan Layar (Screenshots)

> **Catatan:** Ganti teks dan tautan gambar di bawah ini dengan screenshot aplikasi Anda nanti setelah diunggah!

|                                                       Landing Page (Beranda)                                                       |                                                      Dasbor Admin (Overview)                                                       |
| :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Screenshot+Landing+Page" alt="Landing Page" width="100%" /> | <img src="https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Screenshot+Dasbor+Admin" alt="Dasbor Admin" width="100%" /> |

<br />

## 🛠️ Teknologi yang Digunakan (Tech Stack)

### Backend

- **Framework:** Node.js, Express.js (ES Modules)
- **Database & ORM:** PostgreSQL, Prisma Client
- **Security & Auth:** Bcrypt, JSON Web Token (JWT), Cookie Parser, Helmet, CORS, Express Rate Limit
- **File & Media:** Multer, Sharp, AWS S3 Client (Cloudflare R2)
- **Utilities:** Zod (Validasi)

### Frontend

- **Framework:** React 19 (via Vite)
- **Styling & UI:** TailwindCSS v4, Lucide React (Icons)
- **Animasi:** Framer Motion
- **State Management:** Zustand (Global State), TanStack React Query v5 (Server State & Caching)
- **Routing & HTTP:** React Router DOM, Axios

<br />

## 🚀 Cara Menjalankan di Komputer Lokal

### Prasyarat

Pastikan komputer Anda sudah terinstal **Node.js (v18+)**, **NPM**, dan **PostgreSQL**. Anda juga membutuhkan akun **Cloudflare** (untuk layanan R2).

### 1. Kloning Repositori

```bash
git clone https://github.com/username-anda/basoyen-cms.git
cd basoyen-cms
```

### 2. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependensi
npm install

# Buat file .env (lihat bagian Variabel Lingkungan di bawah)
cp .env.example .env

# Jalankan migrasi database
npx prisma migrate dev --name init

# Jalankan server backend (localhost:5000)
npm run dev
```

### 3. Setup Frontend

```bash
# Buka terminal baru, masuk ke folder frontend
cd frontend

# Install dependensi
npm install

# Buat file .env
cp .env.example .env

# Jalankan server frontend (localhost:5173)
npm run dev
```

<br />

## 🔐 Variabel Lingkungan (.env)

Aplikasi ini membutuhkan beberapa kunci rahasia agar bisa berjalan. File `.env` tidak disertakan di repositori ini. Silakan buat file `.env` di folder `backend/` dengan panduan berikut:

````env
# Koneksi Database PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/namadb?schema=public"

# Port Server
PORT=5000

# Rahasia JWT (Gunakan string acak yang kuat)
JWT_SECRET="kunci_rahasia_super_aman_anda"

# Cloudflare R2 (Untuk Upload Gambar)
R2_BUCKET_NAME="basoyen"
R2_PUBLIC_URL="https://assets.domainanda.com"
R2_ENDPOINT="https://<ACCOUNT_ID>.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="kunci_akses_anda"
R2_SECRET_ACCESS_KEY="kunci_rahasia_anda"


Untuk `frontend/.env`, cukup tambahkan:
```env
VITE_API_URL=http://localhost:5000/api
````

<br />

## 📚 Dokumentasi Lebih Lanjut

Untuk panduan arsitektur mendalam, struktur tabel database, dan rujukan lengkap (_Endpoint Reference_) semua API, silakan merujuk pada file `DOKUMENTASI_PROYEK.txt` yang dilampirkan di repositori ini.

---

Dibuat dengan ❤️ oleh **Riyan** | 2026
