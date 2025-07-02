import { Request, Response } from "express";
import { run } from "@openai/agents";
import { tutoringAgent } from "../utils/agents.js";

export const handleChatbotQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.user; // Get userId from decoded user middleware

  console.log("User ID:", userId); // Log the userId for debugging
  try {
    const { question } = req.body;

    if (!question || !Array.isArray(question)) {
      res.status(400).json({ error: "Chat history (question array) is required." });
      return;
    }

    const chatInput = [
      `The current userId is "${userId}".`,
      ...question.map((msg) => `[${msg.role}]: ${msg.content}`),
    ].join("\n");

    const result = await run(tutoringAgent, chatInput);

    res.json({ answer: result.finalOutput });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to process chatbot query." });
  }
};
