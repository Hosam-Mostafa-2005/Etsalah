import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[Error Handler] ${req.method} ${req.url}:`, err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "الحقل";
    res.status(400).json({
      success: false,
      message: `قيمة ${field} مستخدمة بالفعل، يرجى اختيار قيمة أخرى`,
    });
    return;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({
      success: false,
      message: messages[0] || "بيانات غير صالحة",
      errors: messages,
    });
    return;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      success: false,
      message: "رمز التحقق غير صالح",
    });
    return;
  }

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    success: false,
    message: err.message || "حدث خطأ غير متوقع في الخادم",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
