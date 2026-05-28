import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, AlertCircle, UploadCloud } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminGalleries, useSaveGallery, useDeleteGallery } from "../../hooks/admin/useAdminGalleries";

export default function GalleryManagement() {
  const [filterType, setFilterType] = useState("ALL");
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    type: "FASILITAS_TENTANG_KAMI", 
    order: 0 
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /**
   * Mengambil data galeri menggunakan Custom Hook
   */
  const { data: galleries = [], isLoading: isLoadingGalleries } = useAdminGalleries();

  const isLoading = isLoadingGalleries;

  /**
   * Membuka modal form dalam mode 'Tambah Foto Galeri'.
   * Mengatur nilai bawaan tipe galeri sesuai filter yang sedang aktif (jika ada).
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", type: filterType === "ALL" ? "FASILITAS_TENTANG_KAMI" : filterType, order: 0 });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Ubah Foto Galeri'.
   * @param {object} item - Data foto galeri yang akan diedit
   */
  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormData({ 
      title: item.title, 
      description: item.description || "", 
      type: item.type, 
      order: item.order 
    });
    setImageFile(null);
    setImagePreview(item.image);
    setIsModalOpen(true);
  };

  /**
   * Menangani pemilihan gambar baru oleh pengguna dan menampilkan *preview*.
   * @param {object} e - Event onChange form input file
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Mutasi untuk menyimpan foto galeri menggunakan Custom Hook
   */
  const saveMutation = useSaveGallery({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menyimpan foto galeri.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani submit form untuk pembuatan atau pengubahan item galeri.
   * @param {object} e - Event submit dari browser
   */
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let submitData;
    let headers = {};

    if (imageFile) {
      submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("type", formData.type);
      submitData.append("order", formData.order);
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData, order: parseInt(formData.order) };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal konfirmasi hapus.
   * @param {object} item - Item galeri yang ingin dihapus
   */
  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus foto galeri menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteGallery({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus foto galeri.");
      setIsSubmitting(false);
    }
  });

  /**
   * Melakukan eksekusi penghapusan galeri setelah konfirmasi berhasil.
   */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(itemToDelete.id);
  };

  const filteredData = galleries.filter((g) => {
    return filterType === "ALL" || g.type === filterType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Galeri Foto</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola galeri kegiatan, pabrik, dan momen-momen Baso Yen.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Unggah Foto</span>
        </button>
      </div>

      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            <button onClick={() => setFilterType("ALL")} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filterType === "ALL" ? "bg-white text-yen-dark shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Semua</button>
            <button onClick={() => setFilterType("FASILITAS_TENTANG_KAMI")} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filterType === "FASILITAS_TENTANG_KAMI" ? "bg-white text-yen-dark shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Fasilitas / Pabrik</button>
            <button onClick={() => setFilterType("BERANDA_POLAROID")} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filterType === "BERANDA_POLAROID" ? "bg-white text-yen-dark shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Beranda (Polaroid)</button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-yen-accent" /></div>
        ) : filteredData.length === 0 ? (
          <div className="py-12 text-center text-gray-500">Koleksi foto belum tersedia untuk kategori ini.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="group rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-md text-yen-dark uppercase tracking-wider">
                    {item.type === 'FASILITAS_TENTANG_KAMI' ? 'Fasilitas' : 'Polaroid'}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={() => handleOpenEditModal(item)} className="p-2.5 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleOpenDeleteModal(item)} className="p-2.5 bg-white text-red-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description || "Tanpa deskripsi"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Ubah Info Foto" : "Unggah Foto Galeri"} maxWidth="max-w-md">
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Pilih Gambar</label>
            <div onClick={() => fileInputRef.current?.click()} className="w-full aspect-video border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><span className="text-white text-sm font-medium">Ganti Gambar</span></div>
                </>
              ) : (
                <div className="text-center text-gray-500"><UploadCloud className="w-8 h-8 mx-auto mb-2"/><p className="text-sm">Klik untuk mencari file (JPG, PNG)</p></div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Judul / Nama Tempat</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Lokasi Tayang</label>
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none appearance-none">
              <option value="FASILITAS_TENTANG_KAMI">Halaman Tentang Kami (Fasilitas)</option>
              <option value="BERANDA_POLAROID">Halaman Depan Beranda (Gaya Polaroid)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat (Opsional)</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="2" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none resize-none"></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button type="submit" disabled={isSubmitting} className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Hapus Foto">
        <div className="space-y-4">
          <p className="text-gray-600">Anda yakin ingin menghapus foto <span className="font-bold">"{itemToDelete?.title}"</span> dari galeri?</p>
          <div className="pt-4 flex justify-end gap-3">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button onClick={handleDelete} disabled={isSubmitting} className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
