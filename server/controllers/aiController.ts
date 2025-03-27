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
      let prompt = `generate ${numQuestions} question for a ${testName} quiz (as authentic as possible, usually go with hard questions), 
  some multiple choice and some select two, 
  IMPORTANT!: FOR SELECT TWO QUESTION, HAVE 5 CHOICES, BUT FOR REGULAR MULTIPLE CHOICE QUESTIONS, HAVE 4 CHOICES.
  Follow this format: ${promptSchema} 
  AND ONLY RESPOND IN JSON FORMAT!`;

      // If weakPoints were injected by the middleware, include them
      if (res.locals.weakPoints?.length) {
        prompt += `\nFocus especially on these weak points: ${res.locals.weakPoints.join(
          ", "
        )}`;
      }
 
      const result = await model.generateContent(prompt);
      const message = JSON.parse(result.response.text());

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
