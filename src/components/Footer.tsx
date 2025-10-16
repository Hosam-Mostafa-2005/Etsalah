import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-12 pb-8 mt-16 shadow-2xl shadow-gray-700/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-right gap-12">
          {/* Brand & Motto */}
          <div className="md:w-1/3">
            <h2 className="text-4xl font-black tracking-widest mb-4 text-orange-500">
              أتصلّح
            </h2>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed">
              شريكك الموثوق للإصلاح والصيانة. جودة، احترافية، وراحة بال في كل
              خطوة.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row justify-around flex-grow gap-12 text-sm md:text-base md:w-2/3">
            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-orange-500/50 pb-1">
                روابط سريعة
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out hover:tracking-wide"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out hover:tracking-wide"
                  >
                    الخدمات المتاحة
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out hover:tracking-wide"
                  >
                    تواصل معنا
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Links */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4 text-white border-b border-orange-500/50 pb-1">
                حسابي
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out"
                  >
                    الملف الشخصي
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myOrders"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out hover:tracking-wide"
                  >
                    طلبات الصيانة
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-orange-500 transition duration-300 ease-in-out hover:tracking-wide"
                  >
                    الأسئلة الشائعة
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 mt-12 mb-6"></div>

        {/* Bottom Section - Social & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Social Icons */}
          <div className="flex justify-center gap-4 order-2 sm:order-1">
            <a
              href="https://www.facebook.com/hosam.eldin.18400"
              target="_blank"
              className="text-orange-400 p-2 rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-orange-400 p-2 rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-orange-400 p-2 rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="text-orange-400 p-2 rounded-full hover:bg-gray-800 transition transform hover:scale-110"
              aria-label="Youtube"
            >
              <FaYoutube size={20} />
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-center text-sm text-gray-500 order-1 sm:order-2">
            © {new Date().getFullYear()} أتصلّح. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
