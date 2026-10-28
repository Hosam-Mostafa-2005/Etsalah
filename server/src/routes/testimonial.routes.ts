import { Router } from "express";
import { Testimonial } from "../models/Testimonial.js";

const router = Router();

// GET /api/testimonials - List testimonials for home page
router.get("/", async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ rating: -1 });
    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
