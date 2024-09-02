import mongoose from "mongoose";
import env from "./env";

export const connectDB = async () => {
  const mongoURI = env.dbName;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  await mongoose.connect(mongoURI);
};
