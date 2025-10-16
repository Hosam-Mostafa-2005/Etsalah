import { useParams, Link } from "react-router-dom";
import { workers } from "../database/db";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const WorkersList = () => {
  const { category }: { category?: string } = useParams();

  const filteredWorkers = workers.filter((w) => w.category === category);

  const getArabicCategoryName = (cat: string | undefined) => {
    switch (cat) {
      case "ac":
        return "مسؤولي التكييف";
      case "carpenter":
        return "مسؤولي النجارة";
      case "plumber":
        return "مسؤولي السباكة";
      case "glass":
        return "مسؤولي الزجاج";
      case "electrician":
        return "مسؤولي الكهرباء";
      default:
        return "فنيون متخصصون";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10 overflow-x-hidden">
      {/* عنوان الصفحة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black text-gray-800">
          فنيو{" "}
          <span className="text-orange-600">
            {getArabicCategoryName(category)}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          اطلع على أفضل الفنيين المعتمدين لدينا في هذا التخصص.
        </p>
      </motion.div>

      {/* عرض قائمة الفنيين */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkers.map((worker) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: worker.id * 0.1 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-orange-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/50"
              >
                {/* قسم الصورة */}
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-full h-76 object-contain"
                />

                {/* قسم التفاصيل */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-black text-gray-900 mb-1">
                    {worker.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-lg mb-4">
                    {worker.specialty}
                  </p>

                  <div className="space-y-2 text-gray-700 font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span>التقييم: {worker.rating}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>{worker.city}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaPhoneAlt className="text-green-600" />
                      <span>{worker.phone}</span>
                    </div>
                  </div>

                  {/* زر عرض البروفايل */}
                  <Link
                    to={`/workers/${worker.id}`}
                    className="mt-6 inline-block bg-gray-900 text-white font-bold px-8 py-3 rounded-full 
                             transition-all duration-300 hover:bg-orange-600 hover:scale-105 shadow-lg"
                  >
                    عرض الملف الشخصي
                  </Link>
                  <Link
                    to={`/form${worker.id ? `?workerId=${worker.id}` : ""}`}
                    className="mt-6 inline-block bg-gradient-to-r from-orange-500 to-blue-700 text-white font-bold px-8 py-3 rounded-full 
                             transition-all duration-300 hover:bg-orange-600 hover:scale-105 shadow-lg"
                  >
                    !اطلبني دلوقتي
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl font-bold text-gray-500 py-20">
            عذراً، لا يوجد فنيون متاحون في هذا التخصص حالياً.
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkersList;
