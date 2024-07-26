import { FindOneOptions } from "typeorm";
import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { User } from "../models";

export interface IUserRepository {
    findAll: (query: IAPIListingQuery) => Promise<PaginateResponse<User>>;
    get(options: FindOneOptions<User>): Promise<User | null>;
    createUser(data: Partial<User>): Promise<User>;
}
