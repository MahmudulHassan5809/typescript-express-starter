import { User } from "../models";

export interface IUserRepository {
    findAll: () => Promise<User[]>;
}
