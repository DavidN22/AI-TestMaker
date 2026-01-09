import express from "express";
import studyController from "../controllers/studyController.js";
import { decodeUserMiddleware } from "../middleware/decodeUserMiddleware.js";
import { getTokenMiddleware } from "../middleware/getTokenMiddleware.js";
const router = express.Router();
// Generate flashcards from AI conversation
router.post("/generateFlashcards", decodeUserMiddleware, getTokenMiddleware, studyController.generateFlashcards);
// Generate flashcards from test results
router.post("/generateFlashcardsFromTest", decodeUserMiddleware, getTokenMiddleware, studyController.generateFlashcardsFromTest);
// Study chatbot Q&A
router.post("/studyChatbot", decodeUserMiddleware, getTokenMiddleware, studyController.studyChatbot);
export default router;
