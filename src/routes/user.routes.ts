import { Router } from "express";
import UserController from '../controllers/user.controller';

const router = Router();

const userController: UserController = new UserController();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

export default router