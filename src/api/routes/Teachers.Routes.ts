import express from 'express';
import TeacherController from '../../core/controllers/Teachers.Controller.js';

const router = express.Router();

const teacherController = new TeacherController;

const registerTeacher = router.post('/',
    
    teacherController.registerValidation,
    teacherController.register
    
);

const updateTeacherByCpf = router.put('/', 

    teacherController.updateValidation,
    teacherController.update

);

const removeTeacherByCpf = router.delete('/', 

    teacherController.removeValidation,
    teacherController.remove
    
);

const getAllTeachers = router.get('/', 

    teacherController.getAllValidation,
    teacherController.getAll

);

const getTeacherById = router.get('/id/:id',

    teacherController.getByIdValidation,
    teacherController.getById
    
);

const getTeacherByCpf = router.get('/cpf/:cpf', 

    teacherController.getByCpfValidation,
    teacherController.getByCpf
    
);

const getTeacherByName = router.get('/nome/:name', 
    
    teacherController.getByNameValidation,
    teacherController.getByName

);

const getTeacherBySubjactId = router.get('/materiaId/:subjactId', 

    teacherController.getBySubjectIdValidation,
    teacherController.getBySubjectId
    
);

export {

    registerTeacher,
    updateTeacherByCpf,
    removeTeacherByCpf,
    getAllTeachers,
    getTeacherById,
    getTeacherByCpf,
    getTeacherByName,
    getTeacherBySubjactId

}
