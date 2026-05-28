import { useState, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  UploadCloud,
  Star,
} from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminProducts, useSaveProduct, useDeleteProduct } from "../../hooks/admin/useAdminProducts";
import { useAdminCategoriesByType } from "../../hooks/admin/useAdminCategories";

/**
 * Halaman Manajemen Produk
 * Mendukung fungsi CRUD dan Upload Gambar Produk
 */
export default function ProductManagement() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // State untuk Modal Form (Tambah / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State untuk form produk (termasuk file gambar)
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    packSize: "",
    description: "",
    badge: "",
  });

  // State khusus untuk menangani file gambar yang diunggah
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // State untuk Modal Konfirmasi Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  /**
   * Mengambil data produk dan kategori menggunakan Custom Hooks
   */
  const { data: products = [], isLoading: isLoadingProducts } = useAdminProducts();
  const { data: categories = [] } = useAdminCategoriesByType("PRODUCT");

  const isLoading = isLoadingProducts;

  /**
   * Membuka modal untuk menambah produk baru
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      packSize: "",
      description: "",
      badge: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal untuk mengubah (edit) produk yang sudah ada
   */
  const handleOpenEditModal = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      categoryId: product.categoryId || "",
      packSize: product.packSize || "",
      description: product.description || "",
      badge: product.badge || "",
    });
    setImageFile(null);
    setImagePreview(product.image); // Tampilkan gambar lama dari URL Cloudinary
    setIsModalOpen(true);
  };

  /**
   * Menangani ketika admin memilih file gambar dari komputernya
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Buat URL sementara agar gambar bisa dipratinjau (preview) di layar
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  /**
   * Mutasi (Operasi Ubah Data) untuk Simpan Produk menggunakan Custom Hook.
   */
  const saveMutation = useSaveProduct({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Terjadi kesalahan saat menyimpan produk.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani saat tombol 'Simpan' pada form diklik.
   * Menyiapkan objek FormData jika ada gambar yang diunggah, atau objek JSON biasa jika tidak ada.
   * Lalu memanggil `saveMutation` untuk mengeksekusi request ke backend.
   * @param {object} e - Event form submit
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let submitData;
    let headers = {};

    if (imageFile) {
      submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("categoryId", formData.categoryId);
      submitData.append("packSize", formData.packSize);
      submitData.append("description", formData.description);
      submitData.append("badge", formData.badge);
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal konfirmasi penghapusan produk.
   * @param {object} product - Data produk yang ingin dihapus
   */
  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk Hapus Produk menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteProduct({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus produk.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menjalankan aksi hapus setelah dikonfirmasi di dalam modal.
   * Menggunakan `deleteMutation` untuk melakukan request DELETE.
   */
  const handleDelete = () => {
    if (!productToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(productToDelete.id);
  };

  // Filter pencarian berdasarkan nama produk
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Produk</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola katalog produk.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Pesan Error Global */}
      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Area Tabel & Pencarian */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="font-semibold px-6 py-4 w-20">Foto</th>
                <th className="font-semibold px-6 py-4">Informasi Produk</th>
                <th className="font-semibold px-6 py-4">Ukuran Kemasan</th>
                <th className="font-semibold px-6 py-4">Badge</th>
                <th className="font-semibold px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-yen-accent" />
                    Memuat data...
                  </td>
                </tr>
              )}

              {!isLoading && filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {search
                      ? "Produk tidak ditemukan."
                      : "Katalog produk masih kosong."}
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {product.image ? (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-yen-dark">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.category?.name || "Tanpa Kategori"}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        /{product.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-yen-dark">
                        {product.packSize}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {product.badge ? (
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full flex items-center w-fit gap-1">
                          <Star className="w-3 h-3 fill-yellow-500" />{" "}
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL TAMBAH / EDIT PRODUK --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Ubah Produk" : "Tambah Produk Baru"}
        maxWidth="max-w-2xl" // Modal lebih lebar karena formnya banyak
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kolom 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50"
                  placeholder="Contoh: Mie Telur Spesial"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 appearance-none"
                >
                  <option value="" disabled>
                    Pilih kategori...
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Ukuran Kemasan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.packSize}
                    onChange={(e) =>
                      setFormData({ ...formData, packSize: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50"
                    placeholder="Contoh: 50 Pcs / 500 Gram"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Label / Badge (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none"
                  placeholder="Misal: Best Seller, Baru, Promo..."
                />
              </div>
            </div>

            {/* Kolom 2: Upload Gambar */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Foto Produk
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-[200px] border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-2xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group"
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Ganti Foto
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">
                      Klik untuk unggah foto
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Maks. 5MB (JPG, PNG, WebP)
                    </p>
                  </div>
                )}

                {/* Input File Tersembunyi */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg, image/png, image/webp"
                  className="hidden"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="6"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 resize-y"
                  placeholder="Jelaskan sedikit tentang produk ini..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Simpan Perubahan" : "Simpan Produk"}
            </button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL KONFIRMASI HAPUS --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <div className="space-y-4">
          {error && isDeleteModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <p className="text-gray-600">
            Apakah Anda yakin ingin menghapus produk
            <span className="font-bold text-yen-dark mx-1">
              "{productToDelete?.name}"
            </span>
            ?
          </p>
          <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-red-800 text-sm">
            <span className="font-bold block mb-1">Peringatan:</span>
            Aksi ini tidak dapat dibatalkan. Foto produk juga akan terhapus.
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Ya, Hapus Saja
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
