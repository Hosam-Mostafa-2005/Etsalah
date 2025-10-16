import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaWrench,
  FaClock,
  FaShieldAlt,
  FaUserCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import WorkersCard from "../components/WorkersCard";
import { testimonials } from "../database/db";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <img
          src="/images/try3.png"
          alt="شعار أتصلّح - رمز الصيانة"
          className="w-[90%] max-w-[900px] h-auto object-contain mb-10 shadow-xl rounded-lg"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 text-center mb-8 max-w-4xl">
          أفضل خدمات الصيانة بين يديك
        </h1>

        <Link to={"/services"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white text-xl md:text-2xl font-bold px-12 py-4 rounded-full 
            shadow-2xl shadow-gray-900/40 hover:bg-orange-600 hover:shadow-orange-600/50 
            flex items-center gap-3 tracking-wider transition-all duration-300"
          >
            <FaArrowLeft className="text-orange-400" />
            اطلب فني متخصص الآن!
          </motion.button>
        </Link>
      </motion.div>

      {/* ================= WHY CHOOSE US ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
          ليه تختار <span className="text-orange-600">أتصلّح</span>؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            {
              icon: <FaClock className="text-orange-500 text-4xl mb-4" />,
              title: "سرعة في التنفيذ",
              text: "الفنيين جاهزين خلال دقائق لخدمتك في أي مكان داخل نطاق التغطية.",
            },
            {
              icon: <FaShieldAlt className="text-orange-500 text-4xl mb-4" />,
              title: "ثقة وجودة",
              text: "كل الفنيين مختارين بعناية وبيقدّموا خدمات مضمونة واحترافية.",
            },
            {
              icon: <FaUserCheck className="text-orange-500 text-4xl mb-4" />,
              title: "دعم 24/7",
              text: "فريق خدمة عملاء جاهز في أي وقت لو احتجت أي مساعدة.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center"
            >
              {item.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= HOW IT WORKS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 py-20"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
          كيف يعمل <span className="text-orange-600">أتصلّح؟</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto text-center">
          {[
            { icon: <FaWrench />, text: "اختر الخدمة المناسبة" },
            { icon: <FaMapMarkerAlt />, text: "حدد موقعك بسهولة" },
            { icon: <FaUserCheck />, text: "الفني يوصلك فورًا" },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-white rounded-2xl shadow-md p-6 w-60 flex flex-col items-center justify-center text-gray-700"
            >
              <div className="text-orange-500 text-4xl mb-3">{step.icon}</div>
              <p className="font-semibold">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= WORKERS SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <WorkersCard />
      </motion.div>

      {/* ================= TESTIMONIALS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
          آراء <span className="text-orange-600">عملائنا</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.slice(0, 3).map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <FaStar className="text-orange-500 mb-3" size={24} />
              <p className="text-gray-700 italic mb-3 leading-relaxed">
                “{review.text}”
              </p>
              <p className="text-orange-600 font-bold">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ================= CALL TO ACTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r from-orange-500 to-blue-900 text-white text-center py-16"
      >
        <h2 className="text-4xl font-extrabold mb-4">جاهز تصلّحها؟ 🔧</h2>
        <p className="text-lg mb-8 text-gray-100">
          احجز فنيك دلوقتي واستمتع بخدمة سريعة ومضمونة!
        </p>
        <Link
          to="/services"
          className="bg-white text-orange-600 font-bold px-10 py-3 rounded-full hover:bg-gray-200 transition"
        >
          احجز الآن
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;
