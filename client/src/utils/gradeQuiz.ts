interface Question {
    question: string;
    answers: Record<string, string | undefined>;
    correct_answer: string | string[];
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
      const { correct_answer, user_answer } = question;
  
      if (user_answer === undefined) {
        unansweredCount++;
        question.is_correct = false;
      } else if (Array.isArray(correct_answer)) {
        // Handle multiple correct answers
        const isCorrect =
          Array.isArray(user_answer) &&
          user_answer.length === correct_answer.length &&
          user_answer.every((answer) => correct_answer.includes(answer));
  
        question.is_correct = isCorrect;
        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } else {
        // Handle single answer questions
        question.is_correct = user_answer === correct_answer;
        if (question.is_correct) {
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
  