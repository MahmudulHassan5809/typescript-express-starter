import { FindOneOptions } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../models";
import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { DBConnector } from "../../../core/db";
import { TYPES } from "../../../core/di/type";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject(TYPES.DBConnector) private readonly dbConnector: DBConnector) {}

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<User>> {
        const repo = await this.dbConnector.getRepository(User);
        const [data, total] = await repo.findAndCount({
            skip: (query.page - 1) * query.limit,
            take: query.limit,
            order: {
                [query.sort]: query.order,
            },
        });

        const paginateResponse: PaginateResponse<User> = {
            data: data,
            meta_info: {
                total: total,
                limit: query.limit,
                currentPage: query.page,
            },
        };

        return paginateResponse;
    }

    async get(options: FindOneOptions<User>): Promise<User | null> {
        const repo = await this.dbConnector.getRepository(User);
        return (await repo.findOne(options)) || null;
    }

    async createUser(data: User): Promise<User> {
        const repo = await this.dbConnector.getRepository(User);
        return await repo.save(data);
    }
}
