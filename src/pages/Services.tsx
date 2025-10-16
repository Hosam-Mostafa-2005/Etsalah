import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaHammer,
  FaFaucet,
  FaGlassWhiskey,
  FaSnowflake,
} from "react-icons/fa"; // أيقونات جديدة للخدمات

const categories = [
  {
    name: "مسؤولين الكهرباء",
    id: "electrician",
    icon: (
      <FaBolt
        size={40}
        className="text-yellow-500 group-hover:text-white transition"
      />
    ),
  },
  {
    name: "مسؤولين النجارة",
    id: "carpenter",
    icon: (
      <FaHammer
        size={40}
        className="text-yellow-800 group-hover:text-white transition"
      />
    ),
  },
  {
    name: "مسؤولين السباكة",
    id: "plumber",
    icon: (
      <FaFaucet
        size={40}
        className="text-blue-500 group-hover:text-white transition"
      />
    ),
  },
  {
    name: "مسؤولين الزجاج",
    id: "glass",
    icon: (
      <FaGlassWhiskey
        size={40}
        className="text-gray-400 group-hover:text-white transition"
      />
    ),
  },
  {
    name: "مسؤولين التكييف",
    id: "ac",
    icon: (
      <FaSnowflake
        size={40}
        className="text-cyan-500 group-hover:text-white transition"
      />
    ),
  },
];

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden pt-28">
      {" "}
      {/* تم إضافة padding علوي لتجنب التداخل مع الـ NavBar */}
      {/* ================= HERO SECTION للخدمات ================= */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-wide mb-4">
          اكتشف <span className="text-orange-600">خدماتنا</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          اختر الفئة التي تحتاجها وسنوفر لك أفضل الخبراء في مجالك. جودة، سرعة،
          وثقة.
        </p>
      </motion.div>
      {/* ================= CATEGORIES GRID ================= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/services/${encodeURIComponent(category.id)}`}
              className="w-full max-w-sm h-64 bg-gray-900 shadow-2xl rounded-2xl flex flex-col items-center justify-center p-6 
                                       text-2xl font-black text-white hover:bg-orange-600 hover:scale-105 
                                       transition-all duration-500 group relative border-b-4 border-orange-600"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="mb-4"
              >
                {category.icon}
              </motion.div>

              <span className="text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
