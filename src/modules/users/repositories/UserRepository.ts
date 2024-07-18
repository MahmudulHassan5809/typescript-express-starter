import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../models";
import { injectable } from "tsyringe";
import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(private repository: Repository<User>) {}

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<User>> {
        const [data, total] = await this.repository.findAndCount({
            skip: (query.page - 1) * NaN,
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
}
