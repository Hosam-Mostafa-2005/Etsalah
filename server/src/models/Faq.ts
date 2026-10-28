import mongoose, { Document, Schema } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "general",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Faq = mongoose.model<IFaq>("Faq", FaqSchema);
