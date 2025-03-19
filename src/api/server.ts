import express from 'express';
import dotenv from 'dotenv';

import * as a from './routes/Subject.Routes.js';
import * as b from './routes/Studants.Routes.js';   
import * as c from './routes/Teachers.Routes.js'

dotenv.config();

const app = express();
const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

app.use(express.json());

app.route('/').get((_, res) => { res.send('OK!') });

/**
 * Subjects rotas.
 */
app.use('/api/materias', 
    
    a.getAllSubjacts,
    a.registerSubjact,
    a.updateSubjact,
    a.removeSubjact

);

app.use('/api/materias/id/:id',

    a.getSubjectById

);

/**
 * Students rotas.
 */
app.use('/api/estudantes', 

    b.enrollStudent, 
    b.getAllStudents

);
app.use('/api/estudantes/cpf/:cpf', 
    
    b.getStudentByCpf,
    b.updateStudentByCpf,
    b.removeStudantByCpf

);

app.use('/api/estudantes/materiaid/:id', 
    
    b.getStudentById

);

app.use('/api/estudantes/nome/:name', 
    
    b.getStudentByName

);

app.use('/api/estudantes/materiaId/:subjactId', 
    
    b.getStudentBySubject

);

/**
 * Teachers rotas.
 */
app.use('/api/professores',

    c.registerTeacher,
    c.getAllTeachers

);

app.use('/api/professores/cpf/:cpf',

    c.getTeacherByCpf,
    c.updateTeacherByCpf,
    c.removeTeacherByCpf

);

app.use('/api/professores/id/:id',

    c.getTeacherById

);

app.use('/api/professores/nome/:name',

    c.getTeacherByName

);

app.use('/api/professores/materiaId/:subjactId',

    c.getTeacherBySubjactId
    
);

app.listen(port, host, (err) => {

    if (err) throw new Error(err.message);
    
	console.log(`Server running at http://${host}:${port}/`);
    
});
