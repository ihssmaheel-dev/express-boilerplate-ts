import { Router } from "express";
import HashingController from '../controllers/hashing.controller';

const router = Router();

const hashingController: HashingController = new HashingController();

router.post("/encrypt", hashingController.encrypt);
router.post("/decrypt", hashingController.decrypt);

export default router