import express from 'express';
import aiController from '../controllers/aiController.ts'; // Adjust the path as necessary
import { getWeakPointsMiddleware } from '../middleware/getWeakPointsMiddleware.ts';
import { decodeUserMiddleware } from '../middleware/decodeUserMiddleware.ts';
import { getTokenMiddleware } from '../middleware/getTokenMiddleware.ts'; // Adjust the path as necessary

const router = express.Router();

// Define your routes here
router.post('/getTest', decodeUserMiddleware,getTokenMiddleware, getWeakPointsMiddleware, aiController.getAiTest);
router.post('/reviewTest', aiController.getWeakPoints);

export default router;
