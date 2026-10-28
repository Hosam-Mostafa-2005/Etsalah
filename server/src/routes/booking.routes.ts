import { Router, Response } from "express";
import mongoose from "mongoose";
import { Booking } from "../models/Booking.js";
import { Technician } from "../models/Technician.js";
import { requireAuth, optionalAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

// POST /api/bookings - Create new service booking
router.post("/", optionalAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    const {
      customerName,
      customerPhone,
      city,
      address,
      serviceCategory,
      workerId, // might be numeric ID or mongo ID
      scheduledDate,
      timeSlot,
      details,
      notes,
    } = req.body;

    // Use logged in user details if not provided in body
    const name = customerName || req.user?.name;
    const phone = customerPhone || req.user?.phone;
    const userCity = city || req.user?.city || "القاهرة";
    const userAddress = address || req.user?.address || "";

    if (!name || !phone || !serviceCategory || !details) {
      res.status(400).json({
        success: false,
        message: "يرجى تعبئة الحقول الأساسية: الاسم، الهاتف، نوع الخدمة، وتفاصيل الطلب",
      });
      return;
    }

    let technicianDoc = null;
    let technicianNumericId: number | undefined;

    if (workerId) {
      if (!isNaN(Number(workerId))) {
        technicianDoc = await Technician.findOne({ numericId: Number(workerId) });
        technicianNumericId = Number(workerId);
      } else if (mongoose.Types.ObjectId.isValid(workerId)) {
        technicianDoc = await Technician.findById(workerId);
        if (technicianDoc) {
          technicianNumericId = technicianDoc.numericId;
        }
      }
    }

    const estimatedPrice = technicianDoc?.hourlyRate || 150;

    const booking = new Booking({
      user: req.user?._id,
      customerName: name,
      customerPhone: phone,
      city: userCity,
      address: userAddress,
      serviceCategory,
      technician: technicianDoc?._id,
      technicianNumericId,
      scheduledDate: scheduledDate || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || "afternoon",
      details,
      notes: notes || "",
      estimatedPrice,
      status: "pending",
    });

    await booking.save();

    // Populate technician details
    await booking.populate("technician", "name specialty phone image rating numericId");

    res.status(201).json({
      success: true,
      message: "تم إرسال طلب الصيانة بنجاح! سيتم التواصل معك لتأكيد الموعد.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/bookings/my - Get user's bookings
router.get("/my", optionalAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    const { phone } = req.query;

    let query: any = {};

    if (req.user) {
      query.$or = [{ user: req.user._id }];
      if (req.user.phone) {
        query.$or.push({ customerPhone: req.user.phone });
      }
    } else if (phone) {
      query.customerPhone = String(phone).trim();
    } else {
      res.status(401).json({
        success: false,
        message: "يرجى تسجيل الدخول أو إدخال رقم الهاتف لعرض الطلبات",
      });
      return;
    }

    const bookings = await Booking.find(query)
      .populate("technician", "name specialty phone image rating numericId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/bookings/:id - Get single booking
router.get("/:id", optionalAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    let booking;
    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findById(id).populate(
        "technician",
        "name specialty phone image rating numericId"
      );
    } else {
      booking = await Booking.findOne({ orderNumber: id }).populate(
        "technician",
        "name specialty phone image rating numericId"
      );
    }

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "طلب الصيانة غير موجود",
      });
      return;
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/bookings/:id/cancel - Cancel booking
router.patch("/:id/cancel", optionalAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: "طلب الصيانة غير موجود",
      });
      return;
    }

    // Security check: if user is logged in, ensure booking belongs to user
    if (req.user && booking.user && booking.user.toString() !== req.user._id.toString()) {
      res.status(403).json({
        success: false,
        message: "لا يمكنك إلغاء طلب لا يخصك",
      });
      return;
    }

    if (booking.status === "completed") {
      res.status(400).json({
        success: false,
        message: "لا يمكن إلغاء طلب تم إنجازه واكتماله بالفعل",
      });
      return;
    }

    if (booking.status === "cancelled") {
      res.status(400).json({
        success: false,
        message: "هذا الطلب ملغي بالفعل",
      });
      return;
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "تم إلغاء طلب الصيانة بنجاح",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/bookings/:id/status - Status transitions (pending -> confirmed -> in_progress -> completed)
router.patch("/:id/status", async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: "حالة الطلب غير صالحة",
      });
      return;
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("technician", "name specialty phone image rating numericId");

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "الطلب غير موجود",
      });
      return;
    }

    res.json({
      success: true,
      message: `تم تحديث حالة الطلب إلى: ${status}`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
