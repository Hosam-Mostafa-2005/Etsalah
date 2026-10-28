import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import technicianRoutes from "./routes/technician.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"] : "*",
    credentials: true,
  })
);
app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "EtSalah Backend API",
    time: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[EtSalah Server] Running on http://localhost:${PORT}`);
});

export default app;
