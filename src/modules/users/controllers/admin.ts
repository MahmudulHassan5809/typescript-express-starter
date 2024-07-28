import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { UserService } from "../service";
import { extractQueryParams } from "../../../core/helpers/utils";
import { Cache } from "../../../core/cache";

@injectable()
export class AdminUserController {
    private userService: UserService;

    constructor() {
        this.userService = container.resolve("UserService");
    }

    @Cache.Cacheable("getAllUsers", 3600)
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const query = extractQueryParams(req);
        const response = await this.userService.findAll(query);
        return res.json(response);
    }
}
