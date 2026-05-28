import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, AlertCircle, UploadCloud, Star } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminTestimonials, useSaveTestimonial, useDeleteTestimonial } from "../../hooks/admin/useAdminTestimonials";

export default function TestimonialManagement() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    tag: "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /**
   * Mengambil data testimoni menggunakan Custom Hook
   */
  const { data: testimonials = [], isLoading: isLoadingTestimonials } = useAdminTestimonials();

  const isLoading = isLoadingTestimonials;

  /**
   * Membuka modal form dalam mode 'Tambah Testimoni'.
   * Mengosongkan form agar bersih dari sisa data sebelumnya.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", content: "", rating: 5, tag: "" });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Ubah Testimoni'.
   * Mengisi inputan dengan data lama testimoni.
   * @param {object} item - Data testimoni yang dipilih
   */
  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating || 5,
      tag: item.tag || "",
    });
    setImageFile(null);
    setImagePreview(item.avatar);
    setIsModalOpen(true);
  };

  /**
   * Menangani aksi ketika file gambar profil (avatar) diubah.
   * Menampilkan pratinjau gambar.
   * @param {object} e - Event onChange input file
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Mutasi untuk menyimpan testimoni menggunakan Custom Hook
   */
  const saveMutation = useSaveTestimonial({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menyimpan ulasan.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani pengiriman form (submit) untuk menambah atau mengubah testimoni.
   * Mengirimkan data via `saveMutation` (menggunakan FormData jika terdapat foto profil).
   * @param {object} e - Event submit bawaan form browser
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
      submitData.append("role", formData.role);
      submitData.append("content", formData.content);
      submitData.append("rating", formData.rating);
      submitData.append("tag", formData.tag);
      submitData.append("avatar", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData, rating: parseInt(formData.rating) };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal peringatan hapus testimoni.
   * @param {object} item - Data testimoni yang ingin dihapus
   */
  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus data testimoni ke server menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteTestimonial({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus ulasan.");
      setIsSubmitting(false);
    }
  });

  /**
   * Mengeksekusi mutasi penghapusan setelah dikonfirmasi pengguna di modal.
   */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(itemToDelete.id);
  };

  const filteredData = testimonials.filter((t) => 
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Testimoni Pelanggan</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola ulasan dari para mitra, pembeli, maupun restoran.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Ulasan</span>
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
            placeholder="Cari nama pemberi ulasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-gray-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="font-semibold px-6 py-4 w-20">Avatar</th>
                <th className="font-semibold px-6 py-4">Informasi Pengulas</th>
                <th className="font-semibold px-6 py-4">Isi Testimoni</th>
                <th className="font-semibold px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-yen-accent" /> Memuat data...
                  </td>
                </tr>
              )}
              {!isLoading && filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    {search ? "Ulasan tidak ditemukan." : "Belum ada testimoni."}
                  </td>
                </tr>
              )}
              {!isLoading && filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {item.avatar ? (
                      <img src={item.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-xl font-bold text-gray-400">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-yen-dark">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{item.content}</p>
                    {item.tag && <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full uppercase tracking-wider font-bold">{item.tag}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenEditModal(item)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleOpenDeleteModal(item)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Ubah Testimoni" : "Tambah Testimoni Baru"} maxWidth="max-w-xl">
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Pengulas</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Peran / Profesi</label>
              <input type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="Misal: Pemilik Restoran / Ibu Rumah Tangga" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Rating (Angka 1-5)</label>
              <input 
                type="number" 
                min="1" 
                max="5"
                value={formData.rating} 
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" 
                placeholder="Ketik angka 1 sampai 5" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Label (Tag/Opsional)</label>
              <input type="text" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="Misal: LANGGANAN B2B" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Foto / Avatar (Opsional)</label>
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-white" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><span className="text-white text-xs font-medium">Ubah</span></div>
                </>
              ) : (
                <div className="text-center text-gray-500"><UploadCloud className="w-5 h-5 mx-auto mb-1"/><p className="text-xs">Unggah Avatar</p></div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Isi Ulasan</label>
            <textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none resize-y"></textarea>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button type="submit" disabled={isSubmitting} className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Hapus Ulasan">
        <div className="space-y-4">
          <p className="text-gray-600">Hapus ulasan dari <span className="font-bold">"{itemToDelete?.name}"</span>?</p>
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
