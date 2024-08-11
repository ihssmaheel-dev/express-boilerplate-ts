import mongoose, { mongo } from "mongoose";
import logger from "../logger/logger";
import { indexes } from "./indexing";

export const createIndexes = async (): Promise<void> => {
    try {
        logger.info("Creating indexes...");
        
        await indexes();

        logger.info("Indexes created successfully");
    } catch (error) {
        logger.error("Error creating indexes: ", error);
        console.error("Error creating indexes: ", error);
    }
}