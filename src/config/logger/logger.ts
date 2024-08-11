import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import { appConfig } from '../config';

// Define the path to the logs directory
const logsDir: string = 'logs';

// Create the logs dir if it doesn't exist
fs.mkdirSync(logsDir, { recursive: true });

const transports: winston.transport[] = [];

const LogFileTransport: DailyRotateFile = new DailyRotateFile({
    dirname: logsDir,
    filename: `${appConfig.name}-%DATE%.log`,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

transports.push(LogFileTransport);

// If environment is 'dev', include Console Transport
if (appConfig.env === 'dev') {
    const consoleTransport = new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
        )
    });

    transports.push(consoleTransport);
}

const logger: winston.Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            let logOutput = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

            if(stack) logOutput += `\n${stack}`;
            
            return logOutput;
        })
    ),
    transports
});

export default logger;