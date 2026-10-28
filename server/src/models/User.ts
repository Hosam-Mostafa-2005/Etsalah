import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  address: string;
  dateOfBirth?: string;
  gender?: string;
  role: "customer" | "technician" | "admin";
  avatar?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "يرجى إدخال الاسم"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "يرجى إدخال البريد الإلكتروني"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "يرجى إدخال كلمة المرور"],
      minlength: [6, "كلمة المرور يجب أن لا تقل عن 6 أحرف"],
    },
    phone: {
      type: String,
      required: [true, "يرجى إدخال رقم الهاتف"],
      trim: true,
    },
    city: {
      type: String,
      default: "القاهرة",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    role: {
      type: String,
      enum: ["customer", "technician", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
