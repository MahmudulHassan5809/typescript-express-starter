import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { AuthService } from "../service";

@injectable()
export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = container.resolve("AuthService");
    }

    async register(req: Request, res: Response) {
        const user = req.body;
        await this.authService.register(user);
    }
}
