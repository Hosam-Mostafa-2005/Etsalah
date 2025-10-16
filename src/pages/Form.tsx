import { useForm } from "react-hook-form";
import {
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaWrench,
  FaCommentDots,
  FaUserCog, // أيقونة العامل
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { workers } from "../database/db";
import { useAuthStore, type Form as FormType } from "../store/store";
import { v4 as uuidv4 } from "uuid";

// تعريف الواجهة لتجنب أي مشاكل Typescript
interface FormData {
  name: string;
  phone: string;
  city: string;
  service: string;
  workerId: string;
  details: string;
}

const Form = () => {
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const addOrder = useAuthStore((state) => state.addOrder);

  const [searchParams] = useSearchParams();
  const workerIdParam = searchParams.get("workerId");

  // الحل: تحديد العامل المحدد من الرابط وتحويل ID لـ Number
  const selectedWorker = workers.find((w) => w.id === Number(workerIdParam));

  // ** 1. تحديد القيم الافتراضية **
  const defaultService = selectedWorker ? selectedWorker.category : "";
  const defaultWorkerId = selectedWorker ? String(selectedWorker.id) : "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // ** 2. تمرير القيم الافتراضية لـ useForm **
    defaultValues: {
      service: defaultService,
      workerId: defaultWorkerId,
    },
  });

  const selectedCategory = watch("service");

  const filteredWorkers = workers.filter(
    (w) => w.category === selectedCategory
  );

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOrder: FormType = {
      name: data.name,
      phone: data.phone,
      city: data.city,
      service: data.service,
      workerId: data.workerId,
      details: data.details,
      id: uuidv4(),
    };

    addOrder(newOrder);

    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
      navigate("/myOrders");
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10 overflow-x-hidden">
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-green-500 text-white rounded-lg shadow-xl text-center font-bold text-lg"
          >
            ✅ تم إرسال طلبك بنجاح!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black text-gray-800">
          اطلب خدمة <span className="text-orange-600">صيانة</span> الآن
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          املأ البيانات وسنتواصل معك في أسرع وقت.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-8 md:p-12 bg-white rounded-2xl shadow-2xl border-t-8 border-orange-600 space-y-6"
      >
        {/* حقل اسم العميل */}
        <div>
          <label
            htmlFor="name"
            className="block text-right font-semibold text-gray-700 mb-2"
          >
            اسمك الكامل
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              {...register("name", { required: "الاسم مطلوب" })}
              placeholder="مثال: محمد علي"
              className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
            />
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm text-right mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* حقل رقم الهاتف */}
        <div>
          <label
            htmlFor="phone"
            className="block text-right font-semibold text-gray-700 mb-2"
          >
            رقم الهاتف
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              {...register("phone", { required: "رقم الهاتف مطلوب" })}
              placeholder="مثال: 01012345678"
              className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
            />
            <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm text-right mt-1">
              {errors.phone.message as string}
            </p>
          )}
        </div>

        {/* حقل المدينة */}
        <div>
          <label
            htmlFor="city"
            className="block text-right font-semibold text-gray-700 mb-2"
          >
            المدينة
          </label>
          <div className="relative">
            <input
              type="text"
              id="city"
              {...register("city", { required: "المدينة مطلوبة" })}
              placeholder="مثال: القاهرة، الجيزة"
              className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
            />
            <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm text-right mt-1">
              {errors.city.message as string}
            </p>
          )}
        </div>

        {/* حقل التخصص (الـ Select الأول) */}
        <div>
          <label
            htmlFor="service"
            className="block text-right font-semibold text-gray-700 mb-2"
          >
            نوع الخدمة
          </label>
          <div className="relative">
            <select
              id="service"
              {...register("service", { required: "نوع الخدمة مطلوب" })}
              disabled={!!selectedWorker}
              className={`w-full pr-10 pl-4 py-3 rounded-xl border appearance-none ${
                errors.service ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right ${
                selectedWorker ? "bg-gray-200" : ""
              }`}
            >
              <option value="">-- اختر نوع الخدمة --</option>
              <option value="electrician">كهرباء</option>
              <option value="ac">تكييف</option>
              <option value="plumber">سباكة</option>
              <option value="carpenter">نجارة</option>
              <option value="glass">زجاج</option>
            </select>
            <FaWrench className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.service && (
            <p className="text-red-500 text-sm text-right mt-1">
              {errors.service.message as string}
            </p>
          )}
        </div>

        {/* حقل اختيار العامل (الـ Select الثاني) */}
        {selectedCategory && filteredWorkers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="workerId"
              className="block text-right font-semibold text-gray-700 mb-2"
            >
              اختر العامل
            </label>
            <div className="relative">
              <select
                id="workerId"
                {...register("workerId", { required: "يجب اختيار العامل" })}
                disabled={!!selectedWorker}
                className={`w-full pr-10 pl-4 py-3 rounded-xl border appearance-none ${
                  errors.workerId ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right ${
                  selectedWorker ? "bg-gray-200" : ""
                }`}
              >
                <option value="">-- اختر عامل من قائمة المتاحين --</option>
                {filteredWorkers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name} (تقييم: {worker.rating})
                  </option>
                ))}
              </select>
              <FaUserCog className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.workerId && (
              <p className="text-red-500 text-sm text-right mt-1">
                {errors.workerId.message as string}
              </p>
            )}
          </motion.div>
        )}

        {/* حقل تفاصيل المشكلة */}
        <div>
          <label
            htmlFor="details"
            className="block text-right font-semibold text-gray-700 mb-2"
          >
            تفاصيل المشكلة
          </label>
          <div className="relative">
            <textarea
              id="details"
              {...register("details", { required: "تفاصيل المشكلة مطلوبة" })}
              placeholder="اكتب هنا شرحًا بسيطًا للمشكلة التي تواجهك..."
              rows={4}
              className={`w-full p-4 rounded-xl border ${
                errors.details ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-orange-500 text-right`}
            />
            <FaCommentDots className="absolute right-3 top-5 text-gray-400" />
          </div>
          {errors.details && (
            <p className="text-red-500 text-sm text-right mt-1">
              {errors.details.message as string}
            </p>
          )}
        </div>

        {/* زر الإرسال */}
        <div className="text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-orange-600 text-white font-bold text-lg px-12 py-4 rounded-full 
                       hover:bg-orange-700 transition duration-300 transform shadow-lg shadow-orange-500/50 
                       disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center gap-3 mx-auto"
          >
            <FaPaperPlane />
            {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Form;
