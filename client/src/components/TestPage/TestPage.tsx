import { motion } from "framer-motion";
import TestQuestion from "./TestQuestions";
import TestSidebar from "./TestSidebar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "@/Types/Question";
import gradeQuiz from "../../utils/gradeQuiz";
import { useApi } from "../../utils/api";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useGetTestResultsQuery } from "../../store/Slices/apiSlice";
import CancelTest from "../models/CancelTestModal";
import SubmitTest from "../models/SubmitTestModal";

export default function TestPage() {
  const { reviewTest } = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetTestResultsQuery();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);


  useEffect(() => {
    if (
      !location.state ||
      !location.state.testName ||
      !location.state.questions
    ) {
      navigate("/home", { replace: true, state: {} });
    }
  }, [location, navigate]);

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

      navigate("/home", { replace: true });
      setLoading(false);
    
      
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
    setShowHint(false);
    setCurrentIndex(index);
  };
  

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white">

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
          className="w-full h-[100dvh] lg:h-auto lg:max-w-4xl bg-white dark:bg-[#2A2A2A] p-4 sm:p-6 lg:p-8 rounded-none lg:rounded-xl shadow-none lg:shadow-2xl overflow-y-auto border-t lg:border border-gray-200 dark:border-gray-700"
          >
          <h2 className="text-lg font-bold text-black dark:text-white mb-4">
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
              className={`flex-1 px-6 py-3 rounded-md font-medium text-sm transition-all ${
                currentIndex === 0
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-yellow-500 text-black dark:text-black rounded-md font-medium text-sm hover:bg-yellow-400 transition-all"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>

            <button
              onClick={() => handleQuestionChange(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className={`flex-1 px-6 py-3 rounded-md font-medium text-sm transition-all ${
                currentIndex === questions.length - 1
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
              }`}
            >
              Next
            </button>
          </div>

          {/* Mobile Submit / Cancel */}
          <div className="mt-6 flex justify-between lg:hidden">
            <button
              onClick={() => setIsCancelOpen(true)}
              className="px-4 py-2 border border-red-600 text-red-600 bg-white dark:bg-black rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-900 transition"
            >
              Cancel Test
            </button>
            <button
              onClick={() => setIsSubmitOpen(true)}
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm hover:bg-neutral-900 dark:hover:bg-neutral-100 transition"
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
