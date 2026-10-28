import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
  FaEdit,
  FaClipboardList,
} from "react-icons/fa";
import { useAuthStore } from "../store/store";
import { authApi } from "../api/auth";

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

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useAuthStore((state) => state.showToast);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    city: user?.city || "القاهرة",
    address: user?.address || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "male",
  });

  if (!user) {
    return (
      <div className="py-24 max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-3xl">
            <FaUserCircle />
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            تسجيل الدخول مطلوب
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            يرجى تسجيل الدخول للوصول إلى بيانات حسابك ومتابعة طلبات الصيانة الخاصة بك.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 transition"
            >
              تسجيل الدخول الآن
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await authApi.updateProfile(formData);
      if (res.data?.user) {
        setUser(res.data.user);
      }
      setIsEditing(false);
      showToast("تم تحديث البيانات الشخصية بنجاح!", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "حدث خطأ أثناء حفظ التعديلات", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast("تم تسجيل الخروج بنجاح", "info");
    navigate("/");
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center text-4xl font-black shadow-xl border-4 border-white/20">
                {user.name.charAt(0)}
              </div>

              {/* Title & Info */}
              <div className="text-center sm:text-right flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <h1 className="text-3xl font-black text-white">{user.name}</h1>
                  <span className="text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
                    {user.role === "admin" ? "مدير المنصة" : "عميل مميز"}
                  </span>
                </div>
                <p className="text-sm text-slate-300 font-mono">{user.email}</p>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 mt-3">
                  <span>المحافظة: {user.city}</span>
                  <span>•</span>
                  <span>الهاتف: {user.phone}</span>
                </div>
              </div>

              {/* Quick Action: Edit Toggle */}
              <div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/10"
                >
                  <FaEdit />
                  <span>{isEditing ? "إلغاء التعديل" : "تعديل البيانات"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 sm:p-6 grid grid-cols-2 gap-4 text-center">
            <div className="border-l border-slate-200">
              <p className="text-2xl font-black text-slate-900">
                {user.bookingCount || 0}
              </p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                إجمالي طلبات الصيانة
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600">نشط</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">
                حالة الحساب والضمان
              </p>
            </div>
          </div>

          {/* Body: Profile Details or Edit Form */}
          <div className="p-6 sm:p-10">
            {isEditing ? (
              /* Edit Form */
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 pb-2 border-b border-slate-100">
                  تعديل البيانات الشخصية
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      الاسم بالكامل
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 dir-ltr text-right font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      المحافظة
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-bold"
                    >
                      {governorates.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      العنوان بالتفصيل
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="اسم الشارع، رقم المبنى، الشقة"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-sm transition disabled:opacity-50"
                  >
                    {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              /* View Details */
              <div className="space-y-6">
                <h2 className="text-xl font-black text-slate-900 pb-2 border-b border-slate-100">
                  البيانات الشخصية المسجلة
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">رقم الهاتف</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5 dir-ltr text-right">
                        {user.phone || "غير مسجل"}
                      </p>
                    </div>
                    <FaPhone className="text-emerald-500 text-lg" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">البريد الإلكتروني</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <FaEnvelope className="text-blue-500 text-lg" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">المحافظة</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                        {user.city || "القاهرة"}
                      </p>
                    </div>
                    <FaMapMarkerAlt className="text-rose-500 text-lg" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">تاريخ الميلاد</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                        {user.dateOfBirth || "غير محدد"}
                      </p>
                    </div>
                    <FaCalendarAlt className="text-amber-500 text-lg" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between md:col-span-2">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">العنوان التفصيلي</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                        {user.address || "لم يتم تسجيل عنوان تفصيلي"}
                      </p>
                    </div>
                    <FaHome className="text-orange-500 text-lg" />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/myorders"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700"
              >
                <FaClipboardList />
                <span>الاطلاع على جميع طلبات الصيانة الخاصة بي ←</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs transition flex items-center gap-2"
              >
                <FaSignOutAlt />
                <span>تسجيل الخروج من الحساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
