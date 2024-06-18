import { Request, Response, NextFunction } from "express";

const addFilesToBody = async (req: Request, res: Response, next: NextFunction) => {
    if(req.files) {
        Object.entries(req.files).forEach(([key, value]) => {
            req.body[key] = value;
        })
    }

    next();
}

export default addFilesToBody;