import express from 'express';
import aiController from '../controllers/aiController.js'; // Adjust the path as necessary
import { getWeakPointsMiddleware } from '../middleware/getWeakPointsMiddleware.js';
import { decodeUserMiddleware } from '../middleware/decodeUserMiddleware.js';
import { getTokenMiddleware } from '../middleware/getTokenMiddleware.js'; // Adjust the path as necessary

const router = express.Router();

// Define your routes here
router.post('/getTest', decodeUserMiddleware,getTokenMiddleware, getWeakPointsMiddleware, aiController.getAiTest);
router.post('/getPreviewTest', decodeUserMiddleware,getTokenMiddleware, aiController.getAiPreview);
router.post('/reviewTest', aiController.getWeakPoints);

export default router;
