import { useAuthStore } from "../store/store";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  // يجب أن تكون واجهة User محدثة في store.ts لتشمل جميع الحقول
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // دالة لعرض البيانات بأناقة
  const InfoItem = ({ icon, label, value }: any) => (
    <div className="flex items-center justify-end text-right gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
      <span className="font-semibold text-gray-700">
        {value || "غير متوفر"}
      </span>
      <span className="text-gray-500 font-medium border-l pl-3 border-gray-300">
        {label}:
      </span>
      {icon}
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-red-500">
          الرجاء تسجيل الدخول لعرض الملف الشخصي.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-28 pb-10 flex items-start justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white shadow-2xl rounded-xl overflow-hidden"
      >
        {/* 1. جزء العنوان والخلفية */}
        <div className="bg-gray-800 p-6 flex flex-col items-center justify-center text-white relative">
          <FaUserCircle size={80} className="text-orange-500 mb-3" />
          <h1 className="text-3xl font-black">{user.name || "مستخدم جديد"}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* 2. بيانات البروفايل الرئيسية */}
        <div className="p-8 md:p-10 space-y-8">
          <h2 className="text-2xl font-extrabold text-gray-800 border-b-2 border-orange-600/50 pb-2 text-right">
            المعلومات الشخصية
          </h2>

          {/* شبكة عرض البيانات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              label="رقم الهاتف"
              value={user.phone}
              icon={<FaPhone size={18} className="text-green-500" />}
            />
            <InfoItem
              label="البريد الإلكتروني"
              value={user.email}
              icon={<FaEnvelope size={18} className="text-blue-500" />}
            />

            <InfoItem
              label="المحافظة"
              value={user.city}
              icon={<FaMapMarkerAlt size={18} className="text-red-500" />}
            />
            <InfoItem
              label="تاريخ الميلاد"
              value={user.dateOfBirth}
              icon={<FaCalendarAlt size={18} className="text-indigo-500" />}
            />

            {/* العنوان الكامل يأخذ عرضًا كاملاً */}
            <div className="md:col-span-2">
              <InfoItem
                label="العنوان المفصل"
                value={user.address}
                icon={<FaHome size={18} className="text-orange-500" />}
              />
            </div>
          </div>

          {/* زر تسجيل الخروج */}
          <div className="pt-4 border-t border-gray-100 text-center">
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              className="bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition shadow-lg flex items-center gap-2 mx-auto"
            >
              <FaSignOutAlt size={18} />
              تسجيل الخروج
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
