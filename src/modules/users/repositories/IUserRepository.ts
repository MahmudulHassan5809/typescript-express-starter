import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { User } from "../models";

export interface IUserRepository {
    findAll: (query: IAPIListingQuery) => Promise<PaginateResponse<User>>;
    findByEmail(email: string): Promise<User | null>;
    createUser(data: Partial<User>): Promise<User>;
}
