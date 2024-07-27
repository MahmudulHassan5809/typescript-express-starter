const DEBUG = process.env.DEBUG || false;
if (DEBUG) {
    console.log("DEBUG ENABLED");
}

const PORT = process.env.PORT || 3000;

export const env = {
    port: PORT,
    debug: DEBUG,
    redis_url: process.env.REDIS_URL,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
};
