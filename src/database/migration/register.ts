import { teacher } from '@/core/interfaces/teacher.js';
import { pool } from '../connections/creatConnection.js';
import { executeQuery } from './executeQuery.js';
import { query } from 'express';

export class Register {
    // name: string;
    // birthDate: string;
    // gender: string;
    // cpf: string;
    // phone: string | undefined;
    // email: string;
    // subject: string;
    // registered: boolean;
    
    // constructor(name: string, birthDate: string, gender: string, cpf: string, phone: string | undefined, email: string, subject: string, registered: boolean) {
    //     this.name = name;
    //     this.birthDate = birthDate;
    //     this.gender = gender;
    //     this.cpf = cpf;
    //     this.phone = phone;
    //     this.email = email;
    //     this.subject = subject;
    //     this.registered = registered;
        
    // }
    
    public registerStudant(name: string, birthDate: string, gender: string, cpf: string, phone: string | undefined, email: string, subject: string, registered: string){
        return `
                INSERT INTO students (studentName, birth, gender, cpf, phone, email, subject, registered) 
                VALUES (${name}, ${birthDate}, ${gender}, ${cpf}, ${phone}, ${email}, ${subject}, ${registered});
        `;

    }

    public registerTeacher(name: string, age: number, gender: string, cpf: string, phone: string | undefined, email: string, subject: string) {
        return `
            INSERT INTO students (studentName, age, gender, cpf, phone, email, subject) 
            VALUES (${name}, ${age}, ${gender}, ${cpf}, ${phone}, ${email}, ${subject});
        `;
        
    }

    public registerSubjects(name: string, hours: number) {
        return `
            INSERT INTO subjects (subjectName, hours)
            VALUES (${name}, ${hours});
        `;
        
    }
    
}
