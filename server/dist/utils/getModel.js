// utils/getModel.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const deepseekApiKey = process.env.DEEPSEEK_API_KEY || "";
const openaiApiKey = process.env.OPENAI_API_KEY || "";
export function getModel(languageModel) {
    // 🔵 DeepSeek
    if (languageModel === "deepseek") {
        const openai = new OpenAI({
            apiKey: deepseekApiKey,
            baseURL: "https://api.deepseek.com",
        });
        return {
            generate: async (prompt) => {
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
    // 🟣 GPT-4o
    if (languageModel === "gpt-4o") {
        const openai = new OpenAI({
            apiKey: openaiApiKey,
        });
        return {
            generate: async (prompt) => {
                const response = await openai.responses.create({
                    model: "gpt-4o",
                    input: [
                        { role: "system", content: "You must respond only with valid JSON." },
                        { role: "user", content: prompt }
                    ],
                    text: {
                        format: { type: "json_object" }
                    },
                });
                const jsonString = response.output_text;
                return jsonString;
            },
        };
    }
    // 🟢 Gemini
    if (languageModel === "gemini") {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                responseMimeType: "application/json",
            },
        });
        return {
            generate: async (prompt) => {
                const result = await model.generateContent(prompt);
                return result.response.text();
            },
        };
    }
    // Default: Gemini (for backward compatibility)
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
            responseMimeType: "application/json",
        },
    });
    return {
        generate: async (prompt) => {
            const result = await model.generateContent(prompt);
            return result.response.text();
        },
    };
}
