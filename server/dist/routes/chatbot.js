import express from 'express';
import { handleChatbotQuery } from '../controllers/chatbotController.js';
import { decodeUserMiddleware } from "../middleware/decodeUserMiddleware.js";
const router = express.Router();
// POST /api/chatbot/query
router.post('/query', decodeUserMiddleware, handleChatbotQuery);
export default router;
