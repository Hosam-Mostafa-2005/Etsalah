import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaToolbox, FaMedal } from "react-icons/fa"; // إضافة أيقونة Medal للشارة
import { workers } from "../database/db";

const WorkersCard = () => {
  type Worker = {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    image: string;
    city: string;
    category: string; // تم إضافته لضمان Typescript
  };

  // Logic: اختيار أفضل عامل من كل تخصص
  const topWorkers: Worker[] = Object.values(
    workers.reduce<Record<string, Worker>>((acc, worker) => {
      const category = worker.category; // نستخدم category هنا

      if (!acc[category] || worker.rating > acc[category].rating) {
        acc[category] = worker as Worker;
      }
      return acc;
    }, {})
  );

  // دالة لعرض النجوم حسب التقييم
  const renderStars = (rating: any) => {
    const fullStars = Math.floor(rating);
    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FaStar key={i} className="text-yellow-400" />);
    }
    return starIcons;
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-extrabold text-gray-800 text-right border-b-4 border-orange-600/70 pb-2 mb-12">
          <span className="text-orange-600">🏆</span> فنيون بخبرة سنوات (تصنيف
          الأفضل)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {topWorkers?.map((worker) => (
            <div
              key={worker.id}
              className="relative group rounded-xl shadow-2xl hover:shadow-orange-500/50 
                       transition-all duration-500 overflow-hidden border-t-8 border-orange-600 hover:-translate-y-1 w-full max-w-xs"
            >
              {/* شارة النجم (Best Worker Badge) */}
              <div className="absolute top-0 left-0 bg-orange-600 text-white px-3 py-1 flex items-center gap-1 rounded-br-lg font-black text-sm z-10">
                <FaMedal size={14} />
                الأفضل
              </div>

              {/* غلاف الصورة */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={worker.image}
                  alt={worker.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* التقييم فوق الصورة */}
                <div className="absolute bottom-0 w-full bg-gray-900/80 backdrop-blur-sm text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    {renderStars(worker.rating)}
                    <span className="text-white ml-2">{worker.rating}</span>
                  </div>
                </div>
              </div>

              {/* تفاصيل العامل */}
              <div className="p-5 text-center text-white">
                <h3 className="text-2xl font-black text-white mb-1 leading-tight">
                  {worker.name}
                </h3>

                <p className="text-orange-400 font-extrabold mb-4 flex items-center justify-center gap-2 text-lg tracking-wide">
                  <FaToolbox size={18} />
                  {worker.specialty}
                </p>

                <div className="flex items-center justify-center gap-2 text-black text-base mb-5">
                  <FaMapMarkerAlt size={16} className="text-red-500" />
                  <span>{worker.city}</span>
                </div>

                <Link
                  to={`/workers/${worker.id}`}
                  className="mt-4 inline-block bg-orange-600 text-white font-bold px-8 py-3 rounded-full 
                             transition-all duration-300 hover:bg-orange-700 hover:scale-105 shadow-xl"
                >
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkersCard;
