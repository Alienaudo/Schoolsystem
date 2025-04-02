import { RequestHandler } from "express";
import { ObjectSchema, ValidationError } from 'joi';

type TProperts = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperts, ObjectSchema<any>>;

type TVAlidation = (schemas: Partial<TAllSchemas>) => RequestHandler

/**
 * Middleware de validação.
 * @param schemas Recebe os esquemas de validação.
 * @returns 
 */
export const validation: TVAlidation = (schemas) => async (req, res, next) => {
    
    const errorsResult: Record<string, Record<string, string>> = {};

    for (const [key, schema] of Object.entries(schemas)) {

        try {
    
            await schema.validateAsync(req[key as TProperts], { 
                
                abortEarly: false
                
            });
            
        } catch (err: unknown) {
            
            const joiError = err as ValidationError;
            const errors: Record<string, string> = {};
            
            joiError.details.forEach((error) => {

                const path = error.path.join(".");
                errors[path] = error.message;
                
            });
            
            errorsResult[key] = errors;

        }
        
    };

    if (Object.entries(errorsResult).length > 0) {
        
        res.status(400).json({ errors: errorsResult });

    }
    
    return next();

};
