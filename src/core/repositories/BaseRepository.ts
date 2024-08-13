// import { DBConnector } from "../../core/db";
// import { Repository, FindOneOptions, ObjectLiteral, EntityTarget } from "typeorm";

// export class BaseRepository<T extends ObjectLiteral> {
//     protected model: EntityTarget<T>;

//     constructor(dbConnector: DBConnector, model: EntityTarget<T>) {
//         this.model = model;
//     }

//     async get(options: FindOneOptions<T>): Promise<T | null> {
//         return (await this.repository.findOne(options)) || null;
//     }
// }

export class BaseRepository {}
