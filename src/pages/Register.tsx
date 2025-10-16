import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaTransgender,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// تعريف واجهة لحقول التسجيل
interface RegisterFields {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string; // حقل جديد
  gender: string; // حقل جديد
  password: string;
  confirmPassword: string;
}

// قائمة المحافظات المصرية (كمثال)
const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "القليوبية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>();

  // لمشاهدة قيمة حقل الباسوورد لمطابقته
  const password = watch("password", "");

  const onSubmit = async (data: RegisterFields) => {
    console.log("Registration Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // يمكنك هنا إضافة logic التسجيل الفعلي
    alert("تم التسجيل بنجاح! سيتم توجيهك لصفحة تسجيل الدخول.");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-gray-300/60 w-full max-w-3xl border-t-8 border-orange-600"
      >
        <div className="text-center mb-8">
          <FaSignInAlt className="text-orange-600 text-6xl mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">
            إنشاء حساب جديد
          </h1>
          <p className="text-gray-500 mt-2">انضم لشبكة المحترفين الأفضل.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ----------------- الصف الأول: الاسم والبريد ----------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* حقل الاسم */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                الاسم الكامل
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaUser />
                </span>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "الاسم مطلوب" })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="ادخل اسمك"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            {/* حقل البريد الإلكتروني */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: { value: /^\S+@\S+$/i, message: "صيغة غير صحيحة" },
                  })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="example@mail.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>

          {/* ----------------- الصف الثاني: الهاتف والنوع ----------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* حقل رقم الهاتف */}
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                رقم الهاتف
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", { required: "رقم الهاتف مطلوب" })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="مثال: 01xxxxxxxxx"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            {/* حقل النوع (Gender) */}
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                النوع
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaTransgender />
                </span>
                <select
                  id="gender"
                  {...register("gender", { required: "النوع مطلوب" })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border appearance-none ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                >
                  <option value="">-- اختر نوعك --</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.gender.message as string}
                </p>
              )}
            </div>
          </div>

          {/* ----------------- الصف الثالث: المحافظة والعنوان ----------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* حقل المحافظة (Select) */}
            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                المحافظة
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaMapMarkerAlt />
                </span>
                <select
                  id="city"
                  {...register("city", { required: "المحافظة مطلوبة" })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border appearance-none ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                >
                  <option value="">-- اختر محافظتك --</option>
                  {governorates.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.city.message as string}
                </p>
              )}
            </div>

            {/* حقل العنوان بالتفصيل */}
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                العنوان بالتفصيل
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaHome />
                </span>
                <input
                  type="text"
                  id="address"
                  {...register("address", { required: "العنوان مطلوب" })}
                  className={`w-full px-5 py-3 pr-10 rounded-xl bg-gray-50 border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="مثال: شقة 5، عمارة 12، شارع النيل"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.address.message as string}
                </p>
              )}
            </div>
          </div>

          {/* ----------------- الصف الرابع: كلمات المرور ----------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* حقل كلمة المرور */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 p-1 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "كلمة المرور مطلوبة",
                    minLength: { value: 6, message: "يجب أن لا تقل عن 6 أحرف" },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).+$/,
                      message: "تتطلب حرف كبير ورقم واحد على الأقل",
                    },
                  })}
                  className={`w-full px-5 py-3 pr-10 pl-10 rounded-xl bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="ادخل كلمة المرور"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* حقل تأكيد كلمة المرور */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-2 text-right"
              >
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 p-1 focus:outline-none"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPass ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "تأكيد كلمة المرور مطلوب",
                    validate: (value) =>
                      value === password || "كلمتا المرور غير متطابقتين",
                  })}
                  className={`w-full px-5 py-3 pr-10 pl-10 rounded-xl bg-gray-50 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>

          {/* زر التسجيل */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 text-white font-bold text-lg py-4 mt-6 rounded-xl 
                       hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-500/50 disabled:bg-gray-400 disabled:shadow-none"
          >
            {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          هل لديك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-semibold"
          >
            تسجيل الدخول
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
