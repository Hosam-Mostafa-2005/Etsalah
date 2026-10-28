import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaToolbox,
  FaCalendarCheck,
  FaCheckCircle,
  FaCommentDots,
} from "react-icons/fa";
import { useTechnician, useCreateReviewMutation } from "../hooks/useQueries";
import { useAuthStore } from "../store/store";

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading, isError } = useTechnician(id);
  const user = useAuthStore((state) => state.user);
  const showToast = useAuthStore((state) => state.showToast);

  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState("");
  const [nameInput, setNameInput] = useState(user?.name || "");

  const createReviewMutation = useCreateReviewMutation(id);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) {
      showToast("يرجى كتابة نص التقييم", "error");
      return;
    }
    const reviewerName = nameInput.trim() || user?.name || "عميل موثوق";

    try {
      await createReviewMutation.mutateAsync({
        workerId: id!,
        rating: ratingInput,
        comment: commentInput.trim(),
        customerName: reviewerName,
      });
      setCommentInput("");
      showToast("تم نشر تقييمك بنجاح! شكراً لمشاركتك", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "تعذر إضافة التقييم حالياً", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse space-y-6">
          <div className="flex gap-6 items-center">
            <div className="w-28 h-28 rounded-full bg-slate-200"></div>
            <div className="space-y-3 flex-1">
              <div className="h-7 bg-slate-200 rounded-md w-1/3"></div>
              <div className="h-5 bg-slate-200 rounded-md w-1/4"></div>
            </div>
          </div>
          <div className="h-20 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (isError || !worker) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-sm">
          <h2 className="text-2xl font-black text-rose-600 mb-2">
            عذراً، الفني غير موجود
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            قد يكون تم نقل الحساب أو إزالته من قبل إدارة المنصة.
          </p>
          <Link
            to="/services"
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm inline-block"
          >
            العودة لصفحة الخدمات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
          <Link to="/" className="hover:text-orange-600 transition">
            الرئيسية
          </Link>
          <span>/</span>
          <Link to="/services" className="hover:text-orange-600 transition">
            الخدمات
          </Link>
          <span>/</span>
          <Link
            to={`/services/${worker.category}`}
            className="hover:text-orange-600 transition"
          >
            {worker.specialty}
          </Link>
          <span>/</span>
          <span className="text-orange-600">{worker.name}</span>
        </div>

        {/* Profile Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-700">
                  <img
                    src={worker.image || "/images/try.png"}
                    alt={worker.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/try.png";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-slate-900 flex items-center gap-1">
                  <FaShieldAlt />
                  <span>معتمد</span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="text-center md:text-right flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs mb-2 border border-orange-500/30">
                  <FaToolbox />
                  <span>فني {worker.specialty} معتمد</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                  {worker.name}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-slate-300 mb-4">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-rose-400" />
                    <span>{worker.city}</span>
                  </div>
                  <span>•</span>
                  <div>{worker.experienceYears || 5} سنوات خبرة معتمدة</div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-bold text-amber-400">
                    <FaStar />
                    <span>{worker.rating} / 5</span>
                    <span className="text-slate-400 font-normal">
                      ({worker.reviewsCount} تقييم)
                    </span>
                  </div>
                </div>

                {/* Direct Contact Phone */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm">
                  <FaPhoneAlt className="text-emerald-400" />
                  <span className="dir-ltr font-mono">{worker.phone}</span>
                </div>
              </div>

              {/* CTA Booking Button */}
              <div className="w-full md:w-auto">
                <Link
                  to={`/form?workerId=${worker.numericId}`}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base shadow-lg shadow-orange-600/30 transition transform hover:-translate-y-0.5"
                >
                  <FaCalendarCheck />
                  <span>حجز موعد الآن</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Bio */}
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-2">
                نبذة عن الفني والخبرات
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {worker.bio}
              </p>
            </div>

            {/* Skills */}
            {worker.skills && worker.skills.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-slate-900 mb-3">
                  المهارات والخدمات المشمولة
                </h2>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200/60"
                    >
                      <FaCheckCircle className="text-orange-500 text-xs" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing info */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-bold">رسوم الفحص والخدمة التقديرية</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {worker.hourlyRate || 150} جنيه مصري
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                شامل الضمان
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <FaStar className="text-amber-400" />
              <span>تقييمات وآراء العملاء</span>
              <span className="text-sm font-bold text-slate-500">
                ({worker.reviews?.length || 0})
              </span>
            </h2>

            {worker.reviews && worker.reviews.length > 0 ? (
              worker.reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                        {rev.customerName?.charAt(0) || "ع"}
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">
                        {rev.customerName}
                      </span>
                    </div>

                    <div className="flex text-amber-400 text-xs">
                      {[...Array(Math.floor(rev.rating || 5))].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed pr-10">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 text-slate-500">
                <FaCommentDots className="text-3xl text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold">لا توجد تقييمات سابقة بعد لهذا الفني.</p>
                <p className="text-xs text-slate-400 mt-1">
                  كن أول من يقيم تجربة الصيانة معه!
                </p>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm sticky top-28">
              <h3 className="text-lg font-black text-slate-900 mb-1">
                أضف تقييمك للفني
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                شارك تجربتك لمساعدة باقي العملاء على اختيار الفني الأفضل.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    التقييم العام
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatingInput(star)}
                        className={`text-2xl transition ${
                          star <= ratingInput
                            ? "text-amber-400 scale-110"
                            : "text-slate-200 hover:text-amber-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 mr-2">
                      ({ratingInput} من 5 نجوم)
                    </span>
                  </div>
                </div>

                {/* Name */}
                {!user && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      اسمك الكريم
                    </label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="مثال: أحمد مصطفى"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                )}

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تعليقك وتجربتك
                  </label>
                  <textarea
                    rows={4}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="اكتب ملاحظاتك عن جودة الشغل، الالتزام بالموعد، والمعاملة..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-orange-500 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={createReviewMutation.isPending}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-sm transition disabled:opacity-50"
                >
                  {createReviewMutation.isPending ? "جاري النشر..." : "إرسال التقييم"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
