import Joi from "joi";
import { Param } from "../../../interfaces/Param.js";
import { ptBrErros } from "../../../services/Translations.service.js";

export const paramsValidation: Joi.ObjectSchema<Param> = Joi.object({
    
    id:
        Joi.string()
            .optional()
            .uuid()
            .messages(ptBrErros),
    
    cpf:
        Joi.string()
            .optional()
            .pattern(/([0-9]{3}\.)([0-9]{3}\.)([0-9]{3})(\-[0-9]{2})$/)
            .min(14)
            .max(14)
            .messages(ptBrErros),

    phone:
        Joi.string()
        .optional()
        .pattern(/^\(\d{2}\)\s(9\d{4})-(\d{4})$/)
        .min(15)
        .max(15)
        .messages(ptBrErros),

    name:
        Joi.string()
            .optional()
            .min(3)
            .max(150)
            .messages(ptBrErros),

    subjactId:
        Joi.number()
            .optional()
            .integer()
            .positive()
            .greater(0)
            .messages(ptBrErros)

}).optional();
