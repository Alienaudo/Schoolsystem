import express from 'express';

import StudantsController from '../../core/controllers/Studants.Controller.js';

const router = express.Router();

const studantsController = new StudantsController();

export const enrollStudent = router.post('/', studantsController.createValidation, studantsController.enroll);

export const getStudant = [];

export const getAllStudants = [];

export const removeStudant = [];
