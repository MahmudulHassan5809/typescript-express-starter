import { Request, Response } from "express";
import { AdminUserController } from "./controllers/admin";
import { Router } from "express";
import { authMiddleware, isAdminMiddleware } from "../../core/middlewares";
import container from "../../core/di";
import { TYPES } from "../../core/di/type";

const adminUserController = container.get<AdminUserController>(TYPES.AdminUserController);
const usersRouter = Router();

usersRouter.use(authMiddleware, isAdminMiddleware);

usersRouter.get("/", async (req: Request, res: Response) => adminUserController.getAllUsers(req, res));

export { usersRouter };
