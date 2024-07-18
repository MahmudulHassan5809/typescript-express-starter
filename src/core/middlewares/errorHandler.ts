import { BaseException } from "../errors/error";
import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (error: BaseException, _request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    response.status(status).send({
        message,
        status,
    });
};
