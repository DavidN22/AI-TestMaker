import express from 'express';
import dbController from '../controllers/dbController.js'; // Adjust the path as necessary
import { decodeUserMiddleware } from '../middleware/decodeUserMiddleware.js';

const router = express.Router();

// Define your routes here
router.post('/tests',decodeUserMiddleware, dbController.addQuizResult);
router.get('/tests', decodeUserMiddleware, dbController.getQuizResults);
router.delete('/delete', decodeUserMiddleware, dbController.deleteAccount);
router.delete('/tests', decodeUserMiddleware, dbController.clearAllTestResults);
router.delete('/tests/:testId', decodeUserMiddleware, dbController.deleteSingleTestResult); 
router.post("/custom", decodeUserMiddleware, dbController.createCustomTest); 
router.get("/custom", decodeUserMiddleware, dbController.getCustomTests); 
router.delete("/custom/:testId", decodeUserMiddleware, dbController.deleteCustomTest);

export default router;
