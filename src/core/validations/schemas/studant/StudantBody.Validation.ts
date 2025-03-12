import { Studants } from '../../../interfaces/studant.js';
import { ptBrErros } from '../../../services/Translations.service.js';  
import Joi from 'joi';

export const bodyValidation: Joi.ObjectSchema<Studants> = Joi.object({
    
    name:
        Joi.string()
            .required()
            .min(3)
            .max(150)
            .messages(ptBrErros),

    birthdate: 
        Joi.date()
            .required()
            .messages(ptBrErros),

    gender: 
        Joi.string()
            .required()
            .min(1)
            .max(1)
            .uppercase()
            .valid('M', 'F')
            .messages(ptBrErros),
    
    cpf:
        Joi.string()
            .required()
            .min(14)
            .max(14)
            .messages(ptBrErros),
    
    phone:
        Joi.string()
            .optional()
            .min(15)
            .max(15)
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
