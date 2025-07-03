import { run } from "@openai/agents";
import { triageAgent } from "../utils/agents.js";
export const handleChatbotQuery = async (req, res) => {
    const userId = res.locals.user; // Get userId from decoded user middleware
    try {
        const { question } = req.body;
        if (!question || !Array.isArray(question)) {
            res.status(400).json({ error: "Chat history (question array) is required." });
            return;
        }
        // Construct the full prompt from chat history
        const chatInput = [
            `The current userId is "${userId}".`,
            ...question.map((msg) => `[${msg.role}]: ${msg.content}`),
        ].join("\n");
        const result = await run(triageAgent, chatInput);
        const output = result.finalOutput;
        // Normalize response format
        if (typeof output === "object" && output !== null) {
            res.json({ answer: output.message, confirmation: output.confirmation }); // Already structured: message, confirmation, etc.
        }
        else {
            res.json({ answer: String(output) }); // Wrap plain string into message format
        }
    }
    catch (err) {
        console.error("Chatbot error:", err);
        res.status(500).json({ error: "Failed to process chatbot query." });
    }
};
