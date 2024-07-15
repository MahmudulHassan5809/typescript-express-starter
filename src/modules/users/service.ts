import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./repositories/IUserRepository";

@injectable()
export class UserService {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    async findAll() {
        return this.userRepository.findAll();
    }
}
