// src/modules/auth/routes.ts
import { Request, Response, Router } from "express";
import { validationMiddleware } from "../../core/middlewares/validation";
import { UserRegisterDto, UserLoginDto } from "./dtos";
import { TYPES } from "../../core/di/type";
import { Container } from "inversify";
import { AuthController } from "./controllers/public";

export const createAuthRouter = (container: Container): Router => {
    const authRouter = Router();
    const authController = container.get<AuthController>(TYPES.AuthController);

    authRouter.post("/register", validationMiddleware(UserRegisterDto), async (req: Request, res: Response) =>
        authController.register(req, res),
    );

    authRouter.post("/login", validationMiddleware(UserLoginDto), async (req: Request, res: Response) =>
        authController.login(req, res),
    );

    return authRouter;
};
