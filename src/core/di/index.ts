import { Container } from "inversify";
import { TYPES } from "./type";
import { DBConnector } from "../db";

/* Auth Import */
import { AuthService } from "../../modules/auth/service";
import { AuthController } from "../../modules/auth/controllers/public";

/* User Import */
import { UserService } from "../../modules/users/service";
import { AdminUserController } from "../../modules/users/controllers/admin";
import { UserRepository } from "../../modules/users/repositories/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

const container = new Container();

container.bind<DBConnector>(TYPES.DBConnector).to(DBConnector);

/* Auth Module Bind */
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

/* User Module Bind */
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AdminUserController>(TYPES.AdminUserController).to(AdminUserController);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export default container;
