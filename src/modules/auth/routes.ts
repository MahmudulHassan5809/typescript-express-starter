import { Request, Response } from "express";
import { AuthController } from "./controllers/public";
import { Router } from "express";
import { validationMiddleware } from "../../core/middlewares/validation";
import { UserRegisterDto, UserLoginDto } from "./dtos";
import { TYPES } from "../../core/di/type";
import container from "../../core/di";

const authController = container.get<AuthController>(TYPES.AuthController);
const authRouter = Router();

authRouter.post("/register/", validationMiddleware(UserRegisterDto), async (req: Request, res: Response) =>
    authController.register(req, res),
);

authRouter.post("/login/", validationMiddleware(UserLoginDto), async (req: Request, res: Response) =>
    authController.login(req, res),
);

export { authRouter };
