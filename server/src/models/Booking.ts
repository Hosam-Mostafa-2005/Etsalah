import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  serviceCategory: string;
  technician?: mongoose.Types.ObjectId;
  technicianNumericId?: number;
  scheduledDate?: string;
  timeSlot: string;
  details: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  estimatedPrice: number;
  notes?: string;
  ratingSubmitted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
      required: [true, "اسم العميل مطلوب"],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, "رقم الهاتف مطلوب"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "المحافظة/المدينة مطلوبة"],
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    serviceCategory: {
      type: String,
      required: [true, "فئة الخدمة مطلوبة"],
      trim: true,
    },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
    },
    technicianNumericId: {
      type: Number,
    },
    scheduledDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    timeSlot: {
      type: String,
      default: "afternoon",
    },
    details: {
      type: String,
      required: [true, "تفاصيل الطلب أو المشكلة مطلوبة"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    estimatedPrice: {
      type: Number,
      default: 150,
    },
    notes: {
      type: String,
      default: "",
    },
    ratingSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ETS-${Date.now().toString().slice(-4)}${random}`;
  }
  next();
});

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
