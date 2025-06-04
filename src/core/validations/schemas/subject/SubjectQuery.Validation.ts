import { Query } from "../../../interfaces/Query.js";
import { ptBrErros } from "../../../services/Translations.service.js";
import Joi from "joi";

export const queryValidation: Joi.ObjectSchema<Query> = Joi.object({

    page:
        Joi.number()
            .optional()
            .integer()
            .greater(0)
            .messages(ptBrErros),

    limit:
        Joi.number()
            .optional()
            .integer()
            .greater(0)
            .messages(ptBrErros),

    filter:
        Joi.string()
            .optional()
            .max(25)
            .messages(ptBrErros)

}).optional();
