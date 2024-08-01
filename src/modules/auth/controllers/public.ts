import { Request, Response } from "express";
import { AuthService } from "../service";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/di/type";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

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
