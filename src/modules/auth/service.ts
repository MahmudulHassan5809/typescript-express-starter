import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { IUserRepository } from "../users/repositories/IUserRepository";
import { UserRegister } from "./interface";
import { BadRequestException } from "../../core/errors/exceptions";
import { User } from "../users/models";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../users/dtos";

@injectable()
export class AuthService {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    async register(data: UserRegister): Promise<UserDTO> {
        const { firstName, lastName, email, password } = data;
        const isEmailExists = await this.userRepository.findByEmail(email);

        if (isEmailExists) {
            throw new BadRequestException("Email is already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User(firstName, lastName, email, hashedPassword);

        const savedUser = await this.userRepository.createUser(newUser);
        const dto = plainToInstance(UserDTO, savedUser);
        return dto;
    }
}
