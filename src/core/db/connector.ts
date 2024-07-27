import { DataSource } from "typeorm";
import { env } from "../config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.db_host,
    port: Number(env.db_port!),
    username: env.db_username,
    password: env.db_password,
    database: env.db_name,
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
