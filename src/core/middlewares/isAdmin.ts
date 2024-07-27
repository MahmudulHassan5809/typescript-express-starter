import { Request, Response, NextFunction } from "express";
import { Cache } from "../cache";
import { ForbiddenException, UnauthorizedException } from "../errors/exceptions";
import { IUser } from "./../../modules/users/interfaces";

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        throw new UnauthorizedException("Invalid tokenYou are not authorized to access this resource.");
    }

    const userData: IUser | null = await Cache.get(`user_data_${req.user.id}`);
    if (!userData || !userData.is_staff) {
        throw new ForbiddenException("You are not authorized to access this resource.");
    }
    next();
}
