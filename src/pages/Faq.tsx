import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { faq } from "../database/db";
import { Link } from "react-router-dom";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10 overflow-x-hidden">
      {/* عنوان الصفحة */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-4xl mx-auto px-4"
      >
        <FaQuestionCircle className="text-orange-600 text-5xl mx-auto mb-3" />
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
          الأسئلة <span className="text-orange-600">الشائعة</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          إليك إجابات لأكثر الاستفسارات شيوعاً حول خدماتنا.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-gray-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-right p-5 flex justify-between items-center transition-all duration-300 ${
                openIndex === index
                  ? "bg-orange-50 border-r-4 border-orange-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-xl font-bold ${
                  openIndex === index ? "text-orange-700" : "text-gray-800"
                }`}
              >
                {item.question}
              </span>
              {openIndex === index ? (
                <FaChevronUp className="text-orange-600 ml-3" size={16} />
              ) : (
                <FaChevronDown className="text-gray-400 ml-3" size={16} />
              )}
            </button>

            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 pt-0 text-right"
              >
                <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 p-8 max-w-lg mx-auto">
        <p className="text-gray-700 font-medium text-lg">لم تجد إجابتك؟</p>
        <Link
          to="/contact"
          className="inline-block mt-3 text-white bg-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-700 transition shadow-lg transform hover:scale-105"
        >
          تواصل مع فريق الدعم مباشرة
        </Link>
      </div>
    </div>
  );
};

export default Faq;
