import express from 'express';
import SubjectController from '../../core/controllers/Subjects.Controller.js';

const router = express.Router();

const subjectController = new SubjectController;

const registerSubjact = router.post('/', 
    
    subjectController.registerValidation,
    subjectController.register
    
);

const updateSubjact = router.put('/', 

    subjectController.updateValidation,
    subjectController.update
    
);

const removeSubjact = router.delete('/', 

    subjectController.removeValidation,
    subjectController.remove
      
);

const getAllSubjacts = router.get('/',

    subjectController.getAllValidation,
    subjectController.getAll

);

const getSubjectById = router.get('/', 

    subjectController.getByIdValidation,
    subjectController.getById
    
);

export {
    
    registerSubjact,
    updateSubjact,
    getAllSubjacts,
    getSubjectById,
    removeSubjact

};
