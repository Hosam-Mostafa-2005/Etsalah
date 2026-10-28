import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User.js";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "يجب تسجيل الدخول أولاً للوصول إلى هذه الميزة (Unauthorized)",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "etsalah_jwt_secret_production_ready_key_2026";
    const decoded = jwt.verify(token, secret) as { id: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "المستخدم غير موجود أو تم إلغاء الجلسة",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "جلسة العمل غير صالحة أو انتهت مدتها، يرجى تسجيل الدخول مجدداً",
      error: error.message,
    });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const secret = process.env.JWT_SECRET || "etsalah_jwt_secret_production_ready_key_2026";
      const decoded = jwt.verify(token, secret) as { id: string };
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore invalid token in optional auth
  }
  next();
};

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "ليس لديك الصلاحيات الكافية لتنفيذ هذا الإجراء",
      });
      return;
    }
    next();
  };
};
