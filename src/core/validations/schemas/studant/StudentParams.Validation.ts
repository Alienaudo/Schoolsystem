import Joi from "joi";
import { Param } from "../../../interfaces/Param.js";
import { ptBrErros } from "../../../services/Translations.service.js";

const nameValidate: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
const cpfValidate: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneValidate: RegExp = /^(?:\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;


export const paramsValidation: Joi.ObjectSchema<Param> = Joi.object({

    id:
        Joi.string()
            .optional()
            .uuid()
            .messages(ptBrErros),

    cpf:
        Joi.string()
            .optional()
            .pattern(cpfValidate)
            .length(14)
            .messages(ptBrErros),

    phone:
        Joi.string()
            .optional()
            .pattern(phoneValidate)
            .length(15)
            .messages(ptBrErros),

    name:
        Joi.string()
            .optional()
            .min(3)
            .max(150)
            .pattern(nameValidate)
            .messages(ptBrErros),

    subjactId:
        Joi.number()
            .optional()
            .integer()
            .positive()
            .greater(0)
            .messages(ptBrErros)

}).optional();
