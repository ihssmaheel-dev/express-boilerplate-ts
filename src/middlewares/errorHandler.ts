import { Request, Response, NextFunction } from "express";
import logger from "../config/logger/logger";
import CustomError from "../utils/customError";
import { ErrorResponse } from "../utils/genericResponse";
import { MongoServerError } from "mongodb";

// Function to format duplicate key errors from MongoDB
const formatDuplicateKeyError = (error: MongoServerError): { [key: string]: string } => {
    const duplicateKey = Object.keys(error.keyValue)[0];
    return { [duplicateKey]: `${duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)} already exists.` };
};

// Function to classify and format errors
const classifyError = (error: Error | any): { statusCode: number, message: string, errors: { [key: string]: string } } => {
    if (error instanceof CustomError) {
        return {
            statusCode: error.statusCode,
            message: "Operational Error",
            errors: { general: error.message }
        };
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        return {
            statusCode: 409, // Conflict for duplicate key errors
            message: "Validation Error",
            errors: formatDuplicateKeyError(error)
        };
    }

    return {
        statusCode: 500, // Internal Server Error for unexpected issues
        message: "Error",
        errors: { general: "Something went wrong" }
    };
};

// Main error handler function
const errorHandler = (error: Error | any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);

    const { statusCode, message, errors } = classifyError(error);

    res.status(statusCode).json(ErrorResponse(message, errors));
};

export default errorHandler;
