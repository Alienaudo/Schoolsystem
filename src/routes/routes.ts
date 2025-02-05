import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

const studants: string[] = [];


export const root = app.get('/', (req, res) => {
	res.status(201).send('Test')
	//res.status(201).sendFile(path.join(__dirname, 'index.html'))
});

export const registerStudantPOST = app.post('/api/registerStudant', (req, res) => {
	studants.push(req.body)
	res.status(201).send(req.body)
});

export const registerStudantGET = app.get('/api/registerStudant', (req, res) => {
	res.status(200).send(studants)
});
