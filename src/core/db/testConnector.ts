import { DataSource } from "typeorm";

export const testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["src/**/models.ts"], // Add all your entities here
    synchronize: true,
    logging: false,
});
