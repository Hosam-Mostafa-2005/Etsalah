import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaWrench,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMyBookings, useCancelBookingMutation } from "../hooks/useQueries";
import type { Booking } from "../api/types";
import { useAuthStore } from "../store/store";

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  pending: {
    label: "قيد الانتظار",
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    icon: <FaHourglassHalf className="text-amber-500" />,
  },
  confirmed: {
    label: "مؤكد وجاري التجهيز",
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
    icon: <FaCheckCircle className="text-blue-500" />,
  },
  in_progress: {
    label: "الفني في الطريق / قيد التنفيذ",
    bg: "bg-purple-50 border-purple-200",
    text: "text-purple-700",
    icon: <FaWrench className="text-purple-500" />,
  },
  completed: {
    label: "مكتمل بنجاح",
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    icon: <FaCheckCircle className="text-emerald-500" />,
  },
  cancelled: {
    label: "ملغي",
    bg: "bg-slate-100 border-slate-200",
    text: "text-slate-500",
    icon: <FaTimesCircle className="text-slate-400" />,
  },
};

const categoryNames: Record<string, string> = {
  ac: "صيانة تكييف",
  electrician: "أعمال كهرباء",
  plumber: "سباكة ومعالجة تسريب",
  carpenter: "أعمال نجارة وأثاث",
  glass: "زجاج وألوميتال",
};

const MyOrders = () => {
  const user = useAuthStore((state) => state.user);
  const showToast = useAuthStore((state) => state.showToast);

  const [phoneSearch, setPhoneSearch] = useState(user?.phone || "");
  const [activeTab, setActiveTab] = useState("all");
  const [cancelModalOrder, setCancelModalOrder] = useState<Booking | null>(null);

  const { data: bookings, isLoading, refetch } = useMyBookings(user ? undefined : phoneSearch);
  const cancelBookingMutation = useCancelBookingMutation();

  const handleCancelConfirm = async () => {
    if (!cancelModalOrder) return;
    try {
      await cancelBookingMutation.mutateAsync(cancelModalOrder._id);
      showToast("تم إلغاء طلب الصيانة بنجاح", "info");
      setCancelModalOrder(null);
      refetch();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "تعذر إلغاء الطلب", "error");
    }
  };

  const filteredBookings =
    bookings?.filter((b) => {
      if (activeTab === "all") return true;
      return b.status === activeTab;
    }) || [];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            متابعة <span className="text-orange-600">طلبات الصيانة</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            تابع حالة زيارات الفنيين ومواعيد الحجز وتفاصيل الصيانة لحظة بلحظة.
          </p>
        </div>

        {/* Guest Phone Search Bar if not logged in */}
        {!user && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8 text-center max-w-xl mx-auto">
            <h3 className="font-extrabold text-sm text-slate-800 mb-2">
              هل قمت بالطلب كزائر بدون تسجيل دخول؟
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              أدخل رقم الهاتف الذي استخدمته أثناء الطلب لعرض طلباتك فوراً:
            </p>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                placeholder="أدخل رقم الهاتف (مثال: 01012345678)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 dir-ltr text-right"
              />
              <button
                onClick={() => refetch()}
                className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-sm"
              >
                بحث
              </button>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-bold scrollbar-none">
          {[
            { id: "all", label: "جميع الطلبات" },
            { id: "pending", label: "قيد الانتظار" },
            { id: "confirmed", label: "مؤكدة" },
            { id: "completed", label: "مكتملة" },
            { id: "cancelled", label: "ملغية" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-full whitespace-nowrap transition ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse space-y-4"
              >
                <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
                <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
                <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBookings.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl">
              <FaBoxOpen />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              لا توجد طلبات صيانة حالياً
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              لم تسجل أي طلبات في هذا القسم بعد. يمكنك طلب فني متخصص الآن بكل
              سهولة.
            </p>
            <Link
              to="/form"
              className="inline-block px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 transition"
            >
              اطلب صيانة الآن
            </Link>
          </div>
        )}

        {/* Bookings List */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="space-y-6">
            {filteredBookings.map((order, idx) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const serviceName =
                categoryNames[order.serviceCategory] || order.serviceCategory;

              return (
                <motion.div
                  key={order._id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md hover:shadow-lg transition space-y-6"
                >
                  {/* Top Bar: Order Number & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <FaWrench />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg text-slate-900">
                            {serviceName}
                          </span>
                          <span className="text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">
                            #{order.orderNumber}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          تاريخ الإنشاء: {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-black self-start sm:self-auto ${status.bg} ${status.text}`}
                    >
                      {status.icon}
                      <span>{status.label}</span>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* Time & Date */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-1">
                      <p className="text-slate-400 text-xs flex items-center gap-1.5 font-bold">
                        <FaCalendarAlt className="text-orange-500" />
                        <span>موعد الزيارة</span>
                      </p>
                      <p className="font-extrabold text-slate-800">
                        {order.scheduledDate || "اليوم"}
                      </p>
                      <p className="text-slate-500 text-xs flex items-center gap-1">
                        <FaClock />
                        <span>الفترة: {order.timeSlot}</span>
                      </p>
                    </div>

                    {/* Address & City */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-1">
                      <p className="text-slate-400 text-xs flex items-center gap-1.5 font-bold">
                        <FaMapMarkerAlt className="text-rose-500" />
                        <span>العنوان المحدد</span>
                      </p>
                      <p className="font-extrabold text-slate-800">
                        {order.city}
                      </p>
                      <p className="text-slate-500 text-xs truncate">
                        {order.address || "العنوان المسجل"}
                      </p>
                    </div>

                    {/* Technician details */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80 space-y-1">
                      <p className="text-slate-400 text-xs flex items-center gap-1.5 font-bold">
                        <FaWrench className="text-blue-500" />
                        <span>الفني المكلف</span>
                      </p>
                      <p className="font-extrabold text-slate-800">
                        {order.technician?.name || "سيتم تعيين فني قريباً"}
                      </p>
                      {order.technician?.phone && (
                        <p className="text-xs text-emerald-600 font-bold dir-ltr text-right">
                          {order.technician.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 text-xs sm:text-sm text-slate-700">
                    <p className="font-bold text-slate-900 mb-1">وصف العطل والملاحظات:</p>
                    <p className="leading-relaxed">{order.details}</p>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      التكلفة التقديرية للخدمة:{" "}
                      <span className="font-black text-slate-900 text-sm">
                        {order.estimatedPrice || 150} ج.م
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {order.technician?.numericId && (
                        <Link
                          to={`/workers/${order.technician.numericId}`}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center"
                        >
                          عرض بروفايل الفني
                        </Link>
                      )}

                      {order.status !== "completed" && order.status !== "cancelled" && (
                        <button
                          onClick={() => setCancelModalOrder(order)}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
                        >
                          إلغاء الطلب
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border border-slate-100 shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl">
                <FaExclamationTriangle />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  هل أنت متأكد من إلغاء الطلب؟
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  طلب رقم: #{cancelModalOrder.orderNumber}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleCancelConfirm}
                  disabled={cancelBookingMutation.isPending}
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition disabled:opacity-50"
                >
                  {cancelBookingMutation.isPending ? "جاري الإلغاء..." : "نعم، إلغاء الطلب"}
                </button>

                <button
                  onClick={() => setCancelModalOrder(null)}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  تراجع
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyOrders;
