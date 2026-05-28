import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, AlertCircle, Image as ImageIcon, UploadCloud } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Modal from "../../components/ui/Modal";
import { useAdminRecipes, useSaveRecipe, useDeleteRecipe } from "../../hooks/admin/useAdminRecipes";
import { useAdminCategoriesByType } from "../../hooks/admin/useAdminCategories";

/**
 * Halaman Manajemen Resep
 * Mirip dengan Artikel, namun ada atribut tambahan: Waktu Memasak & Kesulitan.
 */
export default function RecipeManagement() {
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
    time: "",
    difficulty: "Mudah",
    description: "",
    content: "",
  });
  
  // State File (Gambar Masakan)
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // State Konfirmasi Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Konfigurasi Toolbar Quill Editor
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  /**
   * Mengambil data resep & kategori khusus resep menggunakan Custom Hooks
   */
  const { data: recipes = [], isLoading: isLoadingRecipes } = useAdminRecipes();
  const { data: categories = [] } = useAdminCategoriesByType("RECIPE");

  const isLoading = isLoadingRecipes;

  /**
   * Membuka modal form dalam mode 'Tambah Resep'.
   * Mengosongkan isian form dan pratinjau gambar.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      time: "",
      difficulty: "Mudah",
      description: "",
      content: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Edit Resep'.
   * Mengisi form dengan data dari resep yang dipilih.
   * @param {object} recipe - Data resep yang ingin diedit
   */
  const handleOpenEditModal = (recipe) => {
    setEditingId(recipe.id);
    setFormData({
      title: recipe.title,
      categoryId: recipe.categoryId || "",
      time: recipe.time || "",
      difficulty: recipe.difficulty || "Mudah",
      description: recipe.description || "",
      content: recipe.content || "",
    });
    setImageFile(null);
    setImagePreview(recipe.image);
    setIsModalOpen(true);
  };

  /**
   * Menangani perubahan file gambar saat diunggah.
   * Menghasilkan URL pratinjau sementara.
   * @param {object} e - Event form submit
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Mutasi untuk menyimpan resep menggunakan Custom Hook
   */
  const saveMutation = useSaveRecipe({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Terjadi kesalahan saat menyimpan resep.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani submit form untuk pembuatan atau pengubahan resep.
   * Menyiapkan FormData jika ada gambar.
   * @param {object} e - Event onSubmit dari form
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const strippedContent = formData.content.replace(/<[^>]*>?/gm, '').trim();
    if (strippedContent.length < 5) {
      setError("Isi resep masakan masih terlalu pendek atau kosong.");
      setIsSubmitting(false);
      return;
    }

    let submitData;
    let headers = {};

    if (imageFile) {
      submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("categoryId", formData.categoryId);
      submitData.append("time", formData.time);
      submitData.append("difficulty", formData.difficulty);
      submitData.append("description", formData.description);
      submitData.append("content", formData.content);
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal peringatan hapus resep.
   * @param {object} recipe - Data resep yang akan dihapus
   */
  const handleOpenDeleteModal = (recipe) => {
    setRecipeToDelete(recipe);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus resep menggunakan Custom Hook
   */
  const deleteMutation = useDeleteRecipe({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus resep.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani eksekusi penghapusan resep.
   */
  const handleDelete = () => {
    if (!recipeToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(recipeToDelete.id);
  };

  const filteredRecipes = recipes.filter((r) => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Resep Masakan</h1>
          <p className="text-gray-500 text-sm mt-1">Bagikan kreasi olahan masakan menggunakan produk Baso Yen.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Buat Resep Baru</span>
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
            placeholder="Cari resep..."
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
                <th className="font-semibold px-6 py-4">Nama Resep</th>
                <th className="font-semibold px-6 py-4">Spesifikasi</th>
                <th className="font-semibold px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-yen-accent" />
                    Memuat data...
                  </td>
                </tr>
              )}

              {!isLoading && filteredRecipes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    {search ? "Resep tidak ditemukan." : "Katalog resep masih kosong."}
                  </td>
                </tr>
              )}

              {!isLoading && filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {recipe.image ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                        <img src={recipe.image} alt="Thumb" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-yen-dark text-lg">{recipe.title}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">/{recipe.slug}</p>
                    <span className="inline-block mt-2 bg-orange-50 text-orange-600 px-3 py-1 text-xs font-bold rounded-full">
                      {recipe.category?.name || "Tanpa Kategori"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <p><span className="font-semibold text-gray-400 w-16 inline-block">Waktu</span>: {recipe.time}</p>
                      <p><span className="font-semibold text-gray-400 w-16 inline-block">Level</span>: 
                        <span className={`ml-1 ${
                          recipe.difficulty === 'Mudah' ? 'text-green-600' :
                          recipe.difficulty === 'Sedang' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{recipe.difficulty}</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEditModal(recipe)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleOpenDeleteModal(recipe)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM RESEP */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? "Ubah Resep" : "Buat Resep Baru"}
        maxWidth="max-w-5xl" // Modal sangat lebar karena kontennya luas
      >
        <form onSubmit={handleSubmitForm} className="space-y-5">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Kolom Kiri: Metadata & Gambar (1/3 Lebar) */}
            <div className="space-y-4 lg:col-span-1">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Resep</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50"
                  placeholder="Contoh: Mie Yamin Spesial..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Kategori Resep</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 appearance-none"
                >
                  <option value="" disabled>Pilih kategori...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Estimasi Waktu</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50"
                    placeholder="Misal: 30 Menit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tingkat Kesulitan</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 appearance-none"
                  >
                    <option value="Sangat Mudah">Sangat Mudah</option>
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Pengantar / Deskripsi</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yen-accent/50 resize-y"
                  placeholder="Ceritakan keistimewaan resep ini..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Foto Hasil Masakan</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group"
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Ganti Foto</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-2">
                      <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Unggah Foto Makanan</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Rich Text Editor (2/3 Lebar) */}
            <div className="lg:col-span-2 flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-1">Bahan & Cara Memasak</label>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 flex flex-col min-h-[500px]">
                <ReactQuill 
                  theme="snow"
                  modules={quillModules}
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="h-full pb-10" 
                  placeholder="Tuliskan daftar bahan-bahan dan langkah-langkah memasaknya..."
                />
              </div>
            </div>

          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
              Batal
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-yen-accent hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Simpan Perubahan" : "Terbitkan Resep"}
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL HAPUS */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Penghapusan">
        <div className="space-y-4">
          <p className="text-gray-600">
            Yakin ingin menghapus resep masakan <span className="font-bold">"{recipeToDelete?.title}"</span>?
          </p>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button onClick={handleDelete} disabled={isSubmitting} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Hapus
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
