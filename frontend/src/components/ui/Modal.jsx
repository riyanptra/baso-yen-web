import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Komponen Modal Reusable
 * 
 * @param {boolean} isOpen - Status apakah modal terbuka
 * @param {function} onClose - Fungsi untuk menutup modal
 * @param {string} title - Judul modal
 * @param {ReactNode} children - Isi konten di dalam modal
 * @param {string} maxWidth - Lebar maksimum modal (opsional, default: max-w-md)
 */
export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  
  // Mencegah background di belakang modal ikut terguling (scroll) saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Latar Belakang Gelap (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Kotak Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`bg-white rounded-3xl shadow-2xl w-full ${maxWidth} overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]`}
            >
              {/* Header Modal */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-yen-dark">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-yen-dark hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Isi / Konten Modal */}
              <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
