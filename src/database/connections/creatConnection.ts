import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'admin', 
    password: process.env.DB_PASSWORD || '123',
    connectionLimit: 5,
    acquireTimeout: 300
});
