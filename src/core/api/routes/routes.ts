import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

export const home = router.get('/', (req, res) => {
	res.status(200).send('Test')
	//res.status(201).sendFile(path.join(__dirname, 'index.html'))
});
