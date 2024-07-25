import { AppDataSource } from "../db";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";
import { container } from "tsyringe";
import { UserRepository } from "../../modules/users/repositories/UserRepository";
import { User } from "../../modules/users/models";
import { UserService } from "../../modules/users/service";
import { AuthService } from "../../modules/auth/service";

// Register UserRepository
container.register<IUserRepository>("UserRepository", {
    useFactory: () => {
        const userRepository = AppDataSource.getRepository(User);
        return new UserRepository(userRepository);
    },
});

// Register UserService
container.registerSingleton("UserService", UserService);
// Register AuthService
container.registerSingleton("AuthService", AuthService);
