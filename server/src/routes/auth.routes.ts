import { Router, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || "etsalah_jwt_secret_production_ready_key_2026";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId }, secret, { expiresIn: expiresIn as any });
};

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, phone, city, address, dateOfBirth, gender } = req.body;

    if (!name || !email || !password || !phone) {
      res.status(400).json({
        success: false,
        message: "يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد، كلمة المرور، الهاتف)",
      });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول أو استخدام بريد آخر",
      });
      return;
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      city: city || "القاهرة",
      address: address || "",
      dateOfBirth: dateOfBirth || "",
      gender: gender || "male",
      role: "customer",
    });

    await user.save();

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      message: "تم إنشاء الحساب بنجاح! أهلاً بك في اتصلح",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "بيانات تسجيل الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "بيانات تسجيل الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور",
      });
      return;
    }

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      message: `أهلاً بك مجدداً يا ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "غير مصرح" });
      return;
    }

    const bookingCount = await Booking.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        city: req.user.city,
        address: req.user.address,
        dateOfBirth: req.user.dateOfBirth,
        gender: req.user.gender,
        role: req.user.role,
        avatar: req.user.avatar,
        bookingCount,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/auth/profile
router.put("/profile", requireAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "غير مصرح" });
      return;
    }

    const { name, phone, city, address, dateOfBirth, gender } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ success: false, message: "المستخدم غير موجود" });
      return;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (address !== undefined) user.address = address;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (gender) user.gender = gender;

    await user.save();

    res.json({
      success: true,
      message: "تم تحديث الملف الشخصي بنجاح",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "تم تسجيل الخروج بنجاح",
  });
});

export default router;
