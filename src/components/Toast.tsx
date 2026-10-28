import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/store";

export const Toast = () => {
  const toast = useAuthStore((state) => state.toast);
  const hideToast = useAuthStore((state) => state.hideToast);

  if (!toast) return null;

  const bgStyles = {
    success: "bg-emerald-600 text-white shadow-emerald-500/30",
    error: "bg-rose-600 text-white shadow-rose-500/30",
    info: "bg-blue-600 text-white shadow-blue-500/30",
  }[toast.type];

  const icons = {
    success: <FaCheckCircle className="text-xl flex-shrink-0" />,
    error: <FaExclamationCircle className="text-xl flex-shrink-0" />,
    info: <FaInfoCircle className="text-xl flex-shrink-0" />,
  }[toast.type];

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-md px-4">
      <AnimatePresence>
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl shadow-xl ${bgStyles}`}
        >
          <div className="flex items-center gap-3">
            {icons}
            <span className="font-bold text-sm md:text-base leading-snug">
              {toast.message}
            </span>
          </div>
          <button
            onClick={hideToast}
            className="p-1 hover:bg-white/20 rounded-full transition"
            aria-label="إغلاق التنبيه"
          >
            <FaTimes size={16} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
