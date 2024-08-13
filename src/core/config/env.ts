import { cliLogger } from "../logger";

const DEBUG = process.env.DEBUG || false;
if (DEBUG) {
    cliLogger.info("DEBUG ENABLED");
}

const PORT = process.env.PORT || 8080;

export const ENV = {
    PORT: PORT,
    DEBUG: DEBUG,
    REDIS_URL: process.env.REDIS_URL,
    DB_URL: process.env.DB_URL,
    STAGE: process.env.ENV,
};
