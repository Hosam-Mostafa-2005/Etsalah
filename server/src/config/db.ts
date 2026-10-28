import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/etsalah";
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("[Database] Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
