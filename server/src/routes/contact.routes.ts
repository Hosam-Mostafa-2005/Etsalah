import { Router } from "express";
import { Contact } from "../models/Contact.js";

const router = Router();

// POST /api/contact - Submit contact inquiry
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: "يرجى تعبئة جميع الحقول المطلوبة (الاسم، البريد، الموضوع، الرسالة)",
      });
      return;
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      status: "unread",
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "تم استلام رسالتك بنجاح! سيقوم فريق خدمة العملاء بالتواصل معك قريباً.",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/contact - List contact messages (admin)
router.get("/", async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
