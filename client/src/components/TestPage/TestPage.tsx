import { motion } from "framer-motion";
import TestQuestion from "./TestQuestions";
import TestSidebar from "./TestSidebar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "@/Types/Question";
import gradeQuiz from "../../utils/gradeQuiz";
import {reviewTest} from "../../utils/api";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetTestResultsQuery } from "../../store/Slices/apiSlice";
import CancelTest from "../models/CancelTestModal";
import SubmitTest from "../models/SubmitTestModal";

export default function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetTestResultsQuery();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const {
    testName,
    timer: initialTimer,
    questions: testQuestions,
  } = location.state || {};

  const [questions, setQuestions] = useState<Question[]>(
    testQuestions?.map((q: Question) => ({
      ...q,
      user_answer: undefined,
      correct_answer: Array.isArray(q.correct_answer)
        ? q.correct_answer
        : [q.correct_answer],
    })) || []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  if (!testName || !testQuestions) {
    return null;
  }

  const onCancel = () => {
    navigate("/", { replace: true, state: {} });
  };

// In your onSubmit function
const onSubmit = async () => {
  setIsSubmitOpen(false);
  setLoading(true);

  const results = gradeQuiz(questions);
  try {
    await reviewTest({ results, testName });
    refetch();
    navigate("/history", { replace: true });
  } catch (error) {
    navigate("/history", { replace: true });
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};


  const handleAnswerSelect = (answer: string) => {
    setQuestions((prev) =>
      prev.map((q, index) => {
        if (index === currentIndex) {
          if (q.select_two) {
            const currentAnswers = Array.isArray(q.user_answer)
              ? q.user_answer
              : [];
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
      {/* Sidebar - hidden on mobile */}
      <TestSidebar
        className="hidden lg:flex"
        title={testName}
        questions={questions}
        currentIndex={currentIndex}
        setCurrentIndex={handleQuestionChange}
        timer={initialTimer}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />

      {loading && <LoadingSpinner message="Getting your results" />}

      {/* Main Content */}
      <div className="flex flex-col flex-grow lg:items-center lg:justify-center">
        {/* MOTION CARD */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-[100dvh] lg:h-auto lg:max-w-2xl bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-y-auto"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {testName}
          </h2>

          {/* Question Component */}
          <TestQuestion
            questionData={questions[currentIndex]}
            selectedAnswer={questions[currentIndex].user_answer}
            onAnswerSelect={handleAnswerSelect}
            showHint={showHint}
          />

          {/* Navigation + Hint */}
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

          {/* Mobile Submit / Cancel */}
          <div className="mt-6 flex justify-between lg:hidden">
            <button
              onClick={() => setIsCancelOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            >
              Cancel Test
            </button>
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
            >
              Submit Test
            </button>
          </div>
        </motion.div>
        <CancelTest
          isOpen={isCancelOpen}
          setIsOpen={setIsCancelOpen}
          onCancel={onCancel}
        />

        <SubmitTest
          isOpen={isSubmitOpen}
          setIsOpen={setIsSubmitOpen}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
