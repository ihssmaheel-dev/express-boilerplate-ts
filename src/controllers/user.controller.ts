import {  Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import logger from "../logger/logger";
import UserService from '../services/user.service';
import GenericResponse from "../utils/genericResponse";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info("fetching all users...");
        const users = await this.userService.getUsers();

        logger.info("users fetched successfully");
        res.status(200).json(GenericResponse.successWithData(users));
    });

    getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info(`fetching user for id: ${req.params.id}...`);
        const user = await this.userService.getUser(req.params.id);

        logger.info("user fetched successfully");
        res.status(200).json(GenericResponse.successWithData(user));
    });
}

export default UserController;