import { Question } from "./Question";

export interface TestResults {
  score: string;
  test_id: string;
  correct_count: number;
  wrong_count: number;
  unanswered_count: number;
  quiz_data: Question[];
  weak_points: string;
  difficulty: string;
  summary: string;
  date: string;
  title: string;
}

export interface QuizResult {
  score: string;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  updatedQuizData: Question[];
}