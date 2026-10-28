import { Router } from "express";
import { Category } from "../models/Category.js";
import { Technician } from "../models/Technician.js";

const router = Router();

// GET /api/categories - List all categories with technician counts
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({ active: true }).sort({ order: 1 });

    // Aggregate technician counts per category
    const counts = await Technician.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const countMap: Record<string, number> = {};
    counts.forEach((item) => {
      countMap[item._id] = item.count;
    });

    const categoriesWithStats = categories.map((cat) => ({
      ...cat.toObject(),
      techniciansCount: countMap[cat.key] || 0,
    }));

    res.json({
      success: true,
      data: categoriesWithStats,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
