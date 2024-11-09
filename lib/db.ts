import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string

export const connectDb = async () => {
    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw new Error("MongoDB connection failed");
    }
}