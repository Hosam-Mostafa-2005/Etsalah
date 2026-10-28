import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaWrench,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { authApi } from "../api/auth";
import type { LoginPayload } from "../api/auth";
import { useAuthStore } from "../store/store";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useAuthStore((state) => state.showToast);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    setServerError("");
    try {
      const response = await authApi.login(data);
      setAuth(response.user, response.token);
      showToast(response.message || "تم تسجيل الدخول بنجاح!", "success");
      navigate("/");
    } catch (err: unknown) {
      setServerError(
        err instanceof Error
          ? err.message
          : "فشل تسجيل الدخول، يرجى التأكد من البريد وكلمة المرور"
      );
    }
  };

  // One-click demo credentials filler
  const handleFillDemo = (type: "customer" | "admin") => {
    if (type === "customer") {
      setValue("email", "customer@etsalah.com");
      setValue("password", "password123");
    } else {
      setValue("email", "admin@etsalah.com");
      setValue("password", "admin123");
    }
    setServerError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden"
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
          <h1 className="text-2xl sm:text-3xl font-black">تسجيل الدخول</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            مرحباً بك مجدداً في منصة اتصلح
          </p>
        </div>

        {/* Demo Fast Login Bar */}
        <div className="bg-orange-50/80 border-b border-orange-100 p-3.5 text-center">
          <p className="text-xs font-bold text-orange-900 mb-2">
            ⚡ تجربة سريعة بنقرة واحدة (حساب تجريبي معتمد):
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo("customer")}
              className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs transition shadow-xs"
            >
              دخول عميل تجريبي
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("admin")}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs transition shadow-xs"
            >
              دخول كمدير
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {serverError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                البريد الإلكتروني
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
                  className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 dir-ltr text-right transition"
                />
                <FaEnvelope className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-xs mt-1 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                كلمة المرور
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
                  className="w-full px-4 py-3 pr-10 pl-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 dir-ltr text-right transition"
                />
                <FaLock className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-4 text-slate-400 hover:text-slate-600 text-sm"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/25 transition disabled:opacity-50"
            >
              {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          {/* Register Footer Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>ليس لديك حساب بعد؟ </span>
            <Link
              to="/register"
              className="font-bold text-orange-600 hover:text-orange-700 hover:underline"
            >
              إنشاء حساب جديد الآن
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
