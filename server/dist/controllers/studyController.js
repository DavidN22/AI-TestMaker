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
};
export default studyController;
