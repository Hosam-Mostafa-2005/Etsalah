import { Router } from "express";
import mongoose from "mongoose";
import { Technician } from "../models/Technician.js";
import { Review } from "../models/Review.js";

const router = Router();

// GET /api/technicians/top - Best rated technician per category
router.get("/top", async (req, res, next) => {
  try {
    const categories = ["ac", "carpenter", "plumber", "glass", "electrician"];
    const topWorkers = [];

    for (const cat of categories) {
      const best = await Technician.findOne({ category: cat })
        .sort({ rating: -1, reviewsCount: -1, numericId: 1 })
        .exec();
      if (best) {
        topWorkers.push(best);
      }
    }

    res.json({
      success: true,
      count: topWorkers.length,
      data: topWorkers,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/technicians - List and filter technicians
router.get("/", async (req, res, next) => {
  try {
    const { category, city, search, minRating, sort, limit = 50, page = 1 } = req.query;

    const query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (city && city !== "all") {
      query.city = { $regex: new RegExp(String(city), "i") };
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (search) {
      const searchRegex = new RegExp(String(search).trim(), "i");
      query.$or = [
        { name: searchRegex },
        { specialty: searchRegex },
        { city: searchRegex },
        { bio: searchRegex },
      ];
    }

    let sortOption: any = { rating: -1, numericId: 1 };
    if (sort === "rating_desc") sortOption = { rating: -1 };
    if (sort === "rating_asc") sortOption = { rating: 1 };
    if (sort === "reviews_desc") sortOption = { reviewsCount: -1 };
    if (sort === "rate_asc") sortOption = { hourlyRate: 1 };
    if (sort === "rate_desc") sortOption = { hourlyRate: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [technicians, total] = await Promise.all([
      Technician.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Technician.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: technicians.length,
      total,
      data: technicians,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/technicians/:id - Find by numeric ID or Mongo ObjectId
router.get("/:id", async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    let technician;

    if (!isNaN(Number(id))) {
      technician = await Technician.findOne({ numericId: Number(id) });
    } else if (mongoose.Types.ObjectId.isValid(id)) {
      technician = await Technician.findById(id);
    }

    if (!technician) {
      res.status(404).json({
        success: false,
        message: "عذراً، هذا الفني غير موجود أو تم إزالته",
      });
      return;
    }

    // Fetch recent reviews for this technician
    const reviews = await Review.find({
      $or: [
        { technician: technician._id },
        { technicianNumericId: technician.numericId },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        ...technician.toObject(),
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
