import { Router, Response } from "express";
import mongoose from "mongoose";
import { Review } from "../models/Review.js";
import { Technician } from "../models/Technician.js";
import { Booking } from "../models/Booking.js";
import { optionalAuth, AuthRequest } from "../middleware/auth.js";

const router = Router();

// POST /api/reviews - Add a review for a technician
router.post("/", optionalAuth, async (req: AuthRequest, res: Response, next) => {
  try {
    const { workerId, rating, comment, customerName, bookingId } = req.body;

    const name = customerName || req.user?.name;
    if (!name || !workerId || !rating || !comment) {
      res.status(400).json({
        success: false,
        message: "يرجى تقديم التقييم (من 1 إلى 5)، والتعليق، واسم العميل",
      });
      return;
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      res.status(400).json({
        success: false,
        message: "التقييم يجب أن يكون رقماً بين 1 و 5",
      });
      return;
    }

    let technician = null;
    if (!isNaN(Number(workerId))) {
      technician = await Technician.findOne({ numericId: Number(workerId) });
    } else if (mongoose.Types.ObjectId.isValid(workerId)) {
      technician = await Technician.findById(workerId);
    }

    if (!technician) {
      res.status(404).json({
        success: false,
        message: "الفني المطلوب تقييمه غير موجود",
      });
      return;
    }

    const review = new Review({
      technician: technician._id,
      technicianNumericId: technician.numericId,
      user: req.user?._id,
      customerName: name,
      rating: numRating,
      comment: comment.trim(),
      booking: bookingId && mongoose.Types.ObjectId.isValid(bookingId) ? bookingId : undefined,
    });

    await review.save();

    // Recalculate average rating for this technician
    const allReviews = await Review.find({ technician: technician._id });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalRating / allReviews.length).toFixed(1));

    technician.rating = avgRating;
    technician.reviewsCount = allReviews.length;
    await technician.save();

    if (bookingId && mongoose.Types.ObjectId.isValid(bookingId)) {
      await Booking.findByIdAndUpdate(bookingId, { ratingSubmitted: true });
    }

    res.status(201).json({
      success: true,
      message: "شكراً لك! تم إضافة تقييمك بنجاح",
      data: review,
      updatedTechnician: {
        id: technician.numericId,
        rating: technician.rating,
        reviewsCount: technician.reviewsCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/reviews/technician/:id
router.get("/technician/:id", async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    let query: any = {};
    if (!isNaN(Number(id))) {
      query.technicianNumericId = Number(id);
    } else if (mongoose.Types.ObjectId.isValid(id)) {
      query.technician = id;
    } else {
      res.status(400).json({ success: false, message: "معرف فني غير صالح" });
      return;
    }

    const reviews = await Review.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
