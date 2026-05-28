/**
 * Data Duta & Testimoni Baso Yen
 * Masing-masing objek merepresentasikan satu reviewer / brand ambassador.
 *
 * Field:
 *  - id         : unique identifier
 *  - name       : nama reviewer
 *  - role       : jabatan / profesi
 *  - badge      : label badge (REKOMENDASI, KULINER MITRA, dll.)
 *  - rating     : jumlah bintang (1-5)
 *  - quote      : kalimat testimoni
 *  - avatarColor: warna latar avatar (hex / tailwind value)
 *  - direction  : animasi scroll ("right" | "left" | "up" | "down")
 */
export const testimonials = [
  {
    id: 1,
    name: "Devina",
    role: "Master Chef Season 5",
    badge: "REKOMENDASI",
    rating: 5,
    quote:
      "Makan yamien yang enak nggak perlu repot lagi, tinggal beli aja di Baso Yen. 1 paket sudah lengkap isi mie, bumbu minyak bawang, dan baksonya instan!",
    avatarColor: "#E31E24",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&crop=face&q=80",
    direction: "right",
  },
  {
    id: 2,
    name: "Chef Chandra",
    role: "Celebrity Chef",
    badge: "KULINER MITRA",
    rating: 5,
    quote:
      "Rasanya, teksturnya berkualitas super! Mesti coba karena sudah certified Halal MUI dan pastinya aman untuk kebutuhan katering premium.",
    avatarColor: "#FF8800",
    avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop&crop=face&q=80",
    direction: "left",
  },
  {
    id: 3,
    name: "Ibu Sari",
    role: "Ibu Rumah Tangga – Bandung",
    badge: "PELANGGAN SETIA",
    rating: 5,
    quote:
      "Anak-anak suka banget sama bakso Yen! Teksturnya kenyal, dagingnya terasa, dan yang paling penting bebas pengawet. Sudah langganan 3 tahun.",
    avatarColor: "#8B5CF6",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face&q=80",
    direction: "up",
  },
  {
    id: 4,
    name: "Pak Hendra",
    role: "Pemilik Warung Mie – Cimahi",
    badge: "B2B HOREKA",
    rating: 5,
    quote:
      "Saya sudah pakai produk Yen untuk warung saya selama 2 tahun. Pelanggan selalu bilang mienya beda – lebih kenyal dan segar dari merek lain.",
    avatarColor: "#059669",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face&q=80",
    direction: "up",
  },
];
