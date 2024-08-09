import { ContainerModule } from "inversify";
import { TYPES } from "../type";
import { UserRepository } from "../../../modules/users/repositories/UserRepository";
import { IUserRepository } from "../../../modules/users/repositories/IUserRepository";

export const repositoryModule = new ContainerModule((bind) => {
    bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
});
