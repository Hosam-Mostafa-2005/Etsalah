import { Link, useRouteError } from "react-router-dom";
import { FaWrench, FaHome } from "react-icons/fa";

const Error = () => {
  const error = useRouteError() as { statusText?: string; message?: string } | null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full border border-slate-100 shadow-xl space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-4xl shadow-sm">
          <FaWrench className="-rotate-45" />
        </div>

        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
          <h2 className="text-xl font-bold text-slate-800">
            الصفحة المطلوبة غير موجودة
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            {error?.statusText ||
              error?.message ||
              "عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/25 transition flex items-center justify-center gap-2"
          >
            <FaHome />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
          >
            تصفح الخدمات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
