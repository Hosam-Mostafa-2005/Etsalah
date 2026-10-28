import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaWrench,
  FaClipboardList,
  FaUserCircle,
  FaSignInAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/store";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useAuthStore((state) => state.showToast);
  const navigate = useNavigate();

  const isLoggedIn = Boolean(token && user);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    showToast("تم تسجيل الخروج بنجاح", "info");
    navigate("/");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-base font-bold transition-all duration-200 ${
      isActive
        ? "text-orange-600 bg-orange-50/80 shadow-xs"
        : "text-slate-600 hover:text-orange-600 hover:bg-slate-100/70"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition ${
      isActive
        ? "text-orange-600 bg-orange-50 font-black"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav className="glass-nav shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <FaWrench className="text-xl -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition">
                اتصلح
              </span>
              <span className="text-[10px] font-bold text-slate-600 -mt-1 tracking-wider uppercase">
                EtSalah
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <NavLink to="/" end className={navLinkClass}>
              <span>الرئيسية</span>
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              <span>الخدمات والفنيين</span>
            </NavLink>

            <NavLink to="/myorders" className={navLinkClass}>
              <FaClipboardList className="text-sm opacity-70" />
              <span>طلباتي</span>
            </NavLink>

            <NavLink to="/faq" className={navLinkClass}>
              <FaQuestionCircle className="text-sm opacity-70" />
              <span>الأسئلة الشائعة</span>
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              <FaEnvelope className="text-sm opacity-70" />
              <span>تواصل معنا</span>
            </NavLink>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border border-slate-200/80 bg-white hover:border-orange-300 hover:shadow-sm transition"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
                    {user?.name?.charAt(0) || "م"}
                  </div>
                  <span className="text-sm font-bold text-slate-700 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs text-slate-600 font-semibold">مرحباً بك</p>
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <FaUserCircle className="text-base text-slate-600" />
                        <span>الملف الشخصي</span>
                      </Link>

                      <Link
                        to="/myorders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        <FaClipboardList className="text-base text-slate-600" />
                        <span>متابعة طلباتي</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full text-right px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition"
                        >
                          <FaSignOutAlt className="text-base" />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold text-slate-700 hover:text-orange-600 hover:bg-slate-100 transition"
              >
                <FaSignInAlt className="text-base" />
                <span>دخول / تسجيل</span>
              </Link>
            )}

            {/* Request Service Primary CTA */}
            <Link
              to="/form"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FaPlus className="text-xs" />
              <span>اطلب خدمة الآن</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/form"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-orange-600 shadow-sm"
            >
              اطلب صيانة
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2"
          >
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <span>الرئيسية</span>
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <span>الخدمات والفنيين</span>
            </NavLink>

            <NavLink
              to="/myorders"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <span>طلباتي</span>
            </NavLink>

            <NavLink
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <span>الأسئلة الشائعة</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              <span>تواصل معنا</span>
            </NavLink>

            <div className="pt-3 border-t border-slate-200">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-800 font-bold hover:bg-slate-50"
                  >
                    <FaUserCircle className="text-orange-600" />
                    <span>الملف الشخصي ({user?.name})</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-right px-4 py-2.5 rounded-xl text-rose-600 font-bold hover:bg-rose-50"
                  >
                    <FaSignOutAlt />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800"
                >
                  <FaSignInAlt />
                  <span>تسجيل الدخول / إنشاء حساب</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
