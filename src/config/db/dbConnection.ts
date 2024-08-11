import mongoose from "mongoose";
import { dbConfig } from "../config";
import { createIndexes } from "./createIndexes";

async function connectDB(): Promise<void> {
    try {
        console.log("Connecting to the database...");
        await mongoose.connect(dbConfig.url);
        await createIndexes();
        console.log("Database connected successfully.")
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;