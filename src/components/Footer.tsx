import { Link } from "react-router-dom";
import {
  FaWrench,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeart,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <FaWrench className="text-lg -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">اتصلح</span>
                <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase">
                  EtSalah Platform
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              المنصة الرائدة في مصر لربط العملاء بأمهر الفنيين المعتمدين في صيانة
              التكييف والكهرباء والسباكة والنجارة والزجاج بضمان معتمد وأسعار عادلة.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <FaShieldAlt />
              <span>ضمان جودة معتمد 30 يوماً على جميع الخدمات</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 pb-1 border-b border-orange-500/30 inline-block">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-orange-400 transition">
                  جميع الخدمات والفنيين
                </Link>
              </li>
              <li>
                <Link to="/myorders" className="hover:text-orange-400 transition">
                  متابعة طلباتي
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-orange-400 transition">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 pb-1 border-b border-orange-500/30 inline-block">
              أقسام الصيانة
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/services/ac"
                  className="hover:text-orange-400 transition flex items-center justify-between"
                >
                  <span>صيانة التكييف</span>
                  <span className="text-xs text-slate-400">10 فنيين</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services/electrician"
                  className="hover:text-orange-400 transition flex items-center justify-between"
                >
                  <span>أعمال الكهرباء</span>
                  <span className="text-xs text-slate-400">10 فنيين</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services/plumber"
                  className="hover:text-orange-400 transition flex items-center justify-between"
                >
                  <span>السباكة ومعالجة التسريب</span>
                  <span className="text-xs text-slate-400">10 فنيين</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services/carpenter"
                  className="hover:text-orange-400 transition flex items-center justify-between"
                >
                  <span>النجارة والأثاث</span>
                  <span className="text-xs text-slate-400">10 فنيين</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services/glass"
                  className="hover:text-orange-400 transition flex items-center justify-between"
                >
                  <span>الزجاج والألوميتال</span>
                  <span className="text-xs text-slate-400">10 فنيين</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 pb-1 border-b border-orange-500/30 inline-block">
              تواصل ومساعدة
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">الخط الساخن</p>
                  <p className="font-bold text-white dir-ltr">19000 / 01012345678</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">البريد الإلكتروني</p>
                  <p className="font-bold text-white">support@etsalah.com</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FaClock size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">أوقات العمل والدعم</p>
                  <p className="font-bold text-white">طوال أيام الأسبوع 24/7</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">نطاق التغطية</p>
                  <p className="font-bold text-white">كافة محافظات جمهورية مصر العربية</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center">
          <p>© {new Date().getFullYear()} اتصلح (EtSalah). جميع الحقوق محفوظة.</p>
          <p className="flex items-center justify-center gap-1.5">
            صنع بكل <FaHeart className="text-rose-500 text-xs" /> لخدمة المنازل في مصر
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
