import { useState } from "react";
import { Plus, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminCategoriesAll, useSaveCategory, useDeleteCategory } from "../../hooks/admin/useAdminCategories";

/**
 * Halaman Manajemen Kategori (Dasbor)
 * Mendukung fungsi CRUD (Create, Read, Update, Delete)
 */
export default function CategoryManagement() {
  const [error, setError] = useState(null);

  // State untuk Modal Form (Tambah / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Data form
  const [formData, setFormData] = useState({ name: "", type: "PRODUCT" });

  // State untuk Modal Konfirmasi Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  /**
   * Mengambil data kategori menggunakan Custom Hook
   */
  const { data: categories = [], isLoading: isLoadingCategories } = useAdminCategoriesAll();

  const isLoading = isLoadingCategories;

  /**
   * Membuka modal form dalam mode 'Tambah Kategori'.
   * Mengosongkan form agar siap diisi data baru.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", type: "PRODUCT" });
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Edit Kategori'.
   * Mengisi form dengan data dari kategori yang dipilih.
   * @param {object} category - Data kategori yang ingin diedit
   */
  const handleOpenEditModal = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, type: category.type });
    setIsModalOpen(true);
  };

  /**
   * Membuka modal peringatan sebelum menghapus kategori.
   * @param {object} category - Data kategori yang akan dihapus
   */
  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  // Fungsi: Kirim data form (Tambah atau Edit) ke Backend
  /**
   * Mutasi untuk menyimpan kategori menggunakan Custom Hook
   */
  const saveMutation = useSaveCategory({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Terjadi kesalahan saat menyimpan data.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani pengiriman form kategori (baik saat tambah maupun edit).
   * @param {object} e - Event submit form bawaan browser
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    saveMutation.mutate({ submitData: formData, editingId });
  };

  /**
   * Mutasi untuk menghapus kategori menggunakan Custom Hook
   */
  const deleteMutation = useDeleteCategory({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus kategori. Mungkin kategori ini sedang digunakan.");
      setIsSubmitting(false);
    }
  });

  /**
   * Mengeksekusi penghapusan kategori saat tombol konfirmasi diklik.
   */
  const handleDelete = () => {
    if (!categoryToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(categoryToDelete.id);
  };

  // Kategori
  const filteredCategories = categories;

  return (
    <div className="space-y-6">
      {/* --- HEADER HALAMAN --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Kategori</h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola pembagian grup untuk Produk, Resep, dan Artikel.
          </p>
        </div>

        {/* Tombol Tambah */}
        <button
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* --- PESAN ERROR GLOBAL --- */}
      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* --- KOTAK PENCARIAN & TABEL --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="font-semibold px-6 py-4">Nama Kategori</th>
                <th className="font-semibold px-6 py-4">Slug (URL)</th>
                <th className="font-semibold px-6 py-4">Jenis</th>
                <th className="font-semibold px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Jika Sedang Loading */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-yen-accent" />
                    Memuat data...
                  </td>
                </tr>
              )}

              {/* Jika Data Kosong */}
              {!isLoading && filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Belum ada data kategori.
                  </td>
                </tr>
              )}

              {/* Loop Data Kategori */}
              {!isLoading &&
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-yen-dark">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                          category.type === "PRODUCT"
                            ? "bg-blue-100 text-blue-600"
                            : category.type === "RECIPE"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {category.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(category)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(category)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
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

      {/* --- MODAL TAMBAH / EDIT KATEGORI --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Ubah Kategori" : "Tambah Kategori Baru"}
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {/* Pesan Error di dalam Modal */}
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 focus:border-yen-accent/50 transition-colors"
              placeholder="Contoh: Baso Sapi"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Peruntukan (Jenis)
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 focus:border-yen-accent/50 transition-colors cursor-pointer appearance-none"
            >
              <option value="PRODUCT">Kategori Produk</option>
              <option value="RECIPE">Kategori Resep</option>
              <option value="ARTICLE">Kategori Artikel / Blog</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
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
              {editingId ? "Simpan Perubahan" : "Simpan Kategori"}
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
            Apakah Anda yakin ingin menghapus kategori
            <span className="font-bold text-yen-dark mx-1">
              "{categoryToDelete?.name}"
            </span>
            ?
          </p>
          <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 text-orange-800 text-sm">
            <span className="font-bold block mb-1">Peringatan:</span>
            Kategori tidak dapat dihapus jika masih ada Produk/Artikel/Resep
            yang menggunakan kategori ini.
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
