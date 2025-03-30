import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import schema from "../blueprint/questionSchema.ts";
import { promptSchema } from "../blueprint/promptSchema.ts";
import { summary } from "../blueprint/weakPointBlueprint.ts";

import { pool } from "../db/db.ts"; 

const apiKey: string = process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

const aiController = {
  getAiTest: async (req: Request, res: Response, next: NextFunction) => {
    const { testName, numQuestions } = req.body;

    try {
      // Deduct 1 token from the user's account
      const user = res.locals.user;
      await pool.query(
        "UPDATE users SET tokens = tokens - 1 WHERE email = $1",
        [user]
      );

      let prompt = `You are an API generating test questions in JSON.

      Generate **EXACTLY** ${numQuestions} questions for a ${testName} quiz.
      
      Types:
      - Multiple choice (4 options, 1 correct),
      - Select two (5 options, 2 correct),
      - True/False (2 options, 1 correct).
      
      Return only a valid JSON with the following format:
      ${promptSchema}
      
      Rules:
      - "questions" array MUST contain **exactly ${numQuestions} items**
      - Do NOT include any explanation or commentary.
      - Do NOT include more or fewer than ${numQuestions} questions.
      - Follow the JSON structure strictly. No text before or after.
      ${res.locals.weakPoints?.length ? `Focus especially on: ${res.locals.weakPoints.join(", ")}` : ""}`.trim();
      

      const result = await model.generateContent(prompt);
      const message = JSON.parse(result.response.text());

      message.questions = message.questions.map(({ question_number, ...rest }: any) => ({
        ...rest
      }));
      
      res.json({ message });
      
    } catch (error) {
      next(error);
    }
  },

  getWeakPoints: async (req: Request, res: Response, next: NextFunction) => {
    const { results } = req.body;

    try {
      const prompt = `Generate weakpoints and a summary of the ${JSON.stringify(
        results
      )} quiz, 
      follow this format: ${summary}, keep it very brief and concise (1 to 2 sentences),
       You are also directly talking to the user, AND ONLY RESPOND IN JSON FORMAT!;
      `;
      const result = await model.generateContent(prompt);
      const message = JSON.parse(result.response.text());

      res.json({ message });
    } catch (error) {
      next(error);
    }
  },
};

export default aiController;
