import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  key: string;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  image: string;
  active: boolean;
  order: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
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

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
