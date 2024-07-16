import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mahmudul",
    password: "152155809",
    database: "typescript_express_starter",
    synchronize: false,
    logging: true,
    entities: ["src/**/models.ts"],
    migrations: ["src/migration/**/*.ts"],
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
