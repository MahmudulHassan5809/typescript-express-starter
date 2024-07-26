import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { AuthService } from "../service";

@injectable()
export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = container.resolve("AuthService");
    }

    async register(req: Request, res: Response): Promise<Response> {
        const user = req.body;
        const response = await this.authService.register(user);
        return res.json(response);
    }

    async login(req: Request, res: Response): Promise<Response> {
        const data = req.body;
        const response = await this.authService.login(data);
        return res.json(response);
    }
}
