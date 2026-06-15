export const whatsappConfig = {
  phoneNumber: "6289628108000",
     
  generateOrderUrl: () => {
    const message =
      "Halo Admin Baso Yen, boleh minta dikirimkan katalog produk lengkap beserta daftar harganya";

    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
  },

  generateContactUrl: () => {
    const message =
      "Halo Admin Baso yen, saya ingin bertanya lebih lanjut tentang produk anda.";

    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
  },

  generateKemitraanUrl: () => {
    const message =
      "Halo Admin Baso yen, saya ingin bertanya lebih lanjut tentang kemitraan.";

    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
  },

  generatePengirimanUrl: () => {
    const message =
      "Halo Admin Baso yen, saya ingin bertanya lebih lanjut tentang pengiriman luar kota.";

    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodeURIComponent(message)}`;
  },
};
