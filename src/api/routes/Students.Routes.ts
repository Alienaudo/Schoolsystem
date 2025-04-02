import express from 'express';
import StudentsController from '../../core/controllers/Students.Controller.js';

const router = express.Router();

const studantsController = new StudentsController();

const enrollStudent = router.post('/',

    studantsController.registerValidation, 
    studantsController.register

);

const updateStudentByCpf = router.put('/', 

    studantsController.updateByCpfValidation,
    studantsController.updateByCpf

);

const removeStudantByCpf = router.delete('/', 

    studantsController.removeByCpfValidation,
    studantsController.removeByCpf

)

const getAllStudents = router.get('/',

    studantsController.getAllValidation, 
    studantsController.getAll

);

const getStudentById = router.get('/', 
    
    studantsController.getByIdValidation,
    studantsController.getById

);

const getStudentByCpf = router.get('/cpf/:cpf', 
    
    studantsController.getByCpfValidation, 
    studantsController.getByCpf

);

const getStudentByName = router.get('/nome/:name', 
    
    studantsController.getByNameValidation, 
    studantsController.getByName

);

const getStudentBySubject = router.get('/materiaId/:subjactId',
    
    studantsController.getAllValidation,
    studantsController.getBySubjectId    

);

export {

    enrollStudent, 
    updateStudentByCpf,
    removeStudantByCpf,
    getAllStudents, 
    getStudentByCpf, 
    getStudentByName, 
    getStudentBySubject, 
    getStudentById 

};
