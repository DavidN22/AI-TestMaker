import { Question } from "./Question";

export interface TestResults {
  score: string;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  updatedQuizData: Question[];
  weakPoints: string;
  date: string;
  title: string;
}

export interface TestResultCardProps {
  testData: TestResults;
}
