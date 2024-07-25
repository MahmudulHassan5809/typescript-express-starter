import { HttpStatusCodes } from "../enum";
import { Request, Response, NextFunction } from "express";

interface JsonResponse {
    message: string;
    data: object | string | null;
    errors: [] | null;
}

export function responseRendererMiddleware(req: Request, res: Response, next: NextFunction): void {
    const originJson = res.json;
    res.json = (jsonData: JsonResponse) => {
        const { statusCode } = res;
        const success = statusCode >= 200 && statusCode < 400;

        const message: string = jsonData?.message || HttpStatusCodes[res.statusCode];
        const fixedResponse = {
            success,
            message,
            data: success ? jsonData : null,
            code: res.statusCode,
            errors: jsonData.errors,
        };

        return originJson.call(res, fixedResponse);
    };
    next();
}
