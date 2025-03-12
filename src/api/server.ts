import express from 'express';
import dotenv from 'dotenv';

import '../config/TranslationsYpu.js';
import { enrollStudent } from './routes/Studants.Routes.js';   

dotenv.config();

const app = express();
const host: string = process.env.HOST || 'localhost';
const port: number = parseInt(process.env.PORT_SERVER || '3000', 10);

app.use(express.json());

app.route('/').get((_, res) => {

    res.send('OK!')

});

app.use('/api/students', enrollStudent);

app.listen(port, host, () => {

	console.log(`Server running at http://${host}:${port}/`);
    
});
