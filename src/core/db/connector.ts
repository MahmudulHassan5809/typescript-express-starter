import { DataSource } from "typeorm";
import { env } from "../config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: Number(env.DB_PORT!),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ["src/**/models.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        throw err;
    }
};
