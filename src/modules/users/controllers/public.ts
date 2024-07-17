import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../service";
import { extractQueryParams } from "../../../core/helpers/utils";

@injectable()
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = container.resolve("UserService");
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const query = extractQueryParams(req);
        const response = await this.userService.findAll(query);
        return res.json(response);
    }
}
