import * as dotenv from "dotenv";
import { stringToInteger } from "../utils/stringFunctions";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

const getEnv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined || value === null) {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
};

const DB_URI = `${getEnv("DB_CONNECTION")}://${getEnv("DB_HOST")}:${getEnv("DB_PORT")}/${getEnv("DB_DATABASE")}`;

type Env = "dev" | "prod";

interface DBConfig {
    url: string;
}

interface AppConfig {
    name: string;
    host: string;
    port: number;
    env: Env;
}

interface JWTConfig {
    key: string;
    options: SignOptions;
}

interface MailAuthConfig {
    user: string;
    pass: string;
}

interface MailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: MailAuthConfig
    from: string;
}

interface HashingConfig {
    hashing_key : string;
}

export const dbConfig: DBConfig = {
    url: DB_URI,
};

export const appConfig: AppConfig = {
    name: getEnv("APP_NAME"),
    host: getEnv("APP_HOST"),
    port: stringToInteger(getEnv("APP_PORT")),
    env: getEnv("APP_ENV") as Env,
};

export const jwtConfig: JWTConfig = {
    key: getEnv("JWT_SECRET_KEY"),
    options: { expiresIn: getEnv("JWT_EXPIRES_IN") }
};

export const mailConfig: MailConfig = {
    host: getEnv("MAIL_HOST"),
    port: stringToInteger(getEnv("MAIL_PORT")),
    secure: false,
    auth: {
        user: getEnv("MAIL_USERNAME"),
        pass: getEnv("MAIL_PASSWORD"),
    },
    from: getEnv("MAIL_FROM_ADDRESS"),
};

export const hashingConfig: HashingConfig = {
    hashing_key: getEnv("HASHING_KEY")
}