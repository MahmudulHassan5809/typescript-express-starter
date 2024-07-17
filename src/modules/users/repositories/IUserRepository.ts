import { IAPIListingQuery, PaginateResponse } from "../../../core/interfaces/pagination";
import { User } from "../models";

export interface IUserRepository {
    findAll: (query: IAPIListingQuery) => Promise<PaginateResponse<User>>;
}
