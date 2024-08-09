import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUserRepository } from "../users/repositories/IUserRepository";
import { UserLogin, UserRegister } from "./interface";
import { BadRequestException } from "../../core/errors/exceptions";
import { User } from "../users/models";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../users/dtos";
import { Cache } from "../../core/cache";
// import { appQueue } from "../../workers/connection";
import { TYPES } from "../../core/di/type";
import { inject, injectable } from "inversify";

@injectable()
export class AuthService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

    async register(data: UserRegister): Promise<UserDTO> {
        const { firstName, lastName, email, password } = data;
        const isEmailExists = await this.userRepository.get({ where: { email } });
        if (isEmailExists) {
            throw new BadRequestException("Email is already in use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(firstName, lastName, email, hashedPassword);
        const savedUser = await this.userRepository.createUser(newUser);
        const dto = plainToInstance(UserDTO, savedUser);

        return dto;
    }

    private generateToken(user: User, type: "access" | "refresh"): string {
        const expiresIn = type === "access" ? "1h" : "7d";
        const secret = "secret";
        return jwt.sign({ userId: user.id, email: user.email }, secret, { expiresIn });
    }

    async login(data: UserLogin): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, password } = data;
        const user = await this.userRepository.get({ where: { email } });
        if (!user) {
            throw new BadRequestException("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException("Invalid email or password");
        }
        const accessToken = this.generateToken(user, "access");
        const refreshToken = this.generateToken(user, "refresh");

        Cache.set(`user_data_${user.id}`, user, 36000);
        // await appQueue.add("sendEmail", { email });
        return { accessToken, refreshToken };
    }
}
