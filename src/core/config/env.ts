const DEBUG = process.env.DEBUG || false;
if (DEBUG) {
    console.log("DEBUG ENABLED");
}

const PORT = process.env.PORT || 3000;

export const ENV = {
    PORT: PORT,
    DEBUG: DEBUG,
    REDIS_URL: process.env.REDIS_URL,
    DB_URL: process.env.DB_URL,
    STAGE: process.env.ENV,
};
