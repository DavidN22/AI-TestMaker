import { z } from "zod";


export function buildQuizSchema(types: string[], numQuestions: number) {

  // A relaxed union-compatible schema (safe for AI generation)
  const questionSchema = z.object({
    question_number: z.number().optional(),
    question: z.string(),
    correct_answer: z.array(z.string()),
    answers: z.object({
      a: z.string(),
      b: z.string(),
      c: z.string().optional(),
      d: z.string().optional(),
      e: z.string().optional(),
    }),
    select_two: z.literal(true).optional(),
    hint: z.string().optional(),
    explanation: z.string().optional(),
  });

  return z.object({
    questions: z.array(questionSchema).length(numQuestions),
  });
}

