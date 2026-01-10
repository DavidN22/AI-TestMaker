import { flashcardSchema } from "../blueprint/flashcardSchema.js";
import { pool } from "../db/db.js";
import { getModel } from "../utils/getModel.js";
import { decrementUserToken } from "../utils/decrementToken.js";
const studyController = {
    // Generate flashcards from AI conversation
    generateFlashcards: async (req, res, next) => {
        const { topic, count = 10 } = req.body;
        try {
            const user = res.locals.user;
            await decrementUserToken(user);
            // Always use GPT-5.1 as specified
            const model = getModel("gpt-5.1");
            const prompt = `Generate exactly ${count} educational flashcards about "${topic}". 
Each flashcard should have a term and a clear, concise definition/explanation.
The definitions should be educational and informative, suitable for studying.

Follow this exact JSON format:
${flashcardSchema}

Rules:
- Generate exactly ${count} flashcards
- Each definition should be 1-3 sentences
- Focus on key concepts and important information
- Make the content educational and accurate
- In the "highlights" array, include 2-4 important words or short phrases from the definition that are key to understanding the concept
- Highlights should be exact substrings that appear in the definition
- ONLY respond with valid JSON, no additional text`;
            const rawResponse = await model.generate(prompt);
            const message = JSON.parse(rawResponse);
            // Save to flashcard history
            try {
                const insertQuery = `
          INSERT INTO flashcard_history ("user", title, flashcards, source_type, topic)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id;
        `;
                const title = `${topic.substring(0, 50)}${topic.length > 50 ? '...' : ''}`;
                await pool.query(insertQuery, [
                    user,
                    title,
                    JSON.stringify(message),
                    'ai',
                    topic
                ]);
            }
            catch (dbError) {
                console.error("Error saving flashcard to history:", dbError);
                // Don't fail the request if history save fails
            }
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    },
    // Generate flashcards from test results
    generateFlashcardsFromTest: async (req, res, next) => {
        const { testId, count = 10, weakPointsOnly = false } = req.body;
        try {
            const user = res.locals.user;
            await decrementUserToken(user);
            // Fetch test data from database
            const query = `
        SELECT quiz_data, weak_points, title
        FROM devtests
        WHERE test_id = $1 AND "user" = $2
      `;
            const result = await pool.query(query, [testId, user]);
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Test not found" });
                return;
            }
            const { quiz_data, weak_points, title } = result.rows[0];
            // Always use GPT-5.1 as specified
            const model = getModel("gpt-5.1");
            let prompt;
            if (weakPointsOnly && weak_points) {
                // weak_points is a string, not an array
                prompt = `Generate exactly ${count} educational flashcards focusing on the following weak points from a ${title} test:
${weak_points}

Create flashcards that help the student understand and remember these weak areas.
Each flashcard should have a term and a clear, concise definition/explanation.

Follow this exact JSON format:
${flashcardSchema}

Rules:
- Generate exactly ${count} flashcards
- Focus specifically on the weak points mentioned
- Each definition should be 1-3 sentences
- Make the content educational and help address the weak areas
- In the "highlights" array, include 2-4 important words or short phrases from the definition that are key to understanding the concept
- Highlights should be exact substrings that appear in the definition
- ONLY respond with valid JSON, no additional text`;
            }
            else {
                // Extract questions and correct answers from quiz_data
                const questionsContext = quiz_data
                    .map((q, idx) => {
                    const correctAnswers = Array.isArray(q.correct_answer)
                        ? q.correct_answer.map((ans) => q.answers[ans]).join(", ")
                        : q.answers[q.correct_answer];
                    return `Q${idx + 1}: ${q.question}\nCorrect Answer(s): ${correctAnswers}\nExplanation: ${q.explanation || ""}`;
                })
                    .join("\n\n");
                prompt = `Generate exactly ${count} educational flashcards based on the following ${title} test questions and answers:

${questionsContext}

Create flashcards covering the key concepts from this test.
Each flashcard should have a term and a clear, concise definition/explanation.

Follow this exact JSON format:
${flashcardSchema}

Rules:
- Generate exactly ${count} flashcards
- Cover the main topics and concepts from the test
- Each definition should be 1-3 sentences
- Make the content educational and reinforce the test material
- In the "highlights" array, include 2-4 important words or short phrases from the definition that are key to understanding the concept
- Highlights should be exact substrings that appear in the definition
- ONLY respond with valid JSON, no additional text`;
            }
            const rawResponse = await model.generate(prompt);
            const message = JSON.parse(rawResponse);
            // Save to flashcard history
            try {
                const insertQuery = `
          INSERT INTO flashcard_history ("user", title, flashcards, source_type, source_id)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id;
        `;
                await pool.query(insertQuery, [
                    user,
                    title,
                    JSON.stringify(message),
                    'test',
                    testId
                ]);
            }
            catch (dbError) {
                console.error("Error saving flashcard to history:", dbError);
                // Don't fail the request if history save fails
            }
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    },
    // Study chatbot for Q&A
    studyChatbot: async (req, res, next) => {
        const { question } = req.body;
        try {
            const user = res.locals.user;
            await decrementUserToken(user);
            // Always use GPT-5.1 as specified
            const model = getModel("gpt-5.1");
            const prompt = `You are a helpful study assistant. Answer the following question clearly and concisely:

"${question}"

Provide an educational, accurate answer. Be clear and helpful.

Return your response in this JSON format:
{
  "answer": "Your detailed answer here"
}

ONLY respond with valid JSON, no additional text`;
            const rawResponse = await model.generate(prompt);
            const message = JSON.parse(rawResponse);
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    },
    // Get flashcard history (last 4 + favorites)
    getFlashcardHistory: async (req, res, next) => {
        try {
            const user = res.locals.user;
            // Get last 4 recent flashcards
            const recentQuery = `
        SELECT id, title, flashcards, created_at, source_type, source_id, topic, is_favorite
        FROM flashcard_history
        WHERE "user" = $1
        ORDER BY created_at DESC
        LIMIT 4;
      `;
            const recentResult = await pool.query(recentQuery, [user]);
            // Get all favorites
            const favoritesQuery = `
        SELECT id, title, flashcards, created_at, source_type, source_id, topic, is_favorite
        FROM flashcard_history
        WHERE "user" = $1 AND is_favorite = TRUE
        ORDER BY created_at DESC;
      `;
            const favoritesResult = await pool.query(favoritesQuery, [user]);
            res.json({
                recent: recentResult.rows,
                favorites: favoritesResult.rows,
            });
        }
        catch (error) {
            next(error);
        }
    },
    // Toggle favorite status for a flashcard set
    toggleFlashcardFavorite: async (req, res, next) => {
        try {
            const { flashcardId } = req.params;
            const user = res.locals.user;
            // First check if the flashcard belongs to the user
            const checkQuery = `
        SELECT is_favorite FROM flashcard_history
        WHERE id = $1 AND "user" = $2;
      `;
            const checkResult = await pool.query(checkQuery, [flashcardId, user]);
            if (checkResult.rows.length === 0) {
                res.status(404).json({ error: "Flashcard set not found" });
                return;
            }
            const currentFavoriteStatus = checkResult.rows[0].is_favorite;
            // Toggle the favorite status
            const updateQuery = `
        UPDATE flashcard_history
        SET is_favorite = $1
        WHERE id = $2 AND "user" = $3
        RETURNING id, is_favorite;
      `;
            const result = await pool.query(updateQuery, [
                !currentFavoriteStatus,
                flashcardId,
                user
            ]);
            res.json({
                message: "Favorite status updated",
                flashcard: result.rows[0],
            });
        }
        catch (error) {
            next(error);
        }
    },
    // Delete a flashcard set from history
    deleteFlashcardSet: async (req, res, next) => {
        try {
            const { flashcardId } = req.params;
            const user = res.locals.user;
            const deleteQuery = `
        DELETE FROM flashcard_history
        WHERE id = $1 AND "user" = $2
        RETURNING id;
      `;
            const result = await pool.query(deleteQuery, [flashcardId, user]);
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Flashcard set not found" });
                return;
            }
            res.json({
                message: "Flashcard set deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    },
    // Get individual favorite flashcards
    getIndividualFavorites: async (req, res, next) => {
        try {
            const user = res.locals.user;
            const query = `
        SELECT id, term, definition, highlights, created_at
        FROM flashcard_favorites
        WHERE "user" = $1
        ORDER BY created_at DESC;
      `;
            const result = await pool.query(query, [user]);
            res.json({
                favorites: result.rows,
            });
        }
        catch (error) {
            next(error);
        }
    },
    // Toggle individual flashcard favorite
    toggleIndividualFavorite: async (req, res, next) => {
        try {
            const { term, definition, highlights } = req.body;
            const user = res.locals.user;
            // Check if already favorited
            const checkQuery = `
        SELECT id FROM flashcard_favorites
        WHERE "user" = $1 AND term = $2 AND definition = $3;
      `;
            const checkResult = await pool.query(checkQuery, [user, term, definition]);
            if (checkResult.rows.length > 0) {
                // Remove from favorites
                await pool.query(`DELETE FROM flashcard_favorites WHERE id = $1;`, [checkResult.rows[0].id]);
                res.json({ isFavorite: false });
            }
            else {
                // Add to favorites
                await pool.query(`INSERT INTO flashcard_favorites ("user", term, definition, highlights) 
           VALUES ($1, $2, $3, $4);`, [user, term, definition, JSON.stringify(highlights || [])]);
                res.json({ isFavorite: true });
            }
        }
        catch (error) {
            next(error);
        }
    },
    // Check if individual flashcard is favorited
    checkIndividualFavorite: async (req, res, next) => {
        try {
            const { term, definition } = req.body;
            const user = res.locals.user;
            const query = `
        SELECT id FROM flashcard_favorites
        WHERE "user" = $1 AND term = $2 AND definition = $3;
      `;
            const result = await pool.query(query, [user, term, definition]);
            res.json({ isFavorite: result.rows.length > 0 });
        }
        catch (error) {
            next(error);
        }
    },
};
export default studyController;
