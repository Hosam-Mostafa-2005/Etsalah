import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaCalendarCheck,
  FaWrench,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTechnicians } from "../hooks/useQueries";

const governorates = [
  "الكل",
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "طنطا",
  "المنصورة",
  "السويس",
  "بني سويف",
  "المنيا",
  "بورسعيد",
  "الفيوم",
  "كفر الشيخ",
  "المنوفية",
  "أسوان",
  "أسيوط",
];

const categoryTitleMap: Record<string, string> = {
  ac: "مسؤولي التكييف",
  carpenter: "مسؤولي النجارة",
  plumber: "مسؤولي السباكة",
  glass: "مسؤولي الزجاج",
  electrician: "مسؤولي الكهرباء",
};

const WorkersList = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [sortBy, setSortBy] = useState("rating_desc");

  const {
    data: technicians,
    isLoading,
    isError,
  } = useTechnicians({
    category,
    search: searchTerm,
    city: selectedCity === "الكل" ? undefined : selectedCity,
    sort: sortBy,
  });

  const categoryName = (category && categoryTitleMap[category]) || "الفنيين المعتمدين";

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
          <Link to="/" className="hover:text-orange-600 transition">
            الرئيسية
          </Link>
          <span>/</span>
          <Link to="/services" className="hover:text-orange-600 transition">
            الخدمات
          </Link>
          <span>/</span>
          <span className="text-orange-600">{categoryName}</span>
        </div>

        {/* Page Title & Hero */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-2">
              <FaShieldAlt />
              <span>فنيون معتمدون ومفحوصون</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              تصفح نخبة الفنيين والخبراء، واطلع على تقييمات العملاء وخبراتهم،
              واحجز موعدك فوراً.
            </p>
          </div>

          <Link
            to={`/form${category ? `?service=${category}` : ""}`}
            className="self-start md:self-center px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/25 transition"
          >
            طلب خدمة مباشرة
          </Link>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث بالاسم أو التخصص..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition"
            />
            <FaSearch className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
          </div>

          {/* City Filter */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition"
            >
              {governorates.map((gov) => (
                <option key={gov} value={gov}>
                  المحافظة: {gov}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 focus:bg-white transition"
            >
              <option value="rating_desc">الترتيب: الأعلى تقييماً</option>
              <option value="reviews_desc">الترتيب: الأكثر تقييمات</option>
              <option value="rate_asc">الترتيب: الأقل تكلفة بالساعة</option>
              <option value="rate_desc">الترتيب: الأكثر خبرة</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-slate-200"></div>
                <div className="h-6 bg-slate-200 rounded-md w-1/2 mx-auto"></div>
                <div className="h-4 bg-slate-200 rounded-md w-3/4 mx-auto"></div>
                <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 p-8 max-w-lg mx-auto">
            <p className="text-rose-600 font-bold mb-4">
              حدث خطأ أثناء تحميل بيانات الفنيين.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-sm"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && technicians && technicians.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaWrench />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              لم نعثر على فنيين يطابقون بحثك
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              جرّب تغيير خيارات البحث أو اختيار محافظة أخرى لعرض الفنيين
              المتاحين.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("الكل");
              }}
              className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* Technicians Grid */}
        {!isLoading && technicians && technicians.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicians.map((worker, index) => (
              <motion.div
                key={worker._id || worker.numericId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Verified and Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <FaShieldAlt className="text-emerald-500" />
                      <span>معتمد رسمياً</span>
                    </span>

                    <div className="flex items-center gap-1 text-sm font-black text-slate-800">
                      <FaStar className="text-amber-400" />
                      <span>{worker.rating}</span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({worker.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Worker Avatar & Info */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={worker.image || "/images/try.png"}
                        alt={worker.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/try.png";
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition">
                        {worker.name}
                      </h3>
                      <p className="text-xs font-bold text-orange-600 mt-0.5">
                        فني {worker.specialty}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <FaMapMarkerAlt className="text-rose-500 text-[11px]" />
                        <span>{worker.city}</span>
                        <span className="mx-1">•</span>
                        <span>{worker.experienceYears || 5} سنوات خبرة</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio & Skills */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {worker.bio}
                  </p>

                  {worker.skills && worker.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {worker.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    to={`/form?workerId=${worker.numericId}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs shadow-sm transition"
                  >
                    <FaCalendarCheck />
                    <span>حجز موعد</span>
                  </Link>

                  <Link
                    to={`/workers/${worker.numericId}`}
                    className="flex items-center justify-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                  >
                    الملف والتقييمات
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

export default WorkersList;
