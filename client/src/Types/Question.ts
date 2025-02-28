export interface Question {
    question: string;
    answers: Record<string, string | undefined>;
    correct_answer: string | string[];
    user_answer?: string | string[];
    hint: string;
    explanation: string;
    select_two?: boolean;
  }
  