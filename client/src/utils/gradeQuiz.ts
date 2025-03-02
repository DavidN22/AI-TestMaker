interface Question {
  question: string;
  answers: Record<string, string | undefined>;
  correct_answer: string[]; // Always an array
  user_answer?: string | string[];
  hint: string;
  explanation: string;
  select_two?: boolean;
  is_correct?: boolean;
}

interface QuizResult {
  score: string;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  updatedQuizData: Question[];
}

export default function gradeQuiz(quizData: Question[]): QuizResult {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  quizData.forEach((question) => {
    const { user_answer, correct_answer, select_two } = question;

    if (select_two && Array.isArray(user_answer) && user_answer.length === 0) {
      // If a select_two question has an empty array as an answer, count it as unanswered
      unansweredCount++;
      question.is_correct = false;
    } else if (user_answer === undefined) {
      // If no answer is provided at all, count it as unanswered
      unansweredCount++;
      question.is_correct = false;
    } else if (Array.isArray(user_answer)) {
      // Handle multiple selected answers
      const isCorrect =
        user_answer.length === correct_answer.length &&
        user_answer.every((answer) => correct_answer.includes(answer));

      question.is_correct = isCorrect;
      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
    } else {
      // Single-choice question handling
      const isCorrect = correct_answer.includes(user_answer);
      question.is_correct = isCorrect;
      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const totalQuestions = quizData.length;
  const score = ((correctCount / totalQuestions) * 100).toFixed(2);

  return {
    score: `${score}%`,
    correctCount,
    wrongCount,
    unansweredCount,
    updatedQuizData: quizData,
  };
}
