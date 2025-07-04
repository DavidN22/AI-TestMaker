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


export interface PreviewQuestion extends Omit<Question, 'answers'> {
  question_number: number;
  answers: Record<string, string>;
}
