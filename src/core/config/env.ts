const DEBUG = process.env.DEBUG || false;
if (DEBUG) {
    console.log("DEBUG ENABLED");
}

const PORT = process.env.PORT || 3000;

export const env = {
    PORT: PORT,
    DEBUG: DEBUG,
    REDIS_URL: process.env.REDIS_URL,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    STAGE: process.env.ENV,
};
