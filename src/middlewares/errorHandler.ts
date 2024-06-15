import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import CustomError from "../utils/customError";
import { errorResponse } from "../utils/genericResponse";

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);

    const message = error instanceof CustomError ? error.message : "Something went wrong";
    const statusCode = (error instanceof CustomError && error.statusCode) || 500;

    res.status(statusCode).json(errorResponse(message));
}

export default errorHandler;