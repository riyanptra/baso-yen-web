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
} from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Style bawaan untuk Quill Editor
import Modal from "../../components/ui/Modal";
import { useAdminArticles, useSaveArticle, useDeleteArticle } from "../../hooks/admin/useAdminArticles";
import { useAdminCategoriesByType } from "../../hooks/admin/useAdminCategories";

/**
 * Halaman Manajemen Artikel
 * Mendukung fitur Rich Text Editor (Quill) untuk konten artikel
 */
export default function ArticleManagement() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // State Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State Form
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    excerpt: "",
    content: "",
  });

  // State File (Thumbnail Artikel)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // State Konfirmasi Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  // Konfigurasi Toolbar untuk React Quill
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"], // Bisa tambah 'image' jika ingin admin bisa insert gambar di tengah teks
      ["clean"],
    ],
  };

  /**
   * Mengambil data artikel & kategori menggunakan Custom Hooks
   */
  const { data: articles = [], isLoading: isLoadingArticles } = useAdminArticles();
  const { data: categories = [] } = useAdminCategoriesByType("ARTICLE");

  const isLoading = isLoadingArticles;

  /**
   * Membuka modal form dalam mode 'Tambah Artikel'.
   * Mengosongkan seluruh form dan *preview* gambar agar siap diisi data baru.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      excerpt: "",
      content: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Ubah Artikel'.
   * Mengisi form dengan data dari artikel yang dipilih.
   * @param {object} article - Data artikel yang ingin diedit
   */
  const handleOpenEditModal = (article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      categoryId: article.categoryId || "",
      excerpt: article.excerpt || "",
      content: article.content || "",
    });
    setImageFile(null);
    setImagePreview(article.image);
    setIsModalOpen(true);
  };

  /**
   * Menangkap perubahan pada input file gambar.
   * Menyimpan file mentah untuk diunggah, dan membuat URL *preview* sementara agar admin bisa melihat gambarnya.
   * @param {object} e - Event onChange dari input tipe file
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Mutasi untuk menyimpan artikel menggunakan Custom Hook
   */
  const saveMutation = useSaveArticle({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan artikel.",
      );
      setIsSubmitting(false);
    },
  });

  /**
   * Menangani saat tombol 'Simpan' pada form diklik.
   * Akan menyiapkan data yang diperlukan (termasuk *multipart formData* jika ada file gambar)
   * dan mengirimkannya menggunakan `saveMutation`.
   * @param {object} e - Event bawaan dari onSubmit form
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Quill terkadang menyisakan tag kosong <p><br></p>, kita pastikan isinya benar-benar ada
    const strippedContent = formData.content.replace(/<[^>]*>?/gm, "").trim();
    if (strippedContent.length < 5) {
      setError("Isi artikel masih terlalu pendek atau kosong.");
      setIsSubmitting(false);
      return;
    }

    let submitData;
    let headers = {};

    if (imageFile) {
      submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("categoryId", formData.categoryId);
      submitData.append("excerpt", formData.excerpt);
      submitData.append("content", formData.content);
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal konfirmasi hapus.
   * @param {object} article - Data artikel yang ingin dihapus
   */
  const handleOpenDeleteModal = (article) => {
    setArticleToDelete(article);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus artikel menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteArticle({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus artikel.");
      setIsSubmitting(false);
    },
  });

  /**
   * Menangani eksekusi penghapusan artikel ketika tombol 'Ya, Hapus' ditekan di modal.
   * Akan menggunakan `deleteMutation` untuk melakukan panggil API.
   */
  const handleDelete = () => {
    if (!articleToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(articleToDelete.id);
  };

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Artikel Blog</h1>
          <p className="text-gray-500 text-sm mt-1">
            Tulis dan kelola artikel, berita, atau informasi untuk pengunjung.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Cari judul artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="font-semibold px-6 py-4 w-24">Gambar</th>
                <th className="font-semibold px-6 py-4">Judul Artikel</th>
                <th className="font-semibold px-6 py-4">Kategori</th>
                <th className="font-semibold px-6 py-4">Tanggal Publikasi</th>
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

              {!isLoading && filteredArticles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {search
                      ? "Artikel tidak ditemukan."
                      : "Belum ada artikel yang ditulis."}
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {article.image ? (
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={article.image}
                            alt="Thumb"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-14 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-yen-dark">{article.title}</p>
                      <p className="text-xs text-gray-400 font-mono mt-1">
                        /{article.slug}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-bold rounded-full">
                        {article.category?.name || "Tanpa Kategori"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(article)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(article)}
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

      {/* MODAL FORM ARTIKEL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Ubah Artikel" : "Tulis Artikel Baru"}
        maxWidth="max-w-4xl" // Sangat lebar karena editor Quill memakan tempat
      >
        <form onSubmit={handleSubmitForm} className="space-y-5">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kolom Kiri: Metadata & Gambar (1/3 Lebar) */}
            <div className="space-y-4 md:col-span-1">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50"
                  placeholder="Contoh: Manfaat Daging Sapi..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Kategori Blog
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

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Cuplikan (Excerpt)
                </label>
                <textarea
                  required
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows="4"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 resize-y"
                  placeholder="Ringkasan pendek yang muncul di halaman depan..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Gambar Sampul
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group"
                >
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          Ganti Foto
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-2">
                      <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs font-medium text-gray-600">
                        Unggah Sampul
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Rich Text Editor (2/3 Lebar) */}
            <div className="md:col-span-2 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Isi Artikel
              </label>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col min-h-[400px]">
                {/* 
                  React Quill merender editornya ke dalam div ini.
                  Kita beri tinggi 100% agar editornya menyesuaikan ruang yang tersedia.
                */}
                <ReactQuill
                  theme="snow"
                  modules={quillModules}
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="h-full pb-10" // Padding bottom karena toolbar memakan ruang
                  placeholder="Mulai ketik isi artikel Anda di sini..."
                />
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
              className="bg-yen-accent hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Simpan Perubahan" : "Terbitkan Artikel"}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL HAPUS */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Yakin ingin menghapus artikel{" "}
            <span className="font-bold">"{articleToDelete?.title}"</span>?
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{" "}
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
