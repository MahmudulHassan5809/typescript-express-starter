import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../service";

@injectable()
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = container.resolve("UserService");
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
