import { ContainerModule } from "inversify";
import { TYPES } from "../type";
import { AuthService } from "../../../modules/auth/service";
import { UserService } from "../../../modules/users/service";

export const serviceModule = new ContainerModule((bind) => {
    bind<AuthService>(TYPES.AuthService).to(AuthService);
    bind<UserService>(TYPES.UserService).to(UserService);
});
