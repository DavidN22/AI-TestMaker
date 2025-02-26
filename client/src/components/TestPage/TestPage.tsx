import { motion } from "framer-motion";
import TestQuestion from "./TestQuestions";
import TestSidebar from "./TestSidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  question: string;
  answers: Record<string, string | undefined>;
  correct_answer: string | string[];
  user_answer?: string | string[];
  hint: string;
  explanation: string;
  select_two?: boolean;
}

export default function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract test state from navigation
  const { testName, timer: initialTimer, questions: testQuestions } = location.state || {};

  // Handle missing state (e.g., direct access without navigation)
  useEffect(() => {
    if (!testName || !testQuestions) {
      navigate("/"); // Redirect to home if state is missing
    }
  }, [testName, testQuestions, navigate]);

  // Initialize state with navigation values
  const [questions, setQuestions] = useState<Question[]>(
    testQuestions?.map((q: Question) => ({ ...q, user_answer: undefined })) || []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(initialTimer || 3600); // Default to 1 hour if missing

  const handleAnswerSelect = (answer: string) => {
    setQuestions((prev) =>
      prev.map((q, index) => {
        if (index === currentIndex) {
          if (q.select_two) {
            const currentAnswers = Array.isArray(q.user_answer) ? q.user_answer : [];
            const newAnswers = currentAnswers.includes(answer)
              ? currentAnswers.filter((a) => a !== answer)
              : [...currentAnswers, answer];
            return { ...q, user_answer: newAnswers };
          } else {
            return { ...q, user_answer: answer };
          }
        }
        return q;
      })
    );
  };

  const handleQuestionChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <TestSidebar
        questions={questions}
        currentIndex={currentIndex}
        setCurrentIndex={handleQuestionChange}
        timer={timer}
      />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{testName}</h2>

          {/* Question Component */}
          <TestQuestion
            questionData={questions[currentIndex]}
            selectedAnswer={questions[currentIndex].user_answer}
            onAnswerSelect={handleAnswerSelect}
            showHint={showHint}
          />

          {/* Navigation + Hint Button */}
          <div className="flex justify-between mt-8 space-x-4">
            <button
              onClick={() => handleQuestionChange(currentIndex - 1)}
              disabled={currentIndex === 0}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                currentIndex === 0
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  : "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold text-sm hover:bg-yellow-600 transition-all"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>

            <button
              onClick={() => handleQuestionChange(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                currentIndex === questions.length - 1
                  ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400"
                  : "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
