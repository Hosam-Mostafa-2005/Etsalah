import { useParams } from "react-router-dom";
import { workers } from "../database/db";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaToolbox,
  FaMedal,
} from "react-icons/fa"; // إضافة FaMedal
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WorkerProfile = () => {
  // الحصول على id العامل (من الرابط)
  const { id } = useParams();
  // البحث عن العامل - يتم استخدام toString() للمطابقة الآمنة
  const worker = workers.find((w) => w.id.toString() === id);

  // دالة لعرض اسم التخصص بالعربية (للتناسق)
  // const getArabicSpecialty = (cat: string) => {
  //   switch (cat) {
  //     case "electrician":
  //       return "كهرباء";
  //     case "ac":
  //       return "تكييف";
  //     case "plumber":
  //       return "سباكة";
  //     case "carpenter":
  //       return "نجارة";
  //     case "glass":
  //       return "زجاج";
  //     default:
  //       return "متخصص";
  //   }
  // };

  if (!worker)
    return (
      <div className="max-w-7xl mx-auto text-center py-20 text-xl font-bold text-red-600">
        عذراً، هذا العامل غير موجود أو تم إزالته.
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 pt-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full bg-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* 1. الجزء العلوي (Hero - داكن وفخم) */}
        <div className="bg-gray-800 p-8 pt-16 text-white relative">
          {/* التقييم وشارة الخبرة */}
          <div className="absolute top-0 right-0 bg-orange-600 text-white font-black px-4 py-1.5 rounded-bl-xl flex items-center gap-2">
            <FaMedal size={16} />
            <span>خبير معتمد</span>
          </div>

          <div className="flex flex-col justify-end md:flex-row items-center md:items-start gap-6">
            {/* الاسم والتخصص */}
            <div className="text-center  md:text-right md:pt-4">
              <h1 className="text-4xl font-extrabold text-white mb-2">
                {worker.name}
              </h1>
              <p className="text-xl font-bold text-orange-400 flex items-center justify-center md:justify-end gap-2">
                <FaToolbox size={18} />
                {worker.specialty}
              </p>
            </div>
            <img
              src={worker.image}
              alt={worker.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-orange-400 shadow-xl ring-4 ring-gray-700/50"
            />
          </div>
        </div>

        {/* 2. التفاصيل الرئيسية (أبيض ومنظم) */}
        <div className="p-8 md:p-10 space-y-8">
          {/* التقييم الرئيسي ورقم الهاتف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 border-gray-100">
            {/* التقييم */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <p className="text-sm text-gray-500 mb-1">
                التقييم العام للخدمة:
              </p>
              <div className="flex items-center gap-2 text-4xl font-black text-gray-900">
                <FaStar className="text-yellow-500" size={30} />
                <span>{worker.rating} / 5</span>
              </div>
            </div>

            {/* التواصل */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="text-sm text-gray-500 mb-1">تواصل مباشرةً:</p>
              <div className="flex items-center gap-2  text-xl font-bold text-green-600">
                <FaPhoneAlt size={20} />
                <span className="dir-ltr">{worker.phone}</span>
              </div>
            </div>
          </div>

          {/* الموقع وزر الطلب */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* الموقع */}
            <div className="flex items-center gap-3 text-xl font-medium text-gray-700">
              <FaMapMarkerAlt size={22} className="text-red-500" />
              <span>متاح في: {worker.city}</span>
            </div>

            {/* زر طلب الخدمة (CTA) */}
            <Link
              // تمرير الـ ID عبر searchParams لملء النموذج مسبقاً
              to={`/form?workerId=${worker.id}`}
              className="inline-block bg-orange-600 text-white font-bold px-10 py-3 rounded-full hover:bg-orange-700 transition shadow-xl transform hover:scale-105"
            >
              اطلب {worker.name} الآن
            </Link>
          </div>
        </div>

        {/* شريط الثقة والتأكيد */}
        <div className="bg-gray-50 p-6 text-center text-gray-600">
          <p className="font-medium">
            ✅ هذا الفني معتمد بالكامل من منصة **أتصلّح** ويضمن جودة العمل.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerProfile;
