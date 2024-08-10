import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import CustomError from "../utils/customError";
import GenericResponse, { ErrorResponse } from "../utils/genericResponse";

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);

    const message = error instanceof CustomError ? error.message : "Something went wrong";
    const statusCode = (error instanceof CustomError && error.statusCode) || 500;

    res.status(statusCode).json(ErrorResponse(message));
}

export default errorHandler;