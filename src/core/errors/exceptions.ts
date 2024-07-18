import { HttpStatusCodes } from "../enum";
import { BaseException } from "./error";

export class NotFoundException extends BaseException {
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
    constructor(message: string) {
        super(HttpStatusCodes.BadRequest, message);
    }
}
