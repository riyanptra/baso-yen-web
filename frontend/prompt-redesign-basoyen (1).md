# PROMPT REDESIGN WEBSITE BASO YEN

> Stack: React 19 + Tailwind CSS v4 + Framer Motion
> Target: Antigravity Vibe Coding

---

## CONTEXT & BRIEF

Redesign website company profile **Baso Yen** — produsen mie basah, bakso, dan sosis sapi halal asal Bandung yang berdiri sejak 1988. Perusahaan ini melayani B2C (rumah tangga) dan B2B (hotel, restoran, café, catering, rumah sakit). Konten tetap sama persis, yang berubah hanya tampilan visual dan pengalaman pengguna (UI/UX).

**PENTING:** Jangan gunakan template AI yang generik. Ciptakan desain yang terasa benar-benar dibuat khusus untuk brand FnB premium Indonesia ini.

---

## DESIGN DIRECTION

### Estetika & Vibe

- **Mood:** "Artisan Premium FnB" — warm, modern, dan crafted. Seperti brand makanan premium Jepang bertemu dengan keakraban warung Bandung yang sudah teruji puluhan tahun.
- **Bukan:** Tampilan startup tech, purple gradient tipis-tipis, layout kartu seragam membosankan.
- **Referensi mood:** Ichiran Ramen website meets premium Indonesian food brand.

### Color Palette

```
Primary:    #1A0A00  (coklat hitam tinta — deep dark brown, bukan pure black)
Accent:     #C8410A  (merah bata bakso — bold rust/brick red)
Warm Gold:  #E8A838  (kuning keemasan kuah kaldu)
Cream:      #F5EFE0  (krem hangat kertas parchment)
Neutral:    #8B6F5E  (coklat medium untuk teks sekunder)
White:      #FDFAF5  (off-white, bukan pure white)
```

### Typography

- **Display/Heading:** `Playfair Display` — serif elegan untuk judul besar, memberi kesan heritage dan artisan
- **Subheading:** `DM Serif Display` italic — dipakai untuk label section kecil dan tagline
- **Body:** `Plus Jakarta Sans` — clean, modern, mudah dibaca, dan punya karakter Indonesia
- **Accent/Label:** `Bebas Neue` — untuk label uppercase, angka statistik, badge kategori

### Layout Philosophy

- Asimetri yang terkontrol: elemen teks dan gambar tidak selalu sejajar
- Gunakan full-bleed section (warna gelap dan terang bergantian) untuk ritme visual
- Negative space yang generous — biarkan konten bernapas
- Grid 12-kolom dengan breakout elements yang melampaui grid sesekali

---

## KOMPONEN GLOBAL

### Navbar

- Fixed, transparan saat di atas hero, berubah menjadi `bg-[#1A0A00]` solid saat scroll turun
- Logo "Baso Yen" di kiri dengan tagline kecil "Sajian Praktis Istimewa"
- Nav links di kanan: Beranda | Tentang Kami | Layanan | Produk | Resep | Artikel | Kontak
- Hover state: underline animasi geser dari kiri dengan warna accent `#C8410A`
- Mobile: hamburger menu dengan slide-in drawer dari kanan, full-height overlay gelap
- Framer Motion: `useScroll` untuk deteksi scroll, `AnimatePresence` untuk mobile menu

### Footer

- Background `#1A0A00` dengan tekstur subtle noise grain overlay (CSS)
- 4 kolom: Tentang Singkat | Layanan Kami | Media Sosial & Online Store | Lokasi & Kontak
- Lokasi:
  - **Yen Factory:** Komp. Puri BKR Kav 61 Regol, Bandung (07.00–17.00) | WA: 0897-2078-800
  - **Meatball Factory:** Jl. Pasirkaliki 106 Cicendo, Bandung (08.00–20.00) | WA: 0851-0080-5080
- Sosmed: Facebook, Instagram, TikTok (`@miebasoyen`), YouTube
- Online Store: Tokopedia, Shopee
- Copyright: `© 2026 basoyen.com. All rights reserved.`
- Garis horizontal tipis warna `#C8410A` sebagai divider atas footer

### Scroll Animations (Global Pattern)

Semua section menggunakan `whileInView` dengan `viewport={{ once: true, margin: "-100px" }}`:

```jsx
// Pattern animasi masuk standar untuk semua section
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
```

---

## PAGE 1 — BERANDA (`/`)

### Section 1: Hero

- Full viewport height (`min-h-screen`)
- Background: Image `https://www.basoyen.com/carousel/hero1.jpg` dengan dark overlay gradient `from-[#1A0A00]/80 via-[#1A0A00]/50 to-transparent`
- Layout konten: vertikal center, posisi kiri
- Elemen:
  - Label kecil uppercase Bebas Neue: `SEJAK 1988 · BANDUNG · HALAL`
  - Heading besar Playfair Display: `"Sajian Pratis,`
  - Lanjutan heading dengan warna accent: `Istimewa Selalu."`
  - Body text: `"Mie, bakso, dan sosis sapi premium. Dipercaya hotel, restoran, dan ribuan keluarga Indonesia."`
  - 2 CTA button: [Lihat Produk] (filled accent) dan [Hubungi Kami] (outlined)
- Framer Motion:
  - Label: fade in delay 0.2s
  - Heading baris 1: slide up delay 0.4s
  - Heading baris 2: slide up delay 0.6s
  - Body: fade delay 0.8s
  - Buttons: fade up delay 1.0s
- Scroll indicator: panah bounce di bagian bawah hero

### Section 2: Tentang Singkat

- Background: `#F5EFE0` (cream)
- Layout 2 kolom: kiri teks, kanan gambar `https://www.basoyen.com/homepage/basoyen-bg-01.jpg`
- Label section: "Tentang" (DM Serif italic, accent color)
- Heading: "Baso Yen" (Playfair Display, sangat besar, 56–72px)
- Body: `"Baso Yen, produsen mie basah, Bakso dan sosis sapi di Bandung. Kami berkomitmen untuk memberikan kualitas yang terbaik. Pengolahan mie baso & sosis Yen ini pun mudah, sehingga setiap orang dapat memasak mie baso & sosis selezat di resto. Sejak berdiri, perusahaan Yen telah dipercaya sebagai pemasok di restoran-restoran, hotel-hotel, cafe, dan foodcourt."`
- Gambar: dengan border-radius custom, slight rotation `-2deg`, drop shadow dramatis
- Framer Motion: gambar masuk dari kanan (`x: 60`), teks dari kiri (`x: -60`)

### Section 3: Sertifikasi 100% Halal

- Background: `#1A0A00` (gelap)
- Teks warna cream/white
- Label: "Bersertifikat" (Bebas Neue, accent color)
- Heading: "100% Halal & Tersertifikasi" (Playfair Display, warna putih)
- List sertifikat dalam grid 2 kolom dengan icon checkmark merah:
  - Sertifikat Halal MUI: `ID32110001333131122` (Bakso & Sosis)
  - Sertifikat Halal MUI: `ID32110001333161122` (Mie, Kulit Pangsit)
  - Sertifikat Halal MUI: `ID32110001333491122` (Saus, Minyak Bawang)
  - BPOM RI Bakso Daging Sapi: `MD 239528004551`
  - BPOM RI Sosis Daging Sapi: `MD 239528003551`
  - BPOM RI Mie Basah: `MD 230828001551`
  - HACCP: `HACCP-02012`
- Framer Motion: staggered list items muncul satu per satu (delay 0.1s tiap item)

### Section 4: Keunggulan Produk

- Background: `#FDFAF5`
- Label: "Bandingkan" (Bebas Neue uppercase)
- Heading: "Keunggulan Produk"
- 4 kartu keunggulan dalam grid horizontal, dengan hover effect lift + border accent:
  1. **Berkualitas** — "Bahan-bahan berkualitas dan terbaik adalah syarat untuk setiap pembuatan produk Yen."
  2. **Tanpa Bahan Berbahaya** — "Peduli akan kesehatan konsumen, setiap produk Yen menggunakan standard food grade."
  3. **Fresh** — "Untuk menjaga kualitas rasa dan demi menghasilkan produk yang sehat, Yen selalu menjual produk yang fresh dan baru."
  4. **Premium** — "Bahan yang dipilih sudah pasti berkualitas dan menggunakan bahan pilihan yang membuat produk memiliki citarasa selezat di resto."
- Setiap kartu: icon besar (gunakan emoji atau SVG food-related), nomor urut besar samar di background kartu
- Framer Motion: kartu masuk stagger dari bawah

### Section 5: Layanan Kami

- Background: warna gelap `#1A0A00`
- Label: "YANG KAMI LAKUKAN"
- Heading: "Layanan Kami"
- 2 kolom besar:
  - **Business To Customer:** Outlet Yen Factory, Outlet Meatball Factory, Go Food/Grab Food/Shopee Food, Layanan order luar kota, Tokopedia & Shopee
  - **Business To Business:** Reseller, Kedai Bakso, Cafe & Resto, Hotel & Catering, Rumah Sakit
- Visual: masing-masing kolom punya divider dengan ikon dan warna yang berbeda (B2C = cream, B2B = accent red)

### Section 6: Produk Unggulan

- Background: `#F5EFE0`
- Label: "BEST SELLER"
- Heading: "Produk Unggulan"
- 5 kartu produk horizontal scroll (mobile) atau grid 5 kolom (desktop):
  - Baso Polos
  - Baso Super
  - Mie Standar
  - Mie Keriting
  - Kulit Pangsit
- Setiap kartu: placeholder image area (abu-abu rounded), nama produk, badge "Best Seller"
- CTA: tombol "Lihat Semua Produk" → `/produk`
- Framer Motion: kartu masuk dengan stagger horizontal

### Section 7: Testimoni

- Background: `#1A0A00`
- Heading: "Apa Kata Mereka?"
- 2 quote card besar dengan desain quote-mark tipografi besar:
  1. _"Makan yamien yang enak nggak perlu repot, tinggal beli aja di Baso Yen. 1 paket udah lengkap!"_ — **Devina**, Master Chef Season 5
  2. _"Rasanya, teksturnya berkualitas super! Mesti coba karena sudah certified MUI dan pastinya aman."_ — **Chef Chandra**, Celebrity Chef
- Tanda kutip besar di background (dekoratif, opacity 0.05, warna warm gold)

### Section 8: Mitra / Klien

- Background: `#FDFAF5`
- Heading: "Klien Kami"
- Logo mitra disamarkan (client bar dengan grayscale, opacity rendah — karena tidak ada logo aslinya, tampilkan nama-nama klien tipikal: Hotel, Restoran, Catering, Café, Rumah Sakit dalam bentuk teks pill/badge)
- Marquee animasi horizontal (infinite scroll kiri ke kanan)

### Section 9: Form Sample Request

- Background: `#C8410A` (accent merah bata) — bold, eye-catching CTA section
- Heading putih: "Request Sampel Usaha"
- Subtext: "Tertarik menjadi mitra bisnis? Kirimkan detail usaha Anda."
- Form fields (style: underline-only, no border box):
  - Name
  - Nama Usaha
  - Nomor Kontak
  - Lokasi
- Tombol Submit: dark `#1A0A00` dengan text putih

---

## PAGE 2 — TENTANG KAMI (`/tentang-kami`)

### Hero Section

- Background: full-width image overlay gelap
- Heading: "Tentang Kami" (Playfair Display, sangat besar)
- Breadcrumb: Beranda / Tentang Kami

### Section: Sejarah & Filosofi

- 2 kolom: kiri narasi, kanan visual/timeline
- Konten:
  - Didirikan tahun 1988
  - Motto: _"Paduan Kualitas dan Layanan Sempurna"_
  - `"Perusahaan Mie & Baso Yen adalah sebuah perusahaan mie, baso, & sosis yang didirikan sejak tahun 1988. Sejak berdiri, perusahaan Mie, Baso & Sosis Yen mengusung idealisme untuk memberikan kualitas yang terbaik. Perusahaan Mie, Baso, & Sosis Yen yang berlokasi di Jln. BKR Komp. Puri. Kav 61 ini kini telah berkembang menjadi tempat produksi yang higienis dan modern berpadu dengan counter penjualan yang nyaman."`
  - `"Keunggulan dari produk mie baso & sosis Yen ini tidak lain adalah karena produk Yen terbuat dari bahan-bahan pilihan yang berkualitas. Pengolahan mie baso & sosis Yen ini pun mudah, sehingga setiap orang dapat memasak mie baso & sosis selezat di resto. Sejak berdiri perusahaan Yen telah dipercaya sebagai pemasok di restoran-restoran, hotel-hotel, cafe, dan foodcourt."`
- Timeline vertikal visual: 1988 → Berdiri | 2000-an → Ekspansi B2B | 2010-an → Online & Mobil Toko | Sekarang → 2 Factory di Bandung

### Section: Misi

- Background `#1A0A00`
- Konten: `"Menyediakan pelayanan yang terbaik bagi konsumen-konsumen kami. Inti dari layanan kami adalah mengerti apa yang diinginkan konsumen, kebutuhan mereka dan apa yang didapat konsumen dari kami. Kualitas dan kepuasan konsumen adalah pedoman bagi kami."`
- Desain: teks besar centered, quote style, dengan dekoratif tipografi

### Section: Sertifikat

- Grid 2×2 card sertifikat dengan ikon lencana/seal:
  1. **Halal MUI** Jawa Barat — `ID32110001333131122`
  2. **BPOM RI** — `MD 239528004551`
  3. **Penyuluhan Keamanan Pangan** — `442/3121-Dinkes`
  4. **HACCP** — `HACCP-02012`
- Framer Motion: kartu muncul dengan `rotateY` flip effect (3D card reveal)

### Section: Layanan Ringkas

- 6 kartu layanan dalam grid 3×2:
  1. **Supplier** — Sejak berdiri, Yen melayani B2B dari Perhotelan, Restoran, Catering, Café, hingga Rumah Sakit.
  2. **Mobil Toko** — Telah melayani selama 10 tahun berkeliling ke seluruh Bandung.
  3. **Online Store** — Tersedia di enam marketplace populer.
  4. **Offline Store** — Dua toko: Counter Yen dan Meatball Factory Yen di pusat Kota Bandung.
  5. **Reseller** — Membuka peluang reseller dengan keuntungan menarik.
  6. **Cooking Class** — Program Cooking Class untuk anak-anak.

---

## PAGE 3 — LAYANAN (`/layanan`)

### Hero Section

- Sama dengan pola hero inner page: overlay gelap + heading + breadcrumb
- Heading: "Layanan Kami"

### Tabs Section

- 2 tab toggle besar: **Business To Customer (Retail)** | **Business To Business (Usaha)**
- Framer Motion: `AnimatePresence` + `layoutId` untuk tab indicator sliding

#### Tab B2C Content

- Intro: `"Baso Yen merintis usaha dengan menjual produk berkualitas, bergizi dan higienis untuk sajian bagi keluarga di rumah. Soal kehalalan tidak perlu diragukan lagi karena produk dari Baso Yen sudah memiliki sertifikat Halal MUI."`
- Badge sertifikat: P-IRT 2013 273011620 | Halal MUI | Keamanan Pangan Dinkes | HACCP
- **Layanan Area Bandung:**
  - Yen Factory — Jl BKR, Komplek Puri BKR Kav 61 Regol, Bandung
  - Meatball Factory — Jl. Pasirkaliki 106 Cicendo, Bandung
- **Delivery Bandung Same Day:**
  - GoFood: [BKR Delivery](https://gofood.link/u/yBrmj) | [Paskal Delivery](https://gofood.link/u/DAr7)
  - WhatsApp: [Yen Factory BKR](https://api.whatsapp.com/send?phone=628972078800) | [Meatball Factory Paskal](https://api.whatsapp.com/send?phone=6285100805080)
- **Layanan Luar Kota Next Day:**
  - Order WhatsApp: +62-896-7839-1030 / +62-898-1368-800
- **Marketplace:** Shopee & Tokopedia (dengan logo placeholder)

#### Tab B2B Content

- Intro: `"Baso Yen dipercaya menjadi supplier bakso, mie basah, sosis dan kulit pangsit. Mulai dari kedai, resto, cafe hingga hotel di pulau Jawa. Pabrik Baso Yen siap untuk memenuhi kebutuhan usaha Anda mulai dari usaha kecil hingga partai besar."`
- 4 benefit card dengan icon besar:
  1. **Harga Kompetitif** — Harga yang ditawarkan untuk pemilik usaha kompetitif dan pasti menguntungkan.
  2. **Custom Order** — Melayani konsultasi custom orderan dengan minimal jumlah tertentu.
  3. **Produk Beragam** — Setidaknya ada 50 produk yang bisa dipilih.
  4. **Pengiriman Gratis** — Gratis ongkir untuk area Kota Bandung dengan minimal pembelian.
- CTA: "Hubungi Kami untuk Kemitraan" → link ke halaman kontak

---

## PAGE 4 — PRODUK (`/produk`)

### Hero Section

- Heading: "Semua Produk"

### Filter & Grid

- Filter bar kategori (All | Bakso | Mie | Sosis | Kulit Pangsit | Lainnya) — pill button style
- Grid produk 3×N (desktop) / 2×N (tablet) / 1×N (mobile)
- Setiap product card:
  - Area gambar: rounded-xl, aspect ratio 1:1, background cream dengan placeholder
  - Nama produk (Playfair Display)
  - Badge kategori (Bebas Neue, warna accent)
  - Hover state: card terangkat + overlay gelap dengan tombol "Detail"
- Framer Motion: kartu masuk stagger saat filter berubah (`AnimatePresence` + `layout`)

### Section Marketplace CTA

- Background accent red
- Heading: "Di Marketplace"
- Subtext: `"Produk Basoyen tersedia di marketplace populer Indonesia. Dapatkan kemudahan bertransaksi melalui marketplace kesayangan Anda."`
- 2 tombol besar: Tokopedia | Shopee

---

## PAGE 5 — RESEP (`/resep`)

### Hero Section

- Heading: "Semua Resep"
- Subtext: "Temukan inspirasi masakan lezat menggunakan produk Baso Yen"

### Filter & Grid Resep

- Filter kategori (All | Bakso | Mie | Sosis)
- Grid 3 kolom (desktop), setiap card:
  - Gambar resep (area placeholder)
  - Label kategori (pill badge)
  - Judul resep (Playfair Display)
  - Deskripsi singkat
  - Estimasi waktu masak (icon jam)
  - Tombol "Lihat Resep"
- Framer Motion: masuk stagger dari bawah

---

## PAGE 6 — ARTIKEL (`/article`)

### Hero Section

- Heading: "Artikel"

### Grid Artikel

- Layout editorial magazine: artikel pertama featured besar (full width), sisanya 3 kolom
- Setiap artikel card:
  - Gambar thumbnail
  - Kategori label (merah accent)
  - Judul artikel (Playfair Display)
  - Tanggal & penulis
  - Excerpt singkat
- Hover: gambar scale up 105%, shadow meningkat

---

## PAGE 7 — KONTAK (`/kontak`)

### Hero Section

- Heading: "Kontak Kami"
- Subtext: `"Jangan ragu untuk berbicara dengan perwakilan kami. Hubungi melalui WhatsApp, surel, atau kunjungi factory kami langsung."`

### 2 Kolom Layout

#### Kiri: Informasi Kontak

- **Email:** marketing@basoyen.com
- **Marketing Horeka:** 0811-2335-080
- **Order Online:** 0896-7839-1030
- **Yen Factory** — Komp. Puri BKR Kav 61 Regol, Bandung
- **Meatball Factory YEN** — Jl. Pasirkaliki 106 Cidendo, Bandung
- **MOKO (Mobil Toko)** — Hanya Area Bandung
- WhatsApp buttons untuk tiap lokasi

#### Kanan: Form Kontak

- Fields: Name, Email, Phone Number, Message (textarea)
- Tombol: "Kirim Pesan" (filled accent red)
- Style form: floating label animation saat focus

### Google Maps Embed

- Full width di bawah 2 kolom
- Embed map Baso Yen BKR (sudah ada iframe embed dari konten asli)
- `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5951660440955!2d107.60981131085353!3d-6.938890793032152!...`

---

## ROUTING SETUP

Gunakan `react-router-dom` v6 dengan setup berikut:

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import TentangKami from "./pages/TentangKami";
import Layanan from "./pages/Layanan";
import Produk from "./pages/Produk";
import Resep from "./pages/Resep";
import Artikel from "./pages/Artikel";
import Kontak from "./pages/Kontak";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/resep" element={<Resep />} />
        <Route path="/article" element={<Artikel />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

---

## TAILWIND V4 CONFIG — CARA BARU (CSS-FIRST)

> ⚠️ **Tailwind v4 tidak lagi menggunakan `tailwind.config.js`**. Semua konfigurasi (custom colors, fonts, animasi, dsb.) sekarang ditulis langsung di dalam `src/index.css` menggunakan directive `@theme`. Tidak perlu file config JS sama sekali.

Semua konfigurasi custom Baso Yen sudah ada di `src/index.css` (lihat Step 3 di Setup Project di bawah).

---

## FRAMER MOTION PATTERNS WAJIB

### 1. Page Transition

```jsx
// Setiap page wrapper pakai ini
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
>
```

### 2. Scroll Reveal (Section Standard)

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
>
```

### 3. Staggered Children

```jsx
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6 } }
}
// Usage:
<motion.div variants={containerVariants} initial="hidden" whileInView="show">
  <motion.div variants={itemVariants}>Card 1</motion.div>
  <motion.div variants={itemVariants}>Card 2</motion.div>
</motion.div>
```

### 4. Hover Card Lift

```jsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(26,10,0,0.2)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

### 5. Navbar Scroll Effect

```jsx
const { scrollY } = useScroll();
const navBg = useTransform(
  scrollY,
  [0, 80],
  ["rgba(26,10,0,0)", "rgba(26,10,0,1)"],
);
```

### 6. Hero Text Stagger

```jsx
const heroText = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
```

---

## FILE STRUCTURE

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── SectionLabel.jsx
│       └── ScrollReveal.jsx   ← wrapper komponen reusable
├── pages/
│   ├── Beranda.jsx
│   ├── TentangKami.jsx
│   ├── Layanan.jsx
│   ├── Produk.jsx
│   ├── Resep.jsx
│   ├── Artikel.jsx
│   └── Kontak.jsx
├── data/
│   ├── products.js     ← data produk statis
│   ├── recipes.js      ← data resep statis
│   └── articles.js     ← data artikel statis
├── App.jsx
├── index.css
└── main.jsx
```

---

## DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^7",
    "framer-motion": "^12"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4",
    "tailwindcss": "^4",
    "@tailwindcss/typography": "^0.5",
    "vite": "^6"
  }
}
```

---

## SETUP PROJECT — LANGKAH DEMI LANGKAH

### Prasyarat

Pastikan sudah terinstall di komputer:

- **Node.js** versi 20+ → cek dengan `node -v`
- **npm** versi 10+ → cek dengan `npm -v`
- **Git** (opsional tapi disarankan)

---

### Step 1 — Buat Project Vite + React 19

```bash
npm create vite@latest .
```

Vite terbaru sudah otomatis menggunakan React 19. Cek `package.json` — pastikan versi react adalah `^19.x.x`.

---

### Step 2 — Install Semua Dependencies

```bash
# Install dependencies utama
npm install

# React Router v7
npm install react-router-dom@latest

# Framer Motion v12 (kompatibel React 19)
npm install motion

# Tailwind CSS v4 — pakai plugin Vite (BUKAN postcss seperti v3)
npm install -D tailwindcss@next @tailwindcss/vite@next

# Tailwind Typography plugin
npm install -D @tailwindcss/typography
```

> ⚠️ **Tailwind v4 tidak butuh `postcss.config.js` dan tidak butuh `npx tailwindcss init`**. Setup dilakukan via Vite plugin dan CSS `@import`.

---

### Step 3 — Konfigurasi `vite.config.js`

Buka `vite.config.js`, **ganti seluruh isinya** dengan:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← Tailwind v4 diload sebagai Vite plugin
  ],
});
```

> Di Tailwind v4, tidak ada lagi `postcss.config.js`. Tailwind dijalankan langsung sebagai Vite plugin — lebih cepat dan zero-config.

---

### Step 4 — Setup `src/index.css`

Tailwind v4 menggunakan **CSS-first configuration** — tidak ada `tailwind.config.js`. Semua tema custom ditulis di `@theme {}` langsung di CSS.

Buka `src/index.css`, **ganti seluruh isinya** dengan:

```css
/* Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&display=swap");

/* Tailwind v4 — satu baris ini menggantikan @tailwind base/components/utilities */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* =============================================
   TEMA CUSTOM BASO YEN — CSS-first config v4
   ============================================= */
@theme {
  /* Colors */
  --color-yen-dark: #1a0a00;
  --color-yen-accent: #c8410a;
  --color-yen-gold: #e8a838;
  --color-yen-cream: #f5efe0;
  --color-yen-neutral: #8b6f5e;
  --color-yen-white: #fdfaf5;

  /* Fonts */
  --font-playfair: "Playfair Display", serif;
  --font-jakarta: "Plus Jakarta Sans", sans-serif;
  --font-bebas: "Bebas Neue", cursive;
  --font-dm: "DM Serif Display", serif;

  /* Custom keyframe: marquee */
  --animate-marquee: marquee 30s linear infinite;

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}

/* =============================================
   BASE STYLES
   ============================================= */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-jakarta);
    background-color: var(--color-yen-white);
    color: var(--color-yen-dark);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* =============================================
   UTILITIES CUSTOM
   ============================================= */
@layer utilities {
  /* Noise grain texture overlay untuk dark sections & footer */
  .grain-overlay {
    position: relative;
  }

  .grain-overlay::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* Marquee infinite scroll */
  .animate-marquee {
    animation: var(--animate-marquee);
  }
}
```

> **Cara pakai custom class di Tailwind v4:**
> Karena `--color-yen-accent` didaftarkan di `@theme`, Tailwind otomatis generate class `bg-yen-accent`, `text-yen-accent`, `border-yen-accent`, dll. — sama seperti cara kerja v3 tapi tanpa config JS.
>
> Font: `font-playfair`, `font-jakarta`, `font-bebas`, `font-dm` langsung bisa dipakai di className.

---

### Step 5 — Setup `src/main.jsx`

React 19 menggunakan `createRoot` API yang sama, tapi ada perubahan kecil — tidak perlu import `React` secara eksplisit lagi (sudah auto-JSX transform):

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

### Step 6 — Setup `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import TentangKami from "./pages/TentangKami";
import Layanan from "./pages/Layanan";
import Produk from "./pages/Produk";
import Resep from "./pages/Resep";
import Artikel from "./pages/Artikel";
import Kontak from "./pages/Kontak";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Beranda />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/resep" element={<Resep />} />
        <Route path="/article" element={<Artikel />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
```

---

### Step 7 — Buat Folder Structure

Jalankan perintah berikut dari root project untuk buat semua folder dan file kosong sekaligus:

```bash
# Buat semua folder
mkdir -p src/components/ui
mkdir -p src/pages
mkdir -p src/data

# Buat file komponen
touch src/components/Navbar.jsx
touch src/components/Footer.jsx
touch src/components/ui/Button.jsx
touch src/components/ui/SectionLabel.jsx
touch src/components/ui/ScrollReveal.jsx

# Buat file halaman
touch src/pages/Beranda.jsx
touch src/pages/TentangKami.jsx
touch src/pages/Layanan.jsx
touch src/pages/Produk.jsx
touch src/pages/Resep.jsx
touch src/pages/Artikel.jsx
touch src/pages/Kontak.jsx

# Buat file data statis
touch src/data/products.js
touch src/data/recipes.js
touch src/data/articles.js
```

---

### Step 8 — Buat Komponen `ScrollReveal` (Reusable)

Buka `src/components/ui/ScrollReveal.jsx` dan isi dengan:

```jsx
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  className = "",
}) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 60 },
    right: { x: -60 },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

### Step 9 — Jalankan Dev Server

```bash
npm run dev
```

Buka browser ke `http://localhost:5173` — project siap dikerjakan!

---

### Step 10 — Build untuk Production

```bash
npm run build
```

Output ada di folder `dist/`. Untuk preview hasil build:

```bash
npm run preview
```

---

### Struktur Akhir Project

```
basoyen-redesign/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── SectionLabel.jsx
│   │       └── ScrollReveal.jsx
│   ├── pages/
│   │   ├── Beranda.jsx
│   │   ├── TentangKami.jsx
│   │   ├── Layanan.jsx
│   │   ├── Produk.jsx
│   │   ├── Resep.jsx
│   │   ├── Artikel.jsx
│   │   └── Kontak.jsx
│   ├── data/
│   │   ├── products.js
│   │   ├── recipes.js
│   │   └── articles.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js       ← Tailwind v4 dikonfig di sini (bukan postcss.config.js)
└── package.json
```

> ✅ **Tidak ada `tailwind.config.js`** dan **tidak ada `postcss.config.js`** — keduanya tidak dibutuhkan di Tailwind v4.

---

### Perbedaan Utama v3 → v4 yang Perlu Diingat

| Hal              | Tailwind v3                           | Tailwind v4                       |
| ---------------- | ------------------------------------- | --------------------------------- |
| Config           | `tailwind.config.js`                  | `@theme {}` di CSS                |
| CSS import       | `@tailwind base/components/utilities` | `@import "tailwindcss"`           |
| Plugin di Vite   | Via `postcss.config.js`               | Via `@tailwindcss/vite` plugin    |
| Custom colors    | `theme.extend.colors` di JS           | `--color-*` di `@theme`           |
| Custom fonts     | `theme.extend.fontFamily` di JS       | `--font-*` di `@theme`            |
| Custom keyframes | `theme.extend.keyframes` di JS        | `@keyframes` di dalam `@theme`    |
| Content scan     | Wajib definisikan di config           | **Otomatis** — tidak perlu config |

---

### Verifikasi Instalasi ✅

Setelah `npm run dev` berjalan, buka browser dan cek:

- `http://localhost:5173` → halaman muncul tanpa error
- Tidak ada error merah di terminal
- Di browser console, tidak ada error tentang Tailwind atau React
- Coba tulis `className="bg-yen-accent text-yen-white"` di sembarang elemen → kalau warna merah bata muncul, berarti Tailwind v4 sudah jalan ✅

Kalau semua hijau, lanjut coding page per page sesuai blueprint di atas! 🚀

---

## CATATAN PENTING UNTUK IMPLEMENTASI

1. **Gunakan `https://www.basoyen.com` sebagai base URL** untuk semua image yang sudah ada:
   - Hero: `https://www.basoyen.com/carousel/hero1.jpg`
   - About bg: `https://www.basoyen.com/homepage/basoyen-bg-01.jpg`
   - OG image: `https://www.basoyen.com/components/og-image.jpg`
   - Untuk produk & resep yang belum ada gambarnya, gunakan placeholder dengan background warna `#F5EFE0` dan text produk centered

2. **Data produk, resep, dan artikel** dibuat sebagai file JS statis di `/src/data/` karena tidak ada API. Minimal 5 produk, 4 resep, 3 artikel dummy.

3. **Semua link eksternal** (WhatsApp, Shopee, Tokopedia, GoFood, Marketplace) wajib buka di `target="_blank" rel="noopener noreferrer"`

4. **Aksesibilitas:** semua gambar punya `alt` text deskriptif, form punya label yang terhubung benar, warna kontras memenuhi WCAG AA minimum

5. **Responsive:** breakpoints Tailwind standar — `sm:640px` `md:768px` `lg:1024px` `xl:1280px`

6. **Jangan buat style AI generik:** tidak ada purple gradient, tidak ada Inter font, tidak ada card seragam putih boring dengan shadow tipis. Eksekusi dengan bold & intentional.
