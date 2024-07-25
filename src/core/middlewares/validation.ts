import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { ValidationException } from "../errors/exceptions";

interface ValidationSchema<T> {
    new (): T;
}

const validationPipe = async <T extends object>(
    schema: ValidationSchema<T>,
    requestObject: object,
): Promise<true | ValidationError[]> => {
    const transformedClass = plainToInstance(schema, requestObject);
    const errors: ValidationError[] = await validate(transformedClass);
    if (errors.length > 0) {
        return errors;
    }
    return true;
};

const formatErrors = (errors: ValidationError[]): Array<{ field: string; messages: string[] }> => {
    return errors.map((error) => ({
        field: error.property,
        messages: Object.values(error.constraints || {}),
    }));
};

export const validationMiddleware =
    <T extends object>(validationSchema: ValidationSchema<T>) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const result = await validationPipe(validationSchema, { ...req.body, ...req.params });

        if (Array.isArray(result) && result.length > 0) {
            const formattedErrors = formatErrors(result);
            next(new ValidationException(formattedErrors));
        } else {
            next();
        }
    };
