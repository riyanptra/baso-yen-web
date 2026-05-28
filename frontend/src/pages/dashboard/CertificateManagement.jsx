import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, AlertCircle, UploadCloud, FileBadge } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useAdminCertificates, useSaveCertificate, useDeleteCertificate } from "../../hooks/admin/useAdminCertificates";

export default function CertificateManagement() {
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    authority: "",
    scope: "",
    registrationNumber: "",
    link: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /**
   * Mengambil data sertifikat menggunakan Custom Hook
   */
  const { data: certificates = [], isLoading: isLoadingCertificates } = useAdminCertificates();

  const isLoading = isLoadingCertificates;

  /**
   * Membuka modal form dalam mode 'Tambah Sertifikat'.
   * Mengosongkan isian form dan file gambar sebelumnya.
   */
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({ name: "", authority: "", scope: "", registrationNumber: "", link: "" });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  /**
   * Membuka modal form dalam mode 'Ubah Sertifikat'.
   * Mengisi field form dengan data dari sertifikat yang ingin diubah.
   * @param {object} item - Data sertifikat yang dipilih
   */
  const handleOpenEditModal = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      authority: item.authority,
      scope: item.scope,
      registrationNumber: item.registrationNumber,
      link: item.link || ""
    });
    setImageFile(null);
    setImagePreview(item.image);
    setIsModalOpen(true);
  };

  /**
   * Menangani saat pengguna memilih file gambar untuk sertifikat.
   * Menyiapkan file untuk diunggah sekaligus menampilkan preview di layar.
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
   * Mutasi untuk menyimpan sertifikat menggunakan Custom Hook
   */
  const saveMutation = useSaveCertificate({
    onSuccess: () => {
      setIsModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menyimpan sertifikat.");
      setIsSubmitting(false);
    }
  });

  /**
   * Menangani pengiriman form (submit) untuk menambah atau mengubah sertifikat.
   * Membungkus data ke dalam FormData jika terdapat gambar agar bisa dikirim multipart.
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
      submitData.append("name", formData.name);
      submitData.append("authority", formData.authority);
      submitData.append("scope", formData.scope);
      submitData.append("registrationNumber", formData.registrationNumber);
      if (formData.link) submitData.append("link", formData.link);
      submitData.append("image", imageFile);
      headers = { "Content-Type": "multipart/form-data" };
    } else {
      submitData = { ...formData };
    }

    saveMutation.mutate({ submitData, editingId, headers });
  };

  /**
   * Membuka modal konfirmasi hapus untuk sertifikat tertentu.
   * @param {object} item - Data sertifikat yang ingin dihapus
   */
  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus data sertifikat ke backend menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteCertificate({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal menghapus sertifikat.");
      setIsSubmitting(false);
    }
  });

  /**
   * Mengeksekusi mutasi penghapusan setelah pengguna mengonfirmasi pada modal hapus.
   */
  const handleDelete = () => {
    if (!itemToDelete) return;
    setIsSubmitting(true);
    deleteMutation.mutate(itemToDelete.id);
  };

  const filteredData = certificates;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Legalitas & Sertifikasi</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola dokumen izin usaha, sertifikat halal, BPOM, dan standar mutu lainnya.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Sertifikat</span>
        </button>
      </div>

      {error && !isModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="font-semibold px-6 py-4 w-20">Dokumen</th>
                <th className="font-semibold px-6 py-4">Informasi Sertifikasi</th>
                <th className="font-semibold px-6 py-4">Penerbit & Nomor</th>
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
                    Belum ada data sertifikasi.
                  </td>
                </tr>
              )}
              {!isLoading && filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {item.image ? (
                      <div className="w-16 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                        <img src={item.image} alt="Sertifikat" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-20 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-400">
                        <FileBadge className="w-8 h-8" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-yen-dark text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Cakupan: <span className="font-medium text-gray-700">{item.scope}</span></p>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 inline-block">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">{item.authority}</p>
                      <p className="text-sm font-mono text-gray-800">{item.registrationNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenEditModal(item)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleOpenDeleteModal(item)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Ubah Sertifikat" : "Tambah Sertifikat Baru"} maxWidth="max-w-2xl">
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {error && isModalOpen && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Sertifikat</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="Misal: Sertifikat Halal" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Lembaga / Otoritas Penerbit</label>
              <input type="text" required value={formData.authority} onChange={(e) => setFormData({ ...formData, authority: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="Misal: LPPOM MUI / BPOM RI" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nomor Registrasi / SK</label>
              <input type="text" required value={formData.registrationNumber} onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="ID0021000..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Cakupan (Scope)</label>
              <input type="text" required value={formData.scope} onChange={(e) => setFormData({ ...formData, scope: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="Misal: Produk Olahan Daging" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tautan Dokumen Resmi (Opsional)</label>
            <input type="url" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Foto / Hasil Scan Dokumen (Opsional)</label>
            <div onClick={() => fileInputRef.current?.click()} className="w-full h-40 border-2 border-dashed border-gray-300 hover:border-yen-accent rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden transition-colors relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center"><span className="text-white text-sm font-medium">Ubah Dokumen</span></div>
                </>
              ) : (
                <div className="text-center text-gray-500"><UploadCloud className="w-8 h-8 mx-auto mb-2"/><p className="text-sm">Klik untuk mengunggah gambar/scan sertifikat</p></div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100">Batal</button>
            <button type="submit" disabled={isSubmitting} className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Simpan Data
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Hapus Sertifikat">
        <div className="space-y-4">
          <p className="text-gray-600">Hapus dokumen <span className="font-bold">"{itemToDelete?.name}"</span> dari sistem?</p>
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
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
