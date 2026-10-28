import { Router } from "express";
import { Faq } from "../models/Faq.js";

const router = Router();

// GET /api/faq - List all FAQs
router.get("/", async (req, res, next) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
