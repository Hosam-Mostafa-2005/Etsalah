import { useAuthStore } from "../store/store";
import {
  FaBoxOpen,
  FaWrench,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCommentDots,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MyOrders = () => {
  const orders = useAuthStore((state) => state.orders);
  const removeOrder = useAuthStore((state) => state.removeOrder);

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10 overflow-x-hidden">
      {/* عنوان الصفحة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black text-gray-800">
          طلبات <span className="text-orange-600">الصيانة</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          تتبع حالة طلباتك الحالية والسابقة.
        </p>
      </motion.div>

      {/* عرض الطلبات */}
      <div className="max-w-4xl mx-auto px-6">
        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <motion.div
                key={order.name || index} // استخدم id فريد إذا كان متاحًا
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border-t-8 border-orange-600 space-y-6"
              >
                {/* عنوان البطاقة */}
                <div className="flex items-center gap-4 border-b pb-4 mb-4 border-gray-200">
                  <FaBoxOpen className="text-orange-600 text-3xl" />
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    طلب خدمة #
                    <span className="text-orange-600">{index + 1}</span>
                  </h2>
                </div>

                {/* تفاصيل الطلب */}
                <div className="space-y-4 text-lg text-gray-700">
                  <div className="flex items-center gap-3 justify-end text-xl">
                    <span className="font-bold">{order.name}</span>
                    <FaUser className="text-orange-500" />
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <span className="font-medium">{order.phone}</span>
                    <FaPhoneAlt className="text-green-600" />
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <span className="font-medium">{order.city}</span>
                    <FaMapMarkerAlt className="text-red-500" />
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <span className="font-medium">{order.service}</span>
                    <FaWrench className="text-blue-500" />
                  </div>
                  {/* <div className="flex items-center gap-3 justify-end">
                    <span className="font-medium">{order.workerName}</span>
                    <FaUser className="text-orange-500" />
                  </div> */}
                  <div className="flex items-start gap-3 justify-end text-right border-t pt-4 border-gray-200">
                    <span className="font-medium">{order.details}</span>
                    <FaCommentDots className="text-gray-400 mt-1" />
                  </div>
                </div>

                <div className="text-center mt-6 p-4 rounded-xl bg-blue-50 text-blue-600 font-bold">
                  حالة الطلب: في انتظار تأكيد الفني.
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => removeOrder(order)}
                    className="py-2 px-4 rounded-full bg-red-100 text-red-600 font-bold 
                       hover:bg-red-200 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    إلغاء الخدمة
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-xl font-bold text-gray-500">
            <FaBoxOpen className="mx-auto text-6xl mb-4 text-gray-400" />
            <p>لا يوجد لديك أي طلبات حالية.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
