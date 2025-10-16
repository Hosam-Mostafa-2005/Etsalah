import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="text-center"
      >
        <FaExclamationTriangle className="text-orange-500 text-8xl md:text-9xl mb-6 mx-auto animate-pulse" />

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
          !عذراً
        </h1>

        <p className="text-lg md:text-xl font-medium text-gray-400 max-w-lg mx-auto mb-8">
          يبدو أن الصفحة التي تبحث عنها غير موجودة. قد تكون الرابط غير صحيح أو
          الصفحة تم إزالتها.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-full 
                       hover:bg-orange-700 transition duration-300 transform"
          >
            <div className="flex items-center gap-3">
              <FaHome size={20} />
              العودة للصفحة الرئيسية
            </div>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
