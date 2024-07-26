import { container } from "tsyringe";
import { Request, Response } from "express";
import { UserController } from "./controllers/public";
import { Router } from "express";
import { authMiddleware } from "../../core/middlewares/authentication";

const userController = container.resolve(UserController);
const usersRouter = Router();

usersRouter.get("/", authMiddleware, async (req: Request, res: Response) => userController.getAllUsers(req, res));

export { usersRouter };
