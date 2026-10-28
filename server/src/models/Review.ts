import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  technician: mongoose.Types.ObjectId;
  technicianNumericId?: number;
  user?: mongoose.Types.ObjectId;
  customerName: string;
  rating: number;
  comment: string;
  booking?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
      index: true,
    },
    technicianNumericId: {
      type: Number,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
      required: [true, "الاسم مطلوب"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "التقييم مطلوب"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "نص التقييم مطلوب"],
      trim: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
