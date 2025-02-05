import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { pool } from "../database/connections/creatConnection.js";

dotenv.config();

const app = express();
const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

const studants: string[] = [];

app.use(express.json());
app.use(express.static('../HTML/styles'));



app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
