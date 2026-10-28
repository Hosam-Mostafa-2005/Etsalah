import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  text: string;
  rating: number;
  city?: string;
  role?: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    city: {
      type: String,
      default: "القاهرة",
    },
    role: {
      type: String,
      default: "عميل موثوق",
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
