import { container } from "tsyringe";
import { Request, Response } from "express";
import { AuthController } from "./controllers/public";
import { Router } from "express";
import { validationMiddleware } from "../../core/middlewares/validation";
import { UserRegisterDto } from "./dtos";

const authController = container.resolve(AuthController);
const authRouter = Router();

authRouter.post("/register/", validationMiddleware(UserRegisterDto), async (req: Request, res: Response) =>
    authController.register(req, res),
);

export { authRouter };
