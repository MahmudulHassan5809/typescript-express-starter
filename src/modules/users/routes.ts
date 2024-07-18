import { container } from "tsyringe";
import { Request, Response } from "express";
import { UserController } from "./controllers/public";
import { Router } from "express";

const userController = container.resolve(UserController);
const usersRouter = Router();

usersRouter.get("/", async (req: Request, res: Response) => userController.getAllUsers(req, res));

export { usersRouter };
