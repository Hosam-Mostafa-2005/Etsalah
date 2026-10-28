import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaMedal, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTopTechnicians } from "../hooks/useQueries";

const WorkersCard = () => {
  const { data: topWorkers, isLoading, isError } = useTopTechnicians();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm animate-pulse space-y-4"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200"></div>
              <div className="h-5 bg-slate-200 rounded-md w-3/4 mx-auto"></div>
              <div className="h-4 bg-slate-200 rounded-md w-1/2 mx-auto"></div>
              <div className="h-10 bg-slate-200 rounded-2xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !topWorkers || topWorkers.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-2">
            <FaMedal />
            <span>نخبة الخبراء المعتمدين</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            فنيو الشهر <span className="text-orange-600">الأعلى تقييماً</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            أفضل الفنيين أداءً والتزاماً بجودة الصيانة وتقييمات العملاء الحقيقية
          </p>
        </div>

        <Link
          to="/services"
          className="text-orange-600 hover:text-orange-700 font-bold text-sm inline-flex items-center gap-1.5 self-start md:self-auto group"
        >
          <span>عرض جميع الفنيين المعتمدين</span>
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topWorkers.map((worker, index) => (
          <motion.div
            key={worker._id || worker.numericId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Best Badge */}
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <FaStar className="text-[10px]" />
              <span>الأفضل</span>
            </div>

            <div className="flex flex-col items-center text-center">
              {/* Image & Status */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-50 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={worker.image || "/images/try.png"}
                    alt={worker.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/try.png";
                    }}
                  />
                </div>
                <div
                  className="absolute bottom-1 left-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"
                  title="متاح لاستقبال الطلبات"
                ></div>
              </div>

              {/* Name & Specialty */}
              <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-orange-600 transition">
                {worker.name}
              </h3>
              <p className="text-orange-600 font-bold text-xs mt-0.5 mb-3 bg-orange-50 px-2.5 py-0.5 rounded-full">
                فني {worker.specialty}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-1.5 mb-2 text-sm font-black text-slate-800">
                <FaStar className="text-amber-400" />
                <span>{worker.rating}</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({worker.reviewsCount} تقييم)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                <FaMapMarkerAlt className="text-rose-500 text-[11px]" />
                <span>{worker.city}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 mt-2 pt-3 border-t border-slate-100">
              <Link
                to={`/form?workerId=${worker.numericId}`}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-2xl text-xs font-black text-white bg-orange-600 hover:bg-orange-700 shadow-sm transition"
              >
                <FaCalendarCheck />
                <span>حجز موعد</span>
              </Link>

              <Link
                to={`/workers/${worker.numericId}`}
                className="flex items-center justify-center w-full py-2 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                عرض الملف الكامل
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkersCard;
