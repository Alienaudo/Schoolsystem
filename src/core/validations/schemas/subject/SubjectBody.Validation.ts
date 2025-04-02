import { ptBrErros } from '../../../services/Translations.service.js'; 
import { Subject } from '../../../interfaces/Subject.js';  
import Joi from 'joi';

export const bodyValidation: Joi.ObjectSchema<Subject> = Joi.object({
    
    subjectName: 
        Joi.string()
            .required()
            .min(3)
            .max(50)
            .messages(ptBrErros),

    hours:
        Joi.number()
            .required()
            .min(1)
            .max(3)
            .messages(ptBrErros),

    description:
        Joi.string()
            .required()
            .min(10)
            .max(300)
            .messages(ptBrErros)

});
