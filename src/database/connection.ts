import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const database: string = process.env.DB || 'MyDataBase';
const host: string = process.env.DB_HOST || 'localhost';
const port: number = parseInt(process.env.DB_PORT || '3306', 10);
const user: string = process.env.DB_USER || 'root';
const password: string = process.env.DB_ROOT_PASSWORD || '123';

const connection: Knex.Config | string = {
    
    client: 'mysql2',

    connection: {

        host: host,
        port: port,
        user: user,
        password: password,
        database: database

    },

};

export default connection;
