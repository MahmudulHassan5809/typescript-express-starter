import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../users/repositories/IUserRepository";
import { UserRegister } from "./interface";

@injectable()
export class AuthService {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    async register(data: UserRegister) {
        const { firstName, lastName, email, password } = data;
        const isEmailExists = await this.userRepository.findByEmail(email);
        console.log(isEmailExists);
    }
}
