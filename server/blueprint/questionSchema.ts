import { SchemaType } from "@google/generative-ai";

const schema = {
    description: "List of AWS Quiz Questions",
    type: SchemaType.OBJECT,
    properties: {
        questions: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    question: {
                        type: SchemaType.STRING,
                        description: "The text of the question",
                        nullable: false,
                    },
                    answers: {
                        type: SchemaType.OBJECT,
                        properties: {
                            a: { type: SchemaType.STRING, description: "Answer option A", nullable: false },
                            b: { type: SchemaType.STRING, description: "Answer option B", nullable: false },
                            c: { type: SchemaType.STRING, description: "Answer option C", nullable: false },
                            d: { type: SchemaType.STRING, description: "Answer option D", nullable: false },
                            e: { type: SchemaType.STRING, description: "Answer option E", nullable: true } // e is optional
                        },
                        nullable: false,
                    },
                    correct_answer: {
                        type: SchemaType.ARRAY, // Always an array, even for a single answer
                        items: { type: SchemaType.STRING },
                        description: "The correct answer(s). A single answer should be stored as an array with one item.",
                        nullable: false,
                    },
                    select_two: {
                        type: SchemaType.BOOLEAN,
                        description: "Indicates if two answers should be selected",
                        nullable: true, // Allows it to be omitted from questions where it's not needed
                    },
                    hint: {
                        type: SchemaType.STRING,
                        description: "A hint for the question",
                        nullable: false,
                    },
                    explanation: {
                        type: SchemaType.STRING,
                        description: "Explanation of the correct answer",
                        nullable: false,
                    }
                },
                required: ["question", "answers", "correct_answer", "hint", "explanation"], // Ensure correct_answer is required
            },
            nullable: false,
        },
    },
    required: ["questions"],
};

export default schema;
