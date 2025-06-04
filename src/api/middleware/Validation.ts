import { RequestHandler } from "express";
import { ObjectSchema, ValidationError, ValidationErrorItem } from 'joi';

type TProperts = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperts, ObjectSchema<any>>;

type TVAlidation = (schemas: Partial<TAllSchemas>) => RequestHandler

/**
 * Middleware de validação.
 * @param schemas Recebe os esquemas de validação.
 * @returns 
 */
export const validation: TVAlidation = (schemas: Partial<TAllSchemas>) => async (req, res, next): Promise<void> => {

    const entries = Object.entries(schemas);

    const validationPromises = entries.map(async ([key, schema]: [string, ObjectSchema<any>]) => {

        try {

            await schema.validateAsync(req[key as TProperts], {

                abortEarly: false

            });

            return { key, errors: null };

        } catch (err: unknown) {

            const joiError = err as ValidationError;
            const errors: Record<string, string> = {};

            joiError.details.forEach((error: ValidationErrorItem): void => {

                const path = error.path.join(".");
                errors[path] = error.message;

            });

            return { key, errors };

        }

    });

    const validationResults = await Promise.all(validationPromises);

    const errorsResult: Record<string, Record<string, string>> = {};

    validationResults.forEach(({ key, errors }): void => {

        if (errors) {

            errorsResult[key] = errors;

        }

    });

    if (Object.keys(errorsResult).length > 0) {

        res.status(400).json({ errors: errorsResult });

    }

    next();

};
