import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Building,
  CheckCircle,
  Clock,
} from "lucide-react";
import Modal from "../../components/ui/Modal";
import {
  useAdminMessages,
  useUpdateMessageStatus,
  useDeleteMessage,
} from "../../hooks/admin/useAdminMessages";

export default function MessageManagement() {
  const [activeTab, setActiveTab] = useState("ALL"); // ALL, CONTACT, or SAMPLE
  const [error, setError] = useState(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /**
   * Mengambil data pesan menggunakan Custom Hook
   */
  const { data: messages = [], isLoading: isLoadingMessages } =
    useAdminMessages(activeTab);

  const isLoading = isLoadingMessages;

  /**
   * Membuka modal untuk mengubah status pesan (misal: dari UNREAD ke READ).
   * @param {object} msg - Data pesan yang dipilih
   */
  const handleOpenStatusModal = (msg) => {
    setSelectedMessage(msg);
    setNewStatus(msg.status);
    setIsStatusModalOpen(true);
  };

  /**
   * Mutasi React Query untuk mengubah status pesan di server menggunakan Custom Hook.
   */
  const updateStatusMutation = useUpdateMessageStatus({
    onSuccess: () => {
      setIsStatusModalOpen(false);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Gagal mengubah status pesan.");
      setIsSubmitting(false);
    },
  });

  /**
   * Mengeksekusi mutasi perubahan status setelah form modal disubmit.
   * @param {object} e - Event form submit
   */
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    updateStatusMutation.mutate({
      message: selectedMessage,
      status: newStatus,
    });
  };

  /**
   * Membuka modal konfirmasi untuk menghapus pesan.
   * @param {object} msg - Data pesan yang akan dihapus
   */
  const handleOpenDeleteModal = (msg) => {
    setSelectedMessage(msg);
    setIsDeleteModalOpen(true);
  };

  /**
   * Mutasi React Query untuk menghapus pesan menggunakan Custom Hook.
   */
  const deleteMutation = useDeleteMessage({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setIsSubmitting(false);
    },
    onError: () => {
      setError("Gagal menghapus pesan.");
      setIsSubmitting(false);
    },
  });

  /**
   * Melakukan eksekusi penghapusan pesan setelah mendapat konfirmasi.
   */
  const handleDelete = () => {
    if (!selectedMessage) return;
    setIsSubmitting(true);
    deleteMutation.mutate(selectedMessage);
  };

  const filteredMessages = messages;

  /**
   * Menghasilkan elemen UI (badge) berdasarkan status dari pesan.
   * Menyesuaikan warna dan ikon berdasarkan status (Menunggu, Proses, Selesai).
   * @param {string} status - Status teks dari pesan (contoh: 'UNREAD', 'READ')
   * @returns {JSX.Element} Elemen span berisi badge status yang telah diberi styling
   */
  const getStatusBadge = (status) => {
    if (status === "UNREAD" || status === "PENDING") {
      return (
        <span className="bg-red-50 text-red-600 px-3 py-1 text-xs font-bold rounded-full flex items-center w-fit gap-1">
          <Clock className="w-3 h-3" /> Menunggu
        </span>
      );
    }
    if (status === "READ" || status === "REVIEWED") {
      return (
        <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-bold rounded-full flex items-center w-fit gap-1">
          <CheckCircle className="w-3 h-3" /> Sedang Diproses
        </span>
      );
    }
    if (status === "REPLIED" || status === "SENT") {
      return (
        <span className="bg-green-50 text-green-600 px-3 py-1 text-xs font-bold rounded-full flex items-center w-fit gap-1">
          <CheckCircle className="w-3 h-3" /> Selesai (Terkirim)
        </span>
      );
    }
    return (
      <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-bold rounded-full">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yen-dark">Pesan Masuk</h1>
          <p className="text-gray-500 text-sm mt-1">
            Pantau pertanyaan pelanggan dan permintaan sampel
          </p>
        </div>
      </div>

      {error && !isStatusModalOpen && !isDeleteModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
        {/* TABS HEADER */}
        <div className="flex flex-col sm:flex-row border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "ALL" ? "bg-white text-yen-accent shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            Semua Pesan
          </button>
          <button
            onClick={() => setActiveTab("CONTACT")}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "CONTACT" ? "bg-white text-yen-accent shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            <Mail className="w-4 h-4" /> Pesan Kontak (Umum)
          </button>
          <button
            onClick={() => setActiveTab("SAMPLE")}
            className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === "SAMPLE" ? "bg-white text-yen-accent shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            <Building className="w-4 h-4" /> Permintaan Sampel (B2B)
          </button>
        </div>

        {/* DATA LIST */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-yen-accent" />
              <p>Memuat daftar pesan...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500 text-center">
              <Mail className="w-12 h-12 text-gray-200 mb-3" />
              <p className="font-bold text-gray-600">Tidak ada pesan.</p>
              <p className="text-sm">
                Kotak masuk untuk kategori ini masih kosong.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-yen-accent/30 hover:shadow-md transition-all flex flex-col relative group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                        {msg.type === "SAMPLE" ? msg.businessName : msg.name}
                        {activeTab === "ALL" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 uppercase tracking-wider">
                            {msg.type === "SAMPLE" ? "B2B" : "Kontak"}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Diterima:{" "}
                        {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {getStatusBadge(msg.status)}
                  </div>

                  <div className="space-y-2 mb-6">
                    {msg.type === "SAMPLE" && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" /> Pemohon:{" "}
                        <span className="font-semibold">{msg.name}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 flex items-center gap-2 flex-1">
                        <Mail className="w-4 h-4 text-gray-400" /> {msg.email}
                      </p>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${msg.email}`}
                        className="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors border border-blue-100 shadow-sm shrink-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Balas Gmail
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600 flex items-center gap-2 flex-1">
                        <Phone className="w-4 h-4 text-gray-400" /> {msg.phone}
                      </p>
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
                        className="text-[10px] font-bold bg-green-50 text-green-600 hover:bg-green-100 px-2.5 py-1 rounded-lg transition-colors border border-green-100 shadow-sm shrink-0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Balas WA
                      </a>
                    </div>
                    {msg.type === "SAMPLE" && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> {msg.city}
                      </p>
                    )}
                  </div>

                  {msg.type === "CONTACT" && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex-1">
                      <p className="text-sm text-gray-700 italic">
                        "{msg.content}"
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenStatusModal(msg)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Ubah Status
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(msg)}
                      className="px-4 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL UBAH STATUS */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Perbarui Status Laporan"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <p className="text-sm text-gray-500 mb-2">
            Pilih status terbaru untuk menindaklanjuti permintaan ini.
          </p>

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yen-accent/50 focus:outline-none appearance-none font-bold text-gray-700"
          >
            {activeTab === "CONTACT" ? (
              <>
                <option value="UNREAD">🔴 Menunggu (Belum Dibaca)</option>
                <option value="READ">🔵 Sedang Diproses (Sudah Dibaca)</option>
                <option value="REPLIED">🟢 Selesai (Sudah Dibalas)</option>
              </>
            ) : activeTab === "SAMPLE" ? (
              <>
                <option value="PENDING">🔴 Menunggu Evaluasi</option>
                <option value="REVIEWED">🔵 Sedang Direview / Dikontak</option>
                <option value="SENT">🟢 Selesai (Sampel Telah Dikirim)</option>
                <option value="REJECTED">
                  ⚫ Ditolak (Tidak Memenuhi Syarat)
                </option>
              </>
            ) : (
              <>
                <optgroup label="Pesan Umum">
                  <option value="UNREAD">🔴 Menunggu (Belum Dibaca)</option>
                  <option value="READ">🔵 Sedang Diproses (Umum)</option>
                  <option value="REPLIED">🟢 Selesai (Dibalas)</option>
                </optgroup>
                <optgroup label="Permintaan Sampel">
                  <option value="PENDING">🔴 Menunggu Evaluasi (Sampel)</option>
                  <option value="REVIEWED">🔵 Sedang Direview (Sampel)</option>
                  <option value="SENT">🟢 Selesai (Terkirim)</option>
                  <option value="REJECTED">⚫ Ditolak</option>
                </optgroup>
              </>
            )}
          </select>

          <div className="pt-4 flex justify-end gap-3 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-yen-accent hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{" "}
              Simpan Status
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL HAPUS */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Pesan"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Yakin ingin menghapus pesan dari{" "}
            <span className="font-bold">
              "
              {selectedMessage?.type === "SAMPLE"
                ? selectedMessage?.businessName
                : selectedMessage?.name}
              "
            </span>
            ? Riwayat pesan ini tidak dapat dikembalikan.
          </p>
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />} Ya,
              Hapus Permanen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
