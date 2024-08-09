import { Request, Response } from "express";
import { AdminUserController } from "./controllers/admin";
import { Router } from "express";
import { authMiddleware, isAdminMiddleware } from "../../core/middlewares";
import { TYPES } from "../../core/di/type";
import { Container } from "inversify";

export const createUsersRouter = (container: Container): Router => {
    const usersRouter = Router();
    const adminUserController = container.get<AdminUserController>(TYPES.AdminUserController);

    usersRouter.use(authMiddleware, isAdminMiddleware);

    usersRouter.get("/", async (req: Request, res: Response) => {
        await adminUserController.getAllUsers(req, res);
    });

    return usersRouter;
};
