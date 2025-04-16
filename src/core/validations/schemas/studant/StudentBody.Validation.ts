import { Studant } from '../../../interfaces/Studant.js';
import { ptBrErros } from '../../../services/Translations.service.js';  
import Joi from 'joi';

const nameValidate: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
const cpfValidate: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneValidate: RegExp = /^(?:\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const bodyValidation: Joi.ObjectSchema<Studant> = Joi.object({
    
    name:
        Joi.string()
            .required()
            .min(3)
            .max(150)
            .pattern(nameValidate)
            .messages(ptBrErros),

    birthdate: 
        Joi.date()
            .required()
            .messages(ptBrErros),

    gender: 
        Joi.string()
            .required()
            .length(1)
            .uppercase()
            .valid('M', 'F')
            .messages(ptBrErros),
    
    cpf:
        Joi.string()
            .required()
            .length(14)
            .pattern(cpfValidate)
            .messages(ptBrErros),
    
    phone:
        Joi.string()
            .optional()
            .length(15)
            .pattern(phoneValidate)
            .messages(ptBrErros),
    
    email:
        Joi.string()
            .required()
            .email()
            .min(10)
            .max(254)
            .messages(ptBrErros),

    subject:
        Joi.string()
            .required()
            .min(3)
            .max(50)
            .messages(ptBrErros),

    registered:
        Joi.bool()
            .required()
            .messages(ptBrErros),

    subjectId:
        Joi.number()
            .required()
            .integer()
            .positive()
            .messages(ptBrErros)

});
