import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
// إضافة FaEnvelope
import {
  FaClipboardList,
  FaUserCircle,
  FaSignInAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useAuthStore } from "../store/store";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());

  const linkClasses =
    "flex items-center gap-2 text-gray-700 hover:text-orange-600 transition duration-300 font-semibold";
  const mobileLinkClasses =
    "flex items-center gap-2 w-full justify-center py-3 text-gray-800 hover:bg-gray-100 transition duration-200 font-medium";

  return (
    <nav className="fixed w-full top-0 left-0 bg-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-extrabold text-gray-800"
        >
          <MdOutlineMiscellaneousServices
            size={32}
            className="text-orange-600"
          />
          <span className="tracking-wide">أتصلّح</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg">
          <Link to="/" className={linkClasses}>
            <AiOutlineHome size={22} />
            <span className="hidden lg:inline">الرئيسية</span>
          </Link>

          <Link to="/services" className={linkClasses}>
            <MdOutlineMiscellaneousServices size={22} />
            <span className="hidden lg:inline">الخدمات</span>
          </Link>

          <Link to="/myorders" className={linkClasses}>
            <FaClipboardList size={22} />
            <span className="hidden lg:inline">طلباتي</span>
          </Link>

          <Link to="/profile" className={linkClasses}>
            <FaUserCircle size={22} />
            <span className="hidden lg:inline">حسابي</span>
          </Link>

          {/* ** إضافة رابط التواصل للكمبيوتر ** */}
          <Link to="/contact" className={linkClasses}>
            <FaEnvelope size={22} />
            <span className="hidden lg:inline">تواصل معانا</span>
          </Link>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-orange-600 rounded-full 
      hover:bg-gray-100 transition duration-300"
            >
              <FaSignInAlt size={22} />
              <span className="hidden lg:inline">تسجيل الدخول</span>
            </Link>
          ) : (
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-gray-800 rounded-full hover:bg-gray-100 transition duration-300"
            >
              <FaUserCircle size={22} className="text-orange-600" />
              <span className="hidden lg:inline font-semibold text-gray-700">
                {user?.name}
              </span>
            </Link>
          )}

          <Link
            to="/form"
            className="flex items-center gap-2 px-5 py-2 text-lg font-bold text-white bg-orange-600 rounded-full hover:bg-orange-700 transition duration-300 shadow-lg shadow-orange-500/50 transform hover:scale-105"
          >
            <IoIosAddCircle size={22} />
            <span className="hidden lg:inline">اطلب خدمة الآن</span>
          </Link>
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden text-gray-700 text-3xl">
          {menuOpen ? (
            <IoClose
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="flex flex-col items-center py-4 bg-white shadow-inner md:hidden">
          <Link
            onClick={() => setMenuOpen(false)}
            to="/"
            className={mobileLinkClasses}
          >
            <AiOutlineHome size={24} />
            <span>الرئيسية</span>
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/services"
            className={mobileLinkClasses}
          >
            <MdOutlineMiscellaneousServices size={24} />
            <span>الخدمات</span>
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/myorders"
            className={mobileLinkClasses}
          >
            <FaClipboardList size={24} />
            <span>طلباتي</span>
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/profile"
            className={mobileLinkClasses}
          >
            <FaUserCircle size={24} />
            <span>حسابي</span>
          </Link>

          {/* ** إضافة رابط التواصل للموبايل ** */}
          <Link
            onClick={() => setMenuOpen(false)}
            to="/contact"
            className={mobileLinkClasses}
          >
            <FaEnvelope size={24} />
            <span>تواصل معانا</span>
          </Link>

          {isLoggedIn ? (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/profile"
              className="flex items-center gap-2 mt-4 px-6 py-3 text-lg font-bold text-gray-800 w-11/12 justify-center rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <FaUserCircle size={24} className="text-orange-600" />
              <span>مرحباً، {user?.name}</span>
            </Link>
          ) : (
            <Link
              onClick={() => setMenuOpen(false)}
              to="/login"
              className="flex items-center gap-2 mt-4 px-6 py-3 text-lg font-bold text-gray-800 w-11/12 justify-center rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <FaSignInAlt size={24} />
              تسجيل الدخول
            </Link>
          )}

          {/* Mobile CTA Button */}
          <Link
            onClick={() => setMenuOpen(false)}
            to="/form"
            className="flex items-center gap-2 mt-4 px-6 py-3 text-lg font-bold text-white bg-orange-600 w-11/12 justify-center rounded-lg hover:bg-orange-700 transition duration-300"
          >
            <IoIosAddCircle size={24} />
            اطلب خدمة الآن
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
