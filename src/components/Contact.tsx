import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaUser,
  FaCommentDots,
  FaTag,
} from "react-icons/fa";
import { motion } from "framer-motion";

// تعريف واجهة حقول النموذج
interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFields>();

  const onSubmit = async (data: ContactFields) => {
    console.log("Contact Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("تم استلام رسالتك بنجاح! سنتواصل معك قريباً.");
    reset();
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10 overflow-x-hidden">
      {/* ================= TITLE SECTION ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-4xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
          تواصل معنا <span className="text-orange-600">مباشرةً</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          نحن هنا للمساعدة! أرسل استفسارك وسنرد عليك في أقرب وقت.
        </p>
      </motion.div>

      {/* ================= CONTACT CONTENT GRID ================= */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الأول: معلومات الاتصال (الخلفية الداكنة) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl lg:col-span-1 border-b-4 border-orange-600 h-fit"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-orange-500">
            بيانات الاتصال
          </h2>
          <div className="space-y-6">
            <div className="flex items-center text-lg gap-4 text-gray-300">
              <FaMapMarkerAlt className="text-orange-500" size={24} />
              <p className="text-right">مكتبنا الرئيسي: طنطا ، مصر</p>
            </div>
            <div className="flex items-center text-lg gap-4 text-gray-300">
              <FaPhone className="text-orange-500" size={24} />
              <p className="text-right">للدعم الفني: 0122980987</p>
            </div>
            <div className="flex items-center text-lg gap-4 text-gray-300">
              <FaEnvelope className="text-orange-500" size={24} />
              <p className="text-right">للإستفسارات: info@atsalah.com</p>
            </div>
          </div>

          {/* خريطة افتراضية بسيطة */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 font-semibold"></div>
          </div>
        </motion.div>

        {/* العمود الثاني: نموذج المراسلة (الخلفية الفاتحة) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-2xl lg:col-span-2 border-t-8 border-orange-600"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-right">
            أرسل رسالتك
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* الاسم والبريد الإلكتروني (في صف واحد على الشاشات الكبيرة) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* حقل الاسم */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-right font-semibold text-gray-700 mb-2"
                >
                  اسمك
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "الاسم مطلوب" })}
                    className={`w-full pr-10 py-3 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:ring-orange-500 focus:outline-none focus:ring-2 text-right`}
                    placeholder="ادخل اسمك"
                  />
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm text-right mt-1">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              {/* حقل البريد الإلكتروني */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-right font-semibold text-gray-700 mb-2"
                >
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "البريد الإلكتروني مطلوب",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "صيغة غير صحيحة",
                      },
                    })}
                    className={`w-full pr-10 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-orange-500 focus:outline-none focus:ring-2 text-right`}
                    placeholder="example@mail.com"
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm text-right mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* حقل الموضوع */}
            <div>
              <label
                htmlFor="subject"
                className="block text-right font-semibold text-gray-700 mb-2"
              >
                الموضوع
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  {...register("subject", { required: "الموضوع مطلوب" })}
                  className={`w-full pr-10 py-3 rounded-xl border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } focus:ring-orange-500 focus:outline-none focus:ring-2 text-right`}
                  placeholder="استفسار عن خدمة..."
                />
                <FaTag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.subject && (
                <p className="text-red-500 text-sm text-right mt-1">
                  {errors.subject.message as string}
                </p>
              )}
            </div>

            {/* حقل الرسالة */}
            <div>
              <label
                htmlFor="message"
                className="block text-right font-semibold text-gray-700 mb-2"
              >
                رسالتك
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", {
                    required: "الرسالة مطلوبة",
                    minLength: {
                      value: 10,
                      message: "يجب أن لا تقل الرسالة عن 10 أحرف",
                    },
                  })}
                  className={`w-full p-4 rounded-xl border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:ring-orange-500 focus:outline-none focus:ring-2 text-right`}
                  placeholder="اكتب رسالتك هنا..."
                />
                <FaCommentDots className="absolute right-3 top-4 text-gray-400" />
              </div>
              {errors.message && (
                <p className="text-red-500 text-sm text-right mt-1">
                  {errors.message.message as string}
                </p>
              )}
            </div>

            {/* زر الإرسال */}
            <div className="text-left pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 text-white font-bold text-lg px-8 py-3 rounded-full 
                           hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-500/50 
                           disabled:bg-gray-400 flex items-center gap-2"
              >
                <FaPaperPlane />
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
