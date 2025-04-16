import express from 'express';
import 'dotenv/config';

import * as a from './routes/Subject.Routes.js';
import * as b from './routes/Students.Routes.js';
import * as c from './routes/Teachers.Routes.js';

const server = express();

server.use(express.json());

server.route('/').get((_, res) => { res.send('OK!') });

/**
 * Subjects rotas.
 */
server.use('/api/materias',

    a.registerSubjact,
    a.getAllSubjacts,
    a.updateSubjact,
    a.removeSubjact

);

server.use('/api/materias/id/:id',

    a.getSubjectById

);

/**
 * Students rotas.
 */
server.use('/api/estudantes',

    b.enrollStudent,
    b.getAllStudents

);

server.use('/api/estudantes/cpf/:cpf',

    b.getStudentByCpf,
    b.updateStudentByCpf,
    b.removeStudantByCpf

);

server.use('/api/estudantes/materiaid/:id',

    b.getStudentById

);

server.use('/api/estudantes/nome/:name',

    b.getStudentByName

);

server.use('/api/estudantes/materiaId/:subjactId',

    b.getStudentBySubject

);

/**
 * Teachers rotas.
 */
server.use('/api/professores',

    c.registerTeacher,
    c.getAllTeachers

);

server.use('/api/professores/cpf/:cpf',

    c.getTeacherByCpf,
    c.updateTeacherByCpf,
    c.removeTeacherByCpf

);

server.use('/api/professores/id/:id',

    c.getTeacherById

);

server.use('/api/professores/nome/:name',

    c.getTeacherByName

);

server.use('/api/professores/materiaId/:subjactId',

    c.getTeacherBySubjactId

);

export default server;
