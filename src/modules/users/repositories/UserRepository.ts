import { DataSource, FindOneOptions, Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../models";
import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { TYPES } from "../../../core/di/type";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {
    private readonly _repository: Repository<User>;

    constructor(@inject(TYPES.TypeORMDataSource) dataSource: DataSource) {
        this._repository = dataSource.getRepository(User);
    }

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<User>> {
        const [data, total] = await this._repository.findAndCount({
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
        return (await this._repository.findOne(options)) || null;
    }

    async createUser(data: User): Promise<User> {
        return await this._repository.save(data);
    }
}
