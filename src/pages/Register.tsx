import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaWrench,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { authApi } from "../api/auth";
import type { RegisterPayload } from "../api/auth";
import { useAuthStore } from "../store/store";

interface RegisterFormData extends RegisterPayload {
  confirmPassword: string;
}

const governorates = [
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
  "القليوبية",
  "الشرقية",
  "الدقهلية",
  "البحيرة",
  "دمياط",
  "الإسماعيلية",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useAuthStore((state) => state.showToast);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      city: "القاهرة",
      address: "",
      gender: "male",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");
    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        city: data.city,
        address: data.address,
        gender: data.gender,
      });

      setAuth(response.user, response.token);
      showToast(response.message || "تم إنشاء الحساب بنجاح! مرحباً بك في اتصلح", "success");
      navigate("/");
    } catch (err: unknown) {
      setServerError(
        err instanceof Error
          ? err.message
          : "فشل إنشاء الحساب، يرجى مراجعة البيانات المدخلة"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 text-center relative">
          <Link
            to="/"
            className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <span>الرئيسية</span>
            <FaArrowLeft className="text-[10px]" />
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-orange-500/30">
            <FaWrench className="text-2xl -rotate-45" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">إنشاء حساب جديد</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            انضم لمنصة اتصلح واستمتع بأسهل تجربة صيانة وضمان شامل
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-10 space-y-6">
          {serverError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  الاسم بالكامل *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: أحمد مصطفى"
                    {...register("name", { required: "يرجى إدخال الاسم" })}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold"
                  />
                  <FaUser className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                </div>
                {errors.name && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  البريد الإلكتروني *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "يرجى إدخال البريد الإلكتروني",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "صيغة البريد الإلكتروني غير صحيحة",
                      },
                    })}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold dir-ltr text-right"
                  />
                  <FaEnvelope className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  رقم الهاتف المحمول *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="01012345678"
                    {...register("phone", {
                      required: "يرجى إدخال رقم الهاتف",
                      pattern: {
                        value: /^01[0125][0-9]{8}$/,
                        message: "رقم هاتف مصري صحيح مكون من 11 رقماً",
                      },
                    })}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold dir-ltr text-right"
                  />
                  <FaPhone className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                </div>
                {errors.phone && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  المحافظة *
                </label>
                <select
                  {...register("city", { required: "يرجى اختيار المحافظة" })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold"
                >
                  {governorates.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "يرجى إدخال كلمة المرور",
                      minLength: {
                        value: 6,
                        message: "كلمة المرور يجب أن لا تقل عن 6 أحرف",
                      },
                    })}
                    className="w-full px-4 py-2.5 pr-10 pl-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold dir-ltr text-right"
                  />
                  <FaLock className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-sm"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تأكيد كلمة المرور *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "يرجى تأكيد كلمة المرور",
                      validate: (val) =>
                        val === password || "كلمتا المرور غير متطابقتين",
                    })}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold dir-ltr text-right"
                  />
                  <FaLock className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Detailed Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  العنوان بالتفصيل
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="اسم الشارع، رقم المبنى، الشقة، علامة مميزة"
                    {...register("address")}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-semibold"
                  />
                  <FaMapMarkerAlt className="absolute right-3.5 top-3.5 text-slate-400 text-sm pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/25 transition disabled:opacity-50 mt-4"
            >
              {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب الآن"}
            </button>
          </form>

          {/* Already have an account */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>لديك حساب بالفعل؟ </span>
            <Link
              to="/login"
              className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
