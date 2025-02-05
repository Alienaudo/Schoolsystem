import { pool } from '../connections/creatConnection.js';
import { executeQuery } from './executeQuery.js';

export const QUERIES = {
    createDataBase: " CREATE DATABASE IF NOT EXISTS ScholarDB; ",
    useDataBase: " USE ScholarDB; ",
    showDatabases: " SHOW DATABASES; ",
    createTableStudants: ` 
        CREATE TABLE IF NOT EXISTS students ( 
            id BIGINT PRIMARY KEY AUTO_INCREMENT, 
            studentName VARCHAR(100) NOT NULL, 
            birth DATETIME NOT NULL,
            gender ENUM('M', 'F') NOT NULL, 
            cpf VARCHAR(16) UNIQUE NOT NULL, 
            phone VARCHAR(15), 
            email VARCHAR(100) UNIQUE NOT NULL,
            subject VARCHAR(50) NOT NULL,
            registered BOOLEAN NOT NULL
            )DEFAULT CHARSET = utf8;  
            `,
    createTableTeachers: `
        CREATE TABLE IF NOT EXISTS teachers ( 
            id BIGINT PRIMARY KEY AUTO_INCREMENT, 
            teachersName VARCHAR(100) NOT NULL,
            age INT NOT NULL, 
            cpf VARCHAR(16) UNIQUE NOT NULL,
            gender ENUM('M', 'F') NOT NULL,
            phone VARCHAR(15), 
            email VARCHAR(100) UNIQUE NOT NULL, 
            subject VARCHAR(50) NOT NULL 
            )DEFAULT CHARSET = utf8; 
            `,
    createTableSubjects: `
        CREATE TABLE IF NOT EXISTS subjects ( 
            id BIGINT PRIMARY KEY AUTO_INCREMENT, 
            subjectName VARCHAR(100) NOT NULL, 
            hours FLOAT NOT NULL
            )DEFAULT CHARSET = utf8; 
            `
};

console.log("Criando a base de dados...");
executeQuery(QUERIES.createDataBase);
console.log("Base de dados criada com exito!");

console.log("Criando a tabela 'students'...");
executeQuery(QUERIES.createTableStudants);
console.log("Tabala 'studants' criada com exito!");

console.log("Criando a tabela 'techers'...");
executeQuery(QUERIES.createTableTeachers);
console.log("Tabala 'techers' criada com exito!");

console.log("Criando a tabela 'subjects'...");
executeQuery(QUERIES.createTableSubjects);
console.log("Table 'subjects' criada com exito!");

executeQuery(QUERIES.showDatabases).then(() => {
    console.log("Base da dados criada com exito!");

}).catch(err => {
    console.log("Erro ao criar a base de dados: ", err);

}).finally(() => {
    pool.end()
    
});
