export interface Question {
 question: string;
  answers: Record<string, string | undefined>;
  correct_answer: string[];
  user_answer?: string | string[];
  hint: string;
  explanation: string;
  select_two?: boolean;
  is_correct?: boolean;
}


export interface RawQuestion {
  question_number: number;
  question: string;
  answers: Record<string, string>;
  correct_answer: string[];
  hint: string;
  explanation: string;
  select_two?: boolean;
}


export interface PreviewData {
  questions: RawQuestion[];
}
