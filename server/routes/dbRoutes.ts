import express from 'express';
import dbController from '../controllers/dbController.ts'; // Adjust the path as necessary

const router = express.Router();

// Define your routes here
router.post('/tests', dbController.addQuizResult);


export default router;
