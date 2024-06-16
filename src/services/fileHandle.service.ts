import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import logger from '../logger/logger';

class FileHandleService {
    private getDestination(folderName: string): string {
        const destination = path.join('uploads', folderName);
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        return destination;
    }

    private async saveFile(file: UploadedFile, destination: string): Promise<{ fileName: string; filePath: string; }> {
        const { name, data } = file;
        const ext = path.extname(name);
        const fileName = `${Date.now()}${ext}`;
        const filePath = path.resolve(destination, fileName);

        // Write file to destination
        await fs.promises.writeFile(filePath, data);

        return { fileName, filePath };
    }

    async uploadSingleFile(req: Request, fieldName: string, folderName: string): Promise<{ fileName: string; filePath: string; }> {
        const destination = this.getDestination(folderName);

        if (req.files && req.files[fieldName]) {
            const file = req.files[fieldName] as UploadedFile;
            return this.saveFile(file, destination);
        }
        
        throw new Error('No files were uploaded.');
    }

    async uploadMultiFiles(req: Request, fieldName: string, folderName: string): Promise<{ fileName: string; filePath: string; }[]> {
        const destination = this.getDestination(folderName);
        const files: { fileName: string; filePath: string; }[] = [];

        if (req.files && req.files[fieldName]) {
            const uploadedFiles = Array.isArray(req.files[fieldName]) ? req.files[fieldName] : [req.files[fieldName]];

            for (const file of uploadedFiles) {
                const savedFile = await this.saveFile(file, destination);
                files.push(savedFile);
            }

            return files;
        }
        
        throw new Error('No files were uploaded.');
    }

    async removeFile(folderName: string, fileNames: string | string[]): Promise<void> {
        const destination = this.getDestination(folderName);
        const fileList = Array.isArray(fileNames) ? fileNames : [fileNames];

        for (const fileName of fileList) {
            const filePath = path.resolve(destination, fileName);

            try {
                await fs.promises.unlink(filePath);
                logger.info(`File ${fileName} removed successfully.`);
            } catch (error) {
                logger.error(`Error removing file ${fileName}: ${(error as Error).message}`);
            }
        }
    }
}

export default new FileHandleService();
