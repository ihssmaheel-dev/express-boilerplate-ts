import fs from 'fs';
import path from 'path';
import { FileArray, UploadedFile } from 'express-fileupload';
import logger from '../config/logger/logger';

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

    async uploadSingleFile(uploadedFile: UploadedFile, folderName: string): Promise<{ fileName: string; filePath: string; }> {
        const destination = this.getDestination(folderName);

        if (uploadedFile) {
            return this.saveFile(uploadedFile, destination);
        }
        
        throw new Error('No files were uploaded.');
    }

    async uploadMultipleFiles(uploadedFiles: UploadedFile, folderName: string): Promise<{ fileName: string; filePath: string; }[]> {
        const destination = this.getDestination(folderName);
        const storedFiles: { fileName: string; filePath: string; }[] = [];
    
        if (uploadedFiles) {
            const fileList = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];
    
            for (const file of fileList) {
                const savedFile = await this.saveFile(file, destination);
                storedFiles.push(savedFile);
            }
    
            return storedFiles;
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
