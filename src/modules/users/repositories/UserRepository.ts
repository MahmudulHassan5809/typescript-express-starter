import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../models";
import { injectable } from "tsyringe";
import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { BaseRepository } from "../../../core/repositories";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(private userRepo: Repository<User>) {
        super(userRepo);
    }

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<User>> {
        const [data, total] = await this.userRepo.findAndCount({
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

    async createUser(data: User): Promise<User> {
        return await this.userRepo.save(data);
    }
}
