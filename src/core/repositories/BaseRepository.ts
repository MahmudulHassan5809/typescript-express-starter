import { Repository, FindOneOptions, ObjectLiteral } from "typeorm";

export class BaseRepository<T extends ObjectLiteral> {
    constructor(private repository: Repository<T>) {}

    async get(options: FindOneOptions<T>): Promise<T | null> {
        return (await this.repository.findOne(options)) || null;
    }
}
