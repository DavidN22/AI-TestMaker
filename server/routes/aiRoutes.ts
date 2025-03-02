import express from 'express';
import aiController from '../controllers/aiController.ts'; // Adjust the path as necessary

const router = express.Router();

// Define your routes here
router.post('/getTest', aiController.getAiTest);
router.post('/reviewTest', aiController.getWeakPoints);

export default router;
