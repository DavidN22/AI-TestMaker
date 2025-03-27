import express from 'express';
import dbController from '../controllers/dbController.ts'; // Adjust the path as necessary
import { decodeUserMiddleware } from '../middleware/decodeUserMiddleware.ts';

const router = express.Router();

// Define your routes here
router.post('/tests',decodeUserMiddleware, dbController.addQuizResult);
router.get('/tests', decodeUserMiddleware, dbController.getQuizResults);
router.delete('/delete', decodeUserMiddleware, dbController.deleteAccount);

export default router;
