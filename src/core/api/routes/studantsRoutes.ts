import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const studants: string[] = [];

export const registerStudantPOST = router.post('/', (req, res) => {
	studants.push(req.body)
	res.status(201).send(req.body)
});

export const studentsRegistered = router.get('/', (req, res) => {
	res.status(200).send(studants)
});
