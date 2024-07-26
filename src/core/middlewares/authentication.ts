import { UnauthorizedException } from "../errors/exceptions";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
    email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new UnauthorizedException("No token provided");
    }

    try {
        const decoded = jwt.verify(token, "secret" as string) as JwtPayload;
        req.user = { id: decoded.userId, email: decoded.email };
        next();
    } catch (error) {
        throw new UnauthorizedException("Invalid token");
    }
};
