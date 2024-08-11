import { Request, Response, NextFunction } from "express";
import logger from "../config/logger/logger";
import CustomError from "../utils/customError";
import { ErrorResponse } from "../utils/genericResponse";
import { MongoServerError } from "mongodb";
import { appConfig } from "../config/config";

const isDev = process.env.APP_ENV === 'dev';

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
            message: "OPERATIONAL ERROR",
            errors: { general: error.message }
        };
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        return {
            statusCode: 409,
            message: "VALIDATION ERROR",
            errors: formatDuplicateKeyError(error)
        };
    }

    return {
        statusCode: 500,
        message: "FATAL ERROR",
        errors: isDev ? { general: error.message } : { general: "Something went wrong" }
    };
};

// Main error handler function
const errorHandler = (error: Error | any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);

    const { statusCode, message, errors } = classifyError(error);

    // Check the environment and adjust the response accordingly
    if (appConfig.env === 'dev') {
        console.log("hello");
        
        res.status(statusCode).json(ErrorResponse(message, errors));
    } else {
        res.status(statusCode).json(ErrorResponse("Something went wrong"));
    }
};

export default errorHandler;
