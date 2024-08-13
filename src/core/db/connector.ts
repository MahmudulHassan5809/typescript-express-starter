import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "../config";
console.log(ENV.DB_URL);
const options: DataSourceOptions = {
    type: "postgres",
    url: ENV.DB_URL,
    synchronize: false,
    logging: true,
    entities: ["src/**/models.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
};

export const AppDataSource = new DataSource(options);

// import { injectable } from "inversify";
// import { ENV } from "../config";
// import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, Repository } from "typeorm";

// @injectable()
// export class DBConnector {
//     public static myDataSource: DataSource;

//     private async getConnection(): Promise<DataSource> {
//         if (DBConnector.myDataSource?.isInitialized) {
//             console.log("Connection already Established");
//             return DBConnector.myDataSource;
//         }

//         try {
//             const options: DataSourceOptions = {
//                 type: "postgres",
//                 url: ENV.DB_URL,
//                 synchronize: false,
//                 logging: true,
//                 entities: ["src/**/models.ts"], // Ensure the path to your entities is correct
//                 migrations: ["src/migrations/**/*.ts"],
//                 subscribers: [],
//             };
//             DBConnector.myDataSource = await new DataSource(options).initialize();
//             console.log("Connection Established!");
//         } catch (error) {
//             console.log(`Connection Failed. Error: ${error}`);
//         }

//         return DBConnector.myDataSource;
//     }

//     public async getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
//         const connection = await this.getConnection();
//         return connection.getRepository(entity);
//     }
// }
