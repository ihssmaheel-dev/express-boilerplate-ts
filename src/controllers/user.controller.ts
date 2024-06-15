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

    createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info("creating new user...");
        const user = await this.userService.createUser(req.body);

        logger.info("user created successfully");
        res.status(200).json(GenericResponse.success("User created successfully"));
    });

    updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info(`updating user for id: ${req.params.id}...`);
        await this.userService.updateUser(req.params.id, req.body);

        logger.info("user updated successfully");
        res.status(200).json(GenericResponse.success("User updated successfully"));
    });

    deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info(`deleting the user for id: ${req.params.id}...`);
        await this.userService.deleteUser(req.params.id);

        logger.info("user deleted successfully...");
        res.status(200).json(GenericResponse.success("User deleted successfully"));
    })
}

export default UserController;