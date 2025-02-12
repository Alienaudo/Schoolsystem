import express from 'express';
import dotenv from 'dotenv';

import { pool } from '@/database/connections/creatConnection.js';

import { home } from '../routes/routes.js';
import { registerStudantPOST, studentsRegistered } from '../routes/studantsRoutes.js';

dotenv.config();

const app = express();
const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

app.use(express.json());

app.use('/', home);

app.use('/api/registerStudant', registerStudantPOST);
app.use('/api/studentsRegistered', studentsRegistered);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
