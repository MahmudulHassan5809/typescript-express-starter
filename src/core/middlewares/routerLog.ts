import { logger } from "../logger";
import formatHTTPLoggerResponse from "../helpers/formatHttpLog";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCodes } from "../enum";

const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
    const requestStartTime = Date.now();
    const originalSend = res.send;
    let responseSent = false;

    res.send = function (body: unknown): Response {
        if (!responseSent) {
            if (res.statusCode < 400) {
                logger.info(
                    HttpStatusCodes[res.statusCode],
                    formatHTTPLoggerResponse(req, res, body, requestStartTime),
                );
            } else {
                if (typeof body === "string") {
                    logger.error(body, formatHTTPLoggerResponse(req, res, body, requestStartTime));
                } else if (typeof body === "object" && body !== null && "message" in body) {
                    logger.error(
                        (body as { message: string }).message,
                        formatHTTPLoggerResponse(req, res, body, requestStartTime),
                    );
                } else {
                    logger.error("An error occurred", formatHTTPLoggerResponse(req, res, body, requestStartTime));
                }
            }

            responseSent = true;
        }
        return originalSend.call(this, body);
    };
    next();
};

export { responseInterceptor };
