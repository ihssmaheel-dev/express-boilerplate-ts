import { Router } from "express";
import UserController from '../controllers/user.controller';

const router = Router();

const userController: UserController = new UserController();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/profile-picture/:id", userController.updateProfilePicture);

export default router