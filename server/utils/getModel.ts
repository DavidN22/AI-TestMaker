// utils/getModel.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY || "";
const deepseekApiKey = process.env.DEEPSEEK_API_KEY || "";
const openaiApiKey = process.env.OPENAI_API_KEY || "";

export function getModel(languageModel: string) {
  // 🔵 DeepSeek
  if (languageModel === "deepseek") {
    console.log("🔵 Using DeepSeek model");
    const openai = new OpenAI({
      apiKey: deepseekApiKey,
      baseURL: "https://api.deepseek.com",
    });

    return {
      generate: async (prompt: string) => {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: "You are an AI generating structured JSON content." },
            { role: "user", content: prompt },
          ],
          model: "deepseek-chat",
          response_format: { type: "json_object" },
        });

        return completion.choices[0].message.content || "";
      },
    };
  }

  // 🟣 GPT-5.1
  if (languageModel === "gpt-5.1") {
    console.log("🟣 Using GPT-5.1 model");
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });
  
    return {
      generate: async (prompt: string) => {
        const response = await openai.responses.create({
          model: "gpt-5.1",
          input: [
            { role: "system", content: "You must respond only with valid JSON." },
            { role: "user", content: prompt }
          ],
          text: {
            format: { type: "json_object" }
          },
        });
 
        const jsonString = response.output_text as any
        
        return jsonString;
      },
    };
  }
  

  // 🟢 Gemini
  if (languageModel === "gemini") {
    console.log("🟢 Using Gemini model");
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        thinkingConfig: {
          thinkingBudget: 128,
        },
      } as any,
    });
    return {
      generate: async (prompt: string) => {
        const result = await model.generateContent(prompt);
        return result.response.text();
      },
    };
  }

  // Default: Gemini (for backward compatibility)
  console.log("🟢 Using Gemini model (default)");
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      thinkingConfig: {
        thinkingBudget: 128,
      },
    } as any,
  });
  return {
    generate: async (prompt: string) => {
      const result = await model.generateContent(prompt);
      return result.response.text();
    },
  };
}
