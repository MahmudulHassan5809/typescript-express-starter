import { Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";
import { User } from "../models";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {
    constructor(private repository: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }
}
