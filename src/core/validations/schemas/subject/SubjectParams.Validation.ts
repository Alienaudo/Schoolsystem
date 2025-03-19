import Joi from "joi";
import { Param } from "../../../interfaces/Param.js";
import { ptBrErros } from "../../../services/Translations.service.js";

export const paramsValidation: Joi.ObjectSchema<Param> = Joi.object({
    
    id:
        Joi.number()
            .optional()
            .integer()
            .greater(0)
            .messages(ptBrErros),

    subject_name:
        Joi.string()
            .optional()
            .max(100),
    
    description:
        Joi.string()
            .optional()
            .max(300)

}).optional();
