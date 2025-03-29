import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import schema from "../blueprint/questionSchema.ts";
import { promptSchema } from "../blueprint/promptSchema.ts";
import { summary } from "../blueprint/weakPointBlueprint.ts";

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
      let prompt = `Generate exactly ${numQuestions} questions for a ${testName} quiz.
      Mix of: 
      - Multiple choice (4 options, 1 correct),
      - Select two (5 options, 2 correct),
      - True/False (2 options, 1 correct).
      
      Respond ONLY in this JSON format:
      
      ${promptSchema}
      
      If select_two is true, include 5 options and exactly 2 correct answers.
      Do not include extra fields.
      Only return the JSON.
      
      ${res.locals.weakPoints?.length ? `Focus especially on: ${res.locals.weakPoints.join(", ")}` : ""}
      `;
      
      const result = await model.generateContent(prompt);
      const message = JSON.parse(result.response.text());
      console.log("Length of result:", message.questions.length, numQuestions); // Add this line
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
