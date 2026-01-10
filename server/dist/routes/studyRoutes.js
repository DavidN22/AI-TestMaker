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
// Get flashcard history (last 4 + individual favorites)
router.get("/flashcardHistory", decodeUserMiddleware, studyController.getFlashcardHistory);
// Toggle favorite for an individual flashcard
router.patch("/flashcardFavorite/:flashcardId", decodeUserMiddleware, studyController.toggleFlashcardFavorite);
// Delete a flashcard set from history
router.delete("/flashcardSet/:flashcardId", decodeUserMiddleware, studyController.deleteFlashcardSet);
// Get individual favorite flashcards
router.get("/individualFavorites", decodeUserMiddleware, studyController.getIndividualFavorites);
// Toggle individual flashcard favorite
router.post("/individualFavorite", decodeUserMiddleware, studyController.toggleIndividualFavorite);
// Check if individual flashcard is favorited
router.post("/checkIndividualFavorite", decodeUserMiddleware, studyController.checkIndividualFavorite);
export default router;
