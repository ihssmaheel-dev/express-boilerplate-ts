import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../logger/logger';
import AESGCM from '../services/hashing.service';
import GenericResponse from '../utils/genericResponse';

class HashingController {
    private hashingService: AESGCM;

    constructor() {
        this.hashingService = new AESGCM();
    }

    encrypt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info("encrypting the given data...");
        const encryptedData = await this.hashingService.encrypt(req.body.text);

        logger.info("data encrypted successfully");
        res.status(200).json(GenericResponse.successWithData(encryptedData));
    });

    decrypt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        logger.info("decrypting the given encrypted data...");
        const decryptedData = await this.hashingService.decrypt(req.body.text);

        logger.info("data decrypted successfully");
        res.status(200).json(GenericResponse.successWithData(decryptedData));
    });
}

export default HashingController;