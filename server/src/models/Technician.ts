import mongoose, { Document, Schema } from "mongoose";

export interface ITechnician extends Document {
  numericId: number;
  name: string;
  specialty: string;
  category: "ac" | "carpenter" | "plumber" | "glass" | "electrician" | string;
  phone: string;
  city: string;
  rating: number;
  reviewsCount: number;
  image: string;
  hourlyRate: number;
  experienceYears: number;
  bio: string;
  available: boolean;
  verified: boolean;
  skills: string[];
  userRef?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TechnicianSchema = new Schema<ITechnician>(
  {
    numericId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "اسم الفني مطلوب"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "التخصص مطلوب"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "فئة الخدمة مطلوبة"],
      enum: ["ac", "carpenter", "plumber", "glass", "electrician"],
      index: true,
    },
    phone: {
      type: String,
      required: [true, "رقم هاتف الفني مطلوب"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "المدينة مطلوبة"],
      index: true,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "/images/try.png",
    },
    hourlyRate: {
      type: Number,
      default: 150,
    },
    experienceYears: {
      type: Number,
      default: 5,
    },
    bio: {
      type: String,
      default: "فني محترف ومعتمد يقدم أفضل جودة صيانة وضمان على الأعمال.",
    },
    available: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

TechnicianSchema.index({ name: "text", specialty: "text", city: "text" });

export const Technician = mongoose.model<ITechnician>("Technician", TechnicianSchema);
