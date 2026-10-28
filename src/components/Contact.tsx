import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaShieldAlt,
} from "react-icons/fa";
import { useContactMutation } from "../hooks/useQueries";
import { useAuthStore } from "../store/store";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const user = useAuthStore((state) => state.user);
  const showToast = useAuthStore((state) => state.showToast);
  const contactMutation = useContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await contactMutation.mutateAsync(data);
      showToast("تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة العملاء قريباً", "success");
      reset();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة ثانية", "error");
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-3">
            <FaPhoneAlt />
            <span>فريق خدمة العملاء جاهز لخدمتك</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            تواصل معنا <span className="text-orange-600">مباشرةً</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            هل لديك استفسار أو اقتراح أو تحتاج إلى مساعدة خاصة؟ نحن هنا لمساعدتك
            على مدار الساعة.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
            <div>
              <h2 className="text-2xl font-black mb-2">معلومات التواصل المباشر</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                يسعدنا الرد على جميع استفساراتك وتقديم الدعم الفني اللازم لخدمات
                الصيانة.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">الخط الساخن والدعم</p>
                  <p className="text-lg font-black text-white dir-ltr text-right mt-0.5">
                    19000 / 01012345678
                  </p>
                  <p className="text-xs text-emerald-400 mt-1">متاح طوال اليوم 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">البريد الإلكتروني</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    support@etsalah.com
                  </p>
                  <p className="text-xs text-slate-400 mt-1">نرد خلال ساعات معدودة</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">نطاق التغطية</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    القاهرة، الجيزة، الإسكندرية وجميع محافظات مصر
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl flex-shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">الضمان وحل الشكاوى</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    ضمان 30 يوماً على كافة الخدمات مع استجابة فورية لأي ملاحظة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              أرسل لنا رسالة
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              املأ النموذج أدناه وسيقوم فريق الدعم بالرد عليك في أقرب وقت.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم بالكامل *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="أحمد محمد"
                      {...register("name", { required: "يرجى كتابة الاسم" })}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 transition"
                    />
                    <FaUser className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
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
                          message: "صيغة البريد غير صحيحة",
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف (اختياري)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="01012345678"
                      {...register("phone")}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 dir-ltr text-right transition"
                    />
                    <FaPhoneAlt className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    موضوع الرسالة *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="استفسار عن خدمة، شكوى، تعاون..."
                      {...register("subject", { required: "يرجى كتابة موضوع الرسالة" })}
                      className="w-full px-4 py-3 pr-10 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 transition"
                    />
                    <FaTag className="absolute right-3.5 top-4 text-slate-400 text-sm pointer-events-none" />
                  </div>
                  {errors.subject && (
                    <p className="text-rose-500 text-xs mt-1 font-bold">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  تفاصيل الرسالة *
                </label>
                <div className="relative">
                  <textarea
                    rows={5}
                    placeholder="اكتب استفسارك أو تفاصيل ما تحتاج إليه بدقة..."
                    {...register("message", {
                      required: "يرجى كتابة نص الرسالة",
                      minLength: { value: 10, message: "الرسالة يجب أن لا تقل عن 10 أحرف" },
                    })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 resize-none transition"
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="text-rose-500 text-xs mt-1 font-bold">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm shadow-md shadow-orange-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FaPaperPlane />
                <span>{contactMutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة الآن"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
