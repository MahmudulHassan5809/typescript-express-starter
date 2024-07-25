import { HttpStatusCodes } from "../enum";
import { BaseException } from "./error";

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super(HttpStatusCodes.BadRequest, message);
    }
}

export class DatabaseException extends BaseException {
    constructor(message: string) {
        super(HttpStatusCodes.InternalServerError, message);
    }
}

export class ValidationException extends BaseException {
    public errors: Array<{ field: string; messages: string[] }>;

    constructor(errors: Array<{ field: string; messages: string[] }>) {
        super(HttpStatusCodes.BadRequest, "Validation failed");
        this.errors = errors;
    }
}
