import { ContainerModule } from "inversify";
import { AuthController } from "../../../modules/auth/controllers/public";
import { TYPES } from "../type";
import { AdminUserController } from "../../../modules/users/controllers/admin";

export const controllerModule = new ContainerModule((bind) => {
    bind<AuthController>(TYPES.AuthController).to(AuthController);
    bind<AdminUserController>(TYPES.AdminUserController).to(AdminUserController);
});
