import { container } from "tsyringe";
import { Request, Response } from "express";
import { AdminUserController } from "./controllers/admin";
import { Router } from "express";
import { authMiddleware, isAdminMiddleware } from "../../core/middlewares";

const adminUserController = container.resolve(AdminUserController);
const usersRouter = Router();

usersRouter.use(authMiddleware, isAdminMiddleware);

usersRouter.get("/", async (req: Request, res: Response) => adminUserController.getAllUsers(req, res));

export { usersRouter };
