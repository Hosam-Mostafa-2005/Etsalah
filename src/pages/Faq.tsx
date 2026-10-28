import { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaSearch,
  FaHeadset,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFaqs } from "../hooks/useQueries";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: faqs, isLoading } = useFaqs();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs =
    faqs?.filter(
      (f) =>
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs mb-3">
            <FaQuestionCircle />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            الأسئلة <span className="text-orange-600">الشائعة</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            كل ما تود معرفته عن خدمات الصيانة، الأسعار، الضمان، وكيفية حجز المواعيد.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في الأسئلة الشائعة (مثال: الضمان، الأسعار، الإلغاء)..."
            className="w-full px-5 py-3.5 pr-12 rounded-2xl bg-white border border-slate-200 text-sm font-semibold focus:outline-none focus:border-orange-500 shadow-sm transition"
          />
          <FaSearch className="absolute right-4 top-4 text-slate-400 text-base pointer-events-none" />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse h-16"
              ></div>
            ))}
          </div>
        )}

        {/* FAQs List */}
        {!isLoading && filteredFaqs.length > 0 && (
          <div className="space-y-4">
            {filteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item._id || index}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200 hover:border-orange-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-black text-base sm:text-lg text-slate-900 focus:outline-none transition"
                  >
                    <span className={isOpen ? "text-orange-600" : ""}>
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-orange-100 text-orange-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-6 sm:px-6 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Support CTA */}
        <div className="mt-14 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto text-2xl">
            <FaHeadset />
          </div>
          <h2 className="text-2xl font-black">لم تجد إجابة لسؤالك؟</h2>
          <p className="text-sm text-orange-100 max-w-md mx-auto">
            فريق خدمة العملاء لدينا مستعد لمساعدتك في أي استفسار أو مشكلة صيانة
            على مدار الساعة.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block px-7 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition"
            >
              تواصل مع فريق الدعم الآن
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
