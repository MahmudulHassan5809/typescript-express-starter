import { Request, Response } from "express";
import { UserService } from "../service";
import { extractQueryParams } from "../../../core/helpers/utils";
import { Cache } from "../../../core/cache";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/di/type";

@injectable()
export class AdminUserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @Cache.Cacheable("getAllUsers", 3600)
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const query = extractQueryParams(req);
        const response = await this.userService.findAll(query);
        return res.json(response);
    }
}
