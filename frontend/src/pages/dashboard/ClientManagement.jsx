import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, AlertCircle, UploadCloud } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminClients, useSaveClient, useDeleteClient } from "../../hooks/admin/useAdminClients";

export default function ClientManagement() {
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /**
   * Mengambil data klien menggunakan Custom Hook
   */
  const { data: clients = [], isLoading: isLoadingClients } = useAdminClients();

  const isLoading = isLoadingClients;

  /**
   * Membuka modal form dalam mode 'Tambah Mitra'.
   * Mengosongkan form dan gambar agar siap diisi logo baru.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: "" });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Edit Mitra'.
   * @param {object} item - Data mitra yang akan diedit
   */
  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name });
    setImageFile(null);
    setImagePreview(item.image);
    setIsModalOpen(true);
  };

  /**
   * Mengelola perubahan saat admin memilih file gambar logo.
   * @param {object} e - Event onChange file input
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Mutasi untuk menyimpan klien menggunakan Custom Hook
   */
  const saveMutation = useSaveClient({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menyimpan klien.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani pengiriman form (submit) untuk mitra baru atau edit mitra.
   * @param {object} e - Event submit form bawaan browser
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
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal peringatan hapus mitra.
   * @param {object} item - Data mitra yang akan dihapus
   */
  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus klien (mitra) menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteClient({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus klien.");
      setIsSubmitting(false);
    }
  });

  /**
   * Mengeksekusi penghapusan mitra setelah tombol konfirmasi ditekan.
   */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(itemToDelete.id);
  };

  const filteredData = clients;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Mitra & Klien</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola logo restoran, supermarket, atau bisnis mitra Anda.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Mitra</span>
        </button>
      </div>

      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading && (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-yen-accent" />
              <p>Memuat data mitra...</p>
            </div>
          )}

          {!isLoading && filteredData.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-500">
              Belum ada logo mitra yang ditambahkan.
            </div>
          )}

          {!isLoading && filteredData.map((client) => (
            <div key={client.id} className="group relative bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-4 hover:shadow-lg hover:border-gray-200 transition-all">
              <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-2">
                <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-gray-800 text-center text-sm">{client.name}</p>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                <button onClick={() => handleOpenEditModal(client)} className="p-2.5 bg-white text-blue-600 rounded-full hover:scale-110 transition-transform">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleOpenDeleteModal(client)} className="p-2.5 bg-white text-red-600 rounded-full hover:scale-110 transition-transform">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Ubah Mitra" : "Tambah Mitra Baru"} maxWidth="max-w-md">
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Mitra / Bisnis</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Logo Perusahaan</label>
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><span className="text-white text-sm font-medium">Ubah Logo</span></div>
                </>
              ) : (
                <div className="text-center text-gray-500"><UploadCloud className="w-6 h-6 mx-auto mb-1"/><p className="text-sm">Pilih File Gambar</p></div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button type="submit" disabled={isSubmitting} className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Simpan
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Hapus Mitra">
        <div className="space-y-4">
          <p className="text-gray-600">Hapus mitra bisnis <span className="font-bold">"{itemToDelete?.name}"</span>?</p>
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
