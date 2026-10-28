import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaHammer,
  FaFaucet,
  FaGlassWhiskey,
  FaSnowflake,
  FaArrowLeft,
  FaUsers,
  FaWrench,
} from "react-icons/fa";
import { useCategories } from "../hooks/useQueries";

const categoryIconMap: Record<string, React.ReactNode> = {
  ac: <FaSnowflake className="text-3xl text-cyan-500" />,
  electrician: <FaBolt className="text-3xl text-amber-500" />,
  plumber: <FaFaucet className="text-3xl text-blue-500" />,
  carpenter: <FaHammer className="text-3xl text-amber-700" />,
  glass: <FaGlassWhiskey className="text-3xl text-slate-500" />,
};

const Services = () => {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-3">
            <FaWrench />
            <span>خدمات صيانة شاملة ومضمونة</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            استكشف <span className="text-orange-600">خدمات الصيانة</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            اختر التخصص الذي ترغب في صيانته وتعرف على قائمة الفنيين المحترفين في
            محافظتك مع إمكانية الحجز المباشر بالموعد المناسب.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-200"></div>
                <div className="h-6 bg-slate-200 rounded-md w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 p-8 max-w-lg mx-auto">
            <p className="text-rose-600 font-bold mb-4">
              تعذر تحميل بيانات الخدمات من الخادم حالياً.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {categories && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={cat._id || cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Count */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-50 transition-all duration-300 shadow-xs">
                      {categoryIconMap[cat.key] || <FaWrench className="text-3xl text-orange-600" />}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      <FaUsers className="text-orange-500" />
                      <span>{cat.techniciansCount || 10} فني معتمد</span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition mb-2">
                    {cat.nameAr}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {cat.description ||
                      "صيانة وتصليح احترافي بأعلى معايير الأمان وضمان الجودة المعتمد."}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                  <Link
                    to={`/services/${cat.key}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-black text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <span>عرض الفنيين المتاحين</span>
                    <FaArrowLeft className="text-xs" />
                  </Link>

                  <Link
                    to={`/form?service=${cat.key}`}
                    className="px-4 py-3 rounded-2xl bg-orange-50 text-orange-600 hover:bg-orange-100 font-extrabold text-xs sm:text-sm transition"
                  >
                    طلب فوري
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
