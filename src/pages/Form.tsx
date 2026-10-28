import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaWrench,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories, useTechnicians, useCreateBookingMutation } from "../hooks/useQueries";
import type { Booking } from "../api/types";
import { useAuthStore } from "../store/store";

interface BookingFormData {
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  serviceCategory: string;
  workerId: string;
  scheduledDate: string;
  timeSlot: string;
  details: string;
  notes: string;
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

const timeSlots = [
  { id: "morning", title: "الفترة الصباحية", time: "9:00 ص - 12:00 م" },
  { id: "afternoon", title: "فترة الظهيرة", time: "12:00 م - 4:00 م" },
  { id: "evening", title: "الفترة المسائية", time: "4:00 م - 8:00 م" },
  { id: "urgent", title: "طوارئ (فوري)", time: "خلال 60 دقيقة" },
];

const Form = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const showToast = useAuthStore((state) => state.showToast);

  const initialWorkerId = searchParams.get("workerId") || "";
  const initialCategory = searchParams.get("service") || "";

  const { data: categories } = useCategories();
  const { data: allTechnicians } = useTechnicians();
  const createBookingMutation = useCreateBookingMutation();

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Today's date in YYYY-MM-DD
  const todayDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      customerName: user?.name || "",
      customerPhone: user?.phone || "",
      city: user?.city || "القاهرة",
      address: user?.address || "",
      serviceCategory: initialCategory || "ac",
      workerId: initialWorkerId,
      scheduledDate: todayDate,
      timeSlot: "afternoon",
      details: "",
      notes: "",
    },
  });

  const selectedCategory = watch("serviceCategory");
  const selectedWorkerId = watch("workerId");
  const selectedTimeSlot = watch("timeSlot");

  // Pre-fill user data when user changes
  useEffect(() => {
    if (user) {
      if (user.name) setValue("customerName", user.name);
      if (user.phone) setValue("customerPhone", user.phone);
      if (user.city) setValue("city", user.city);
      if (user.address) setValue("address", user.address);
    }
  }, [user, setValue]);

  // If a workerId was provided in URL, auto-set their category
  useEffect(() => {
    if (initialWorkerId && allTechnicians) {
      const match = allTechnicians.find(
        (t) => String(t.numericId) === initialWorkerId || t._id === initialWorkerId
      );
      if (match) {
        setValue("serviceCategory", match.category);
        setValue("workerId", String(match.numericId));
      }
    }
  }, [initialWorkerId, allTechnicians, setValue]);

  // Technicians matching selected category
  const filteredTechnicians =
    allTechnicians?.filter((t) => t.category === selectedCategory) || [];

  // Selected technician object
  const activeTechnician = allTechnicians?.find(
    (t) => String(t.numericId) === selectedWorkerId || t._id === selectedWorkerId
  );

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await createBookingMutation.mutateAsync({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        city: data.city,
        address: data.address,
        serviceCategory: data.serviceCategory,
        workerId: data.workerId || undefined,
        scheduledDate: data.scheduledDate,
        timeSlot: data.timeSlot,
        details: data.details,
        notes: data.notes,
      });

      setConfirmedBooking(response.data);
      showToast("تم إرسال طلب الصيانة بنجاح!", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "فشل إرسال طلب الصيانة، يرجى المحاولة ثانية", "error");
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-3">
            <FaWrench />
            <span>حجز موعد صيانة فوري</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            طلب فني <span className="text-orange-600">صيانة معتمد</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            املأ بيانات الطلب وسيتواصل معك الفني لتأكيد موعد الزيارة خلال دقائق
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* ================= 1. Service Category & Technician ================= */}
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>نوع الخدمة والفني المفضل</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    فئة الخدمة المطلوبة *
                  </label>
                  <select
                    {...register("serviceCategory", { required: "يرجى اختيار فئة الخدمة" })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold focus:outline-none focus:border-orange-500 transition"
                  >
                    {categories?.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.nameAr}
                      </option>
                    )) || (
                      <>
                        <option value="ac">مسؤولي التكييف</option>
                        <option value="electrician">مسؤولي الكهرباء</option>
                        <option value="plumber">مسؤولي السباكة</option>
                        <option value="carpenter">مسؤولي النجارة</option>
                        <option value="glass">مسؤولي الزجاج</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Worker Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    اختيار الفني (اختياري)
                  </label>
                  <select
                    {...register("workerId")}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold focus:outline-none focus:border-orange-500 transition"
                  >
                    <option value="">أي فني متاح في منطقتي (الأسرع وصولاً)</option>
                    {filteredTechnicians.map((t) => (
                      <option key={t.numericId} value={t.numericId}>
                        {t.name} — {t.city} (★ {t.rating})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Technician Highlight */}
              {activeTechnician && (
                <div className="mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-xs flex-shrink-0">
                    <img
                      src={activeTechnician.image}
                      alt={activeTechnician.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-sm text-slate-900">
                      الفني المختار: {activeTechnician.name}
                    </p>
                    <p className="text-xs text-orange-700">
                      {activeTechnician.specialty} • {activeTechnician.city} • تقييم: {activeTechnician.rating} ★
                    </p>
                  </div>
                  <div className="text-left font-black text-sm text-slate-800">
                    {activeTechnician.hourlyRate || 150} ج.م
                  </div>
                </div>
              )}
            </div>

            {/* ================= 2. Appointment Schedule ================= */}
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>الموعد والتوقيت المفضل</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    تاريخ الزيارة المطلوبة *
                  </label>
                  <input
                    type="date"
                    min={todayDate}
                    {...register("scheduledDate", { required: "يرجى تحديد التاريخ" })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold focus:outline-none focus:border-orange-500 transition"
                  />
                  {errors.scheduledDate && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.scheduledDate.message}
                    </p>
                  )}
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    الفترة المفضلة للزيارة *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setValue("timeSlot", slot.id)}
                        className={`p-3 rounded-2xl border text-right transition ${
                          selectedTimeSlot === slot.id
                            ? "bg-orange-600 text-white border-orange-600 shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <p className="font-extrabold text-xs">{slot.title}</p>
                        <p
                          className={`text-[10px] mt-0.5 ${
                            selectedTimeSlot === slot.id
                              ? "text-orange-100"
                              : "text-slate-500"
                          }`}
                        >
                          {slot.time}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= 3. Customer & Address Information ================= */}
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>بيانات التواصل والعنوان</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    الاسم بالكامل *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: حسام أحمد"
                      {...register("customerName", { required: "يرجى كتابة الاسم" })}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                    <FaUser className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                  </div>
                  {errors.customerName && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    رقم الهاتف المحمول *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="مثال: 01012345678"
                      {...register("customerPhone", {
                        required: "يرجى إدخال رقم الهاتف",
                        pattern: {
                          value: /^01[0125][0-9]{8}$/,
                          message: "يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً",
                        },
                      })}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 dir-ltr text-right"
                    />
                    <FaPhoneAlt className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                  </div>
                  {errors.customerPhone && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.customerPhone.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    المحافظة / المدينة *
                  </label>
                  <select
                    {...register("city", { required: "يرجى اختيار المحافظة" })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500"
                  >
                    {governorates.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    العنوان بالتفصيل (الشارع، رقم العمارة، الشقة) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: 15 شارع النصر، عمارة 4، الدور الثالث، شقة 7"
                      {...register("address", { required: "يرجى إدخال العنوان بالتفصيل" })}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                    />
                    <FaMapMarkerAlt className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                  </div>
                  {errors.address && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================= 4. Problem Details ================= */}
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>تفاصيل العطل أو الصيانة المطلوبة</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    وصف المشكلة بدقة *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="اشرح العطل الذي تواجهه (نوع الجهاز، متى بدأ العطل، أي ملاحظات مهمة للفني)..."
                    {...register("details", {
                      required: "يرجى كتابة تفاصيل العطل لمساعدة الفني في إحضار المعدات المناسبة",
                      minLength: { value: 10, message: "يرجى كتابة وصف لا يقل عن 10 أحرف" },
                    })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 resize-none"
                  ></textarea>
                  {errors.details && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.details.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    ملاحظات إضافية للفني (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                    {...register("notes")}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Price Estimation and Guarantee Notice */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-right">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl flex-shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-white">
                    ضمان جودة معتمد لمدة 30 يوماً
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    الدفع يتم نقداً أو إلكترونياً بعد إنجاز العمل والتأكد من حل المشكلة.
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-left border-t sm:border-t-0 sm:border-r border-slate-800 pt-3 sm:pt-0 sm:pr-6">
                <p className="text-xs text-slate-400">التكلفة التقديرية</p>
                <p className="text-2xl font-black text-orange-400">
                  {activeTechnician?.hourlyRate || 150} ج.م
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createBookingMutation.isPending}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {createBookingMutation.isPending ? "جاري تسجيل الطلب وإرساله..." : "تأكيد وإرسال طلب الصيانة"}
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-5 border border-slate-100"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                <FaCheckCircle />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  تم استلام طلبك بنجاح!
                </h3>
                <p className="text-slate-600 text-xs mt-1">
                  رقم الطلب الخاص بك للمتابعة:
                </p>
                <p className="text-xl font-black text-orange-600 mt-1 font-mono tracking-wider">
                  {confirmedBooking.orderNumber}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 text-right space-y-1.5 border border-slate-100">
                <p>
                  <strong>الخدمة:</strong> {confirmedBooking.serviceCategory}
                </p>
                <p>
                  <strong>الموعد:</strong> {confirmedBooking.scheduledDate} ({confirmedBooking.timeSlot})
                </p>
                <p>
                  <strong>العميل:</strong> {confirmedBooking.customerName} ({confirmedBooking.customerPhone})
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate("/myorders")}
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-sm transition"
                >
                  الانتقال لصفحة طلباتي
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="w-full py-2.5 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition"
                >
                  إغلاق النافذة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;
