import { Router } from "express";
import { createUsersRouter } from "./modules/users/routes";
import { createAuthRouter } from "./modules/auth/routes";
import { Container } from "inversify";

export const createRouter = (container: Container): Router => {
    const router = Router();

    router.use("/users", createUsersRouter(container));
    router.use("/auth", createAuthRouter(container));

    return router;
};
