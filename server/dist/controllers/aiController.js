//import schema from "../blueprint/questionSchema.ts";
import { promptSchema } from "../blueprint/promptSchema.js";
import { summary } from "../blueprint/weakPointBlueprint.js";
import { pool } from "../db/db.js";
import { getModel } from "../utils/getModel.js";
import { decrementUserToken } from "../utils/decrementToken.js";
const aiController = {
    getAiTest: async (req, res, next) => {
        const { testName, numQuestions, languageModel, description, types, difficulty } = req.body;
        try {
            const user = res.locals.user; // Retrieve and utilize user information if necessary // Retrieve user information from response locals
            await decrementUserToken(user); // Decrement user's token for the request handling // Decrement user's token for the request handling
            const result = await pool.query(// Fetch the latest quiz data from the database to prevent creating similar questions
            `
    SELECT quiz_data
    FROM devtests
    WHERE "user" = $1
    ORDER BY date DESC
    LIMIT 1
  `, [user]);
            // Step 2: Extract previous questions if any
            let previousQuestions = [];
            if (result.rows.length > 0) {
                const quizData = result.rows[0].quiz_data; // Extract quiz data from the result
                previousQuestions = quizData.map((q) => q.question);
            }
            //make types a string
            const typesString = types.join(",\n"); // Convert question types array to a formatted string
            const model = getModel(languageModel); // Obtain the correct AI model based on the languageModel parameter // Get the language model instance based on parameters
            let prompt = `You are an API generating test questions in JSON.

      Generate **EXACTLY** ${numQuestions} questions for a ${testName} quiz with **${difficulty}** difficulty, based on this description: ${description}.
      
      Return only a valid JSON with the following example test format:
      ${promptSchema}
      
      The user wants their questions in this style only: ${typesString}.
      
      Rules:
      - Multiple choice questions MUST have 4 options (a, b, c, d).
      - True/False questions MUST have 2 options (True, False).
      - "select two" questions MUST have 2 correct answers and 5 options.
      - "questions" array MUST contain **exactly ${numQuestions} items**
      - Do NOT include any explanation or commentary.
      - Do NOT include more or fewer than ${numQuestions} questions.
      - Follow the JSON structure strictly. No text before or after.
      - All questions should reflect a **${difficulty}** difficulty level.
      - Make sure to follow the type format provided and only generate ${typesString} type questions in random order.
      ${res.locals.weakPoints?.length ? `- Focus especially on: ${res.locals.weakPoints.join(", ")}` : ""}
      ${previousQuestions.length ? `- Avoid generating questions similar to the following:\n- ${previousQuestions.join("\n- ")}` : ""}
      `.trim();
            const rawResponse = await model.generate(prompt); // Use model to generate weak points and summary // Generate preview using AI model // Generate questions using the AI model
            const message = JSON.parse(rawResponse); // Parse the AI model response to JSON format
            message.questions = message.questions.map(// Remove question numbers from the parsed JSON
            ({ question_number, ...rest }) => ({ ...rest }));
            res.json({ message });
        }
        catch (error) {
            const err = new Error("Failed to generate test questions. Please try again."); // Error handling for question generation failures
            err.status = 500;
            next(err);
        }
    },
    getAiPreview: async (req, res, next) => {
        const { title, description, languageModel } = req.body;
        try {
            const user = res.locals.user;
            const model = getModel(languageModel);
            const prompt = `Generate a preview of the ${JSON.stringify(title)} quiz. Using the description 
      ${JSON.stringify(description)}.
Follow this format: ${promptSchema}. Keep it very brief and concise (5 questions) Make sure the correct answer is a mutliple choice selction like a,b,c,d or e and not the answer itself.
ONLY RESPOND IN JSON FORMAT!`;
            const rawResponse = await model.generate(prompt);
            await decrementUserToken(user);
            const message = JSON.parse(rawResponse);
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    },
    getWeakPoints: async (req, res, next) => {
        const { results, languageModel } = req.body;
        try {
            const model = getModel(languageModel);
            const prompt = `Generate weakpoints and a summary of the ${JSON.stringify(results)} quiz. 
Follow this format: ${summary}. Keep it very brief and concise (1 to 2 sentences). 
You are directly talking to the user. ONLY RESPOND IN JSON FORMAT!`;
            const rawResponse = await model.generate(prompt);
            const message = JSON.parse(rawResponse);
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    },
};
export default aiController;
