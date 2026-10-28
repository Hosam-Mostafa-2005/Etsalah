import { Link } from "react-router-dom";
import {
  FaWrench,
  FaArrowLeft,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaTools,
  FaBolt,
  FaHammer,
  FaFaucet,
  FaGlassWhiskey,
  FaSnowflake,
  FaQuoteRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import WorkersCard from "../components/WorkersCard";
import { useCategories, useTestimonials } from "../hooks/useQueries";

const categoryIconMap: Record<string, React.ReactNode> = {
  ac: <FaSnowflake className="text-2xl text-cyan-500" />,
  electrician: <FaBolt className="text-2xl text-amber-500" />,
  plumber: <FaFaucet className="text-2xl text-blue-500" />,
  carpenter: <FaHammer className="text-2xl text-amber-700" />,
  glass: <FaGlassWhiskey className="text-2xl text-slate-500" />,
};

const Home = () => {
  const { data: categories } = useCategories();
  const { data: testimonials } = useTestimonials();

  return (
    <div className="overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Right Text Content (RTL) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-right"
            >
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/90 text-orange-700 text-xs sm:text-sm font-black border border-orange-200">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>المنصة رقم 1 في مصر لخدمات الصيانة المنزلية المعتمدة</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2]">
                بيتك في أمان مع <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                  أمهر الفنيين المعتمدين
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                تكييف، كهرباء، سباكة، نجارة وزجاج. اختر الفني الأنسب، حدد ميعاد
                الزيارة، واستمتع بصيانة احترافية بأسعار معلنة وضمان جودة معتمد.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/form"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                >
                  <span>اطلب صيانة الآن</span>
                  <FaArrowLeft className="text-sm" />
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                >
                  <FaTools className="text-orange-600" />
                  <span>استكشف الفنيين المتاحين</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0 text-center lg:text-right">
                <div>
                  <p className="text-2xl font-black text-slate-900">50+</p>
                  <p className="text-xs font-bold text-slate-600">فني محترف</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">4.8 ★</p>
                  <p className="text-xs font-bold text-slate-600">تقييم العملاء</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">30 يوم</p>
                  <p className="text-xs font-bold text-slate-600">ضمان معتمد</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                  <img
                    src="/images/try3.png"
                    alt="اتصلح لخدمات الصيانة"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating pill: Fast Service */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 z-20 flex items-center gap-3.5"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-black">
                    <FaClock />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-bold">سرعة استجابة فائقة</p>
                    <p className="text-sm font-black text-slate-900">
                      فني عند باب منزلك في خلال دقائق
                    </p>
                  </div>
                </motion.div>

                {/* Floating pill: Guarantee */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 z-20 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">
                      ضمان شامل على الإصلاح
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES QUICK SELECTOR ================= */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              اختر فئة الصيانة المطلوبة
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              نوفر لك خيرة المتخصصين المعتمدين في كافة المجالات المنزلية
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories && categories.length > 0
              ? categories.map((cat) => (
                  <Link
                    key={cat._id || cat.key}
                    to={`/services/${cat.key}`}
                    className="group bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-3xl p-5 text-center transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 shadow-xs hover:shadow-md"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                      {categoryIconMap[cat.key] || <FaWrench className="text-2xl text-orange-600" />}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-800 group-hover:text-orange-600 transition">
                        {cat.nameAr}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {cat.techniciansCount || 10} فنيين متاحين
                      </p>
                    </div>
                  </Link>
                ))
              : [
                  { key: "ac", name: "مسؤولي التكييف" },
                  { key: "electrician", name: "مسؤولي الكهرباء" },
                  { key: "plumber", name: "مسؤولي السباكة" },
                  { key: "carpenter", name: "مسؤولي النجارة" },
                  { key: "glass", name: "مسؤولي الزجاج" },
                ].map((cat) => (
                  <Link
                    key={cat.key}
                    to={`/services/${cat.key}`}
                    className="bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-3xl p-5 text-center transition flex flex-col items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                      {categoryIconMap[cat.key]}
                    </div>
                    <span className="font-bold text-sm text-slate-800">
                      {cat.name}
                    </span>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* ================= TOP WORKERS SECTION (API DATA) ================= */}
      <WorkersCard />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
              لماذا اتصلح؟
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              صيانة بدون مفاجآت أو قلق
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              صممنا اتصلح لنغير مفهوم الصيانة المنزلية التقليدي ونمنحك تجربة
              مريحة، آمنة ومضمونة 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="text-3xl text-orange-400" />,
                title: "فنيون معتمدون ومفحوصون",
                text: "جميع الفنيين يخضعون لفحص أمني واختبارات كفاءة فنية للتأكد من مهاراتهم قبل الانضمام لشبكتنا.",
              },
              {
                icon: <FaClock className="text-3xl text-amber-400" />,
                title: "التزام تام بالمواعيد",
                text: "وقتك ثمين؛ نضمن لك وصول الفني في الموعد المتفق عليه مع متابعة حية وتحديثات لحظية لحالة الطلب.",
              },
              {
                icon: <FaCheckCircle className="text-3xl text-emerald-400" />,
                title: "تسعير عادل وضمان 30 يوم",
                text: "أسعار واضحة بدون رسوم خفية، مع ضمان لمدة شهر كامل على جميع أعمال الصيانة وقطع الغيار المستخدمة.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-slate-800/80 border border-slate-700/60 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-700/80 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-wider">
              بسيطة وسلسة
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              كيف تطلب خدمة صيانة في 3 خطوات؟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "اختر الخدمة أو الفني",
                desc: "تصفح الفئات واطلع على تقييمات الفنيين المعتمدين في منطقتك واختر من يناسبك.",
              },
              {
                step: "02",
                title: "حدد الموعد وتفاصيل المشكلة",
                desc: "اكتب وصفاً مختصراً للعطل وحدد اليوم والوقت المناسب لزيارة الفني.",
              },
              {
                step: "03",
                title: "استقبل الفني وادفع بعد الرضا",
                desc: "يصلك الفني المعتمد في الموعد لإنجاز المهمة، ولا تدفع إلا بعد التأكد من جودة الإصلاح.",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-black text-orange-200">
                    {s.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-4 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS (API DATA) ================= */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-orange-600 font-bold text-xs">
                آراء حقيقية
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-1">
                ماذا يقول عملاؤنا عن تجاربهم؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-amber-400 text-sm">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <FaQuoteRight className="text-slate-200 text-xl" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-600">{item.city || "عميل موثوق"}</p>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      خدمة مؤكدة
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= BOTTOM CTA ================= */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            جاهز لحل أي مشكلة صيانة في منزلك؟
          </h2>
          <p className="text-orange-100 text-base mb-8 max-w-xl mx-auto">
            احجز الآن فني معتمد بضمان الجودة وخلال دقائق سيكون فريق العمل جاهزاً
            لخدمتك في أي مكان في مصر.
          </p>
          <Link
            to="/form"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-base shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span>اطلب فني متخصص الآن</span>
            <FaArrowLeft className="text-orange-400" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
