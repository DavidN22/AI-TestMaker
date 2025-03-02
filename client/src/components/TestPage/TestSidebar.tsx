import { useState, useEffect } from "react";
import CancelTest from "../models/CancelTestModal";
import SubmitTest from "../models/SubmitTestModal";
import { Question } from "../../Types/Question";

interface TestSidebarProps {
  questions: Question[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  timer: number;
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function TestSidebar({
  questions,
  currentIndex,
  setCurrentIndex,
  timer: initialTimer,
  title,
  onCancel,
  onSubmit,
}: TestSidebarProps) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialTimer);

  // Timer effect
  // useEffect(() => {
  //   if (timeRemaining <= 0) {
  //     onSubmit(); // Ensure auto-submit is triggered once
  //     return;
  //   }
  
  //   const timerInterval = window.setInterval(() => {
  //     setTimeRemaining((prevTime) => {
  //       if (prevTime <= 1) {
  //         clearInterval(timerInterval);
  //         onSubmit(); // Trigger submit once
  //         return 0;
  //       }
  //       return prevTime - 1;
  //     });
  //   }, 1000);
  
  //   return () => clearInterval(timerInterval);
  // }, [timeRemaining, onSubmit]);
  

  // Reset timer if initialTimer changes
  useEffect(() => {
    setTimeRemaining(initialTimer);
  }, [initialTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Helper function to check if a question has been answered
  const isQuestionAnswered = (
    user_answer?: string | string[],
    select_two?: boolean
  ) => {
    if (select_two) {
      // Multi-select question: Check if user_answer is an array with at least one item
      return Array.isArray(user_answer) && user_answer.length > 0;
    } else {
      // Single-select question: Check if user_answer is a non-empty string
      return typeof user_answer === "string" && user_answer.length > 0;
    }
  };

  const getButtonClass = (
    index: number,
    question: { user_answer?: string | string[]; select_two?: boolean }
  ) => {
    if (index === currentIndex) {
      return "bg-gray-700 text-white";
    } else if (
      question.select_two &&
      Array.isArray(question.user_answer) &&
      question.user_answer.length === 1
    ) {
      return "bg-yellow-500 text-white hover:bg-yellow-400";
    } else if (isQuestionAnswered(question.user_answer, question.select_two)) {
      return "bg-green-500 text-white hover:bg-green-400";
    } else {
      return "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600";
    }
  };

  return (
    <aside className="w-80 bg-white dark:bg-[#1E1E1E] p-6 shadow-lg border border-gray-300 dark:border-gray-700 transition-all flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Basic AWS knowledge assessment
        </p>

        {/* Timer */}
        {initialTimer > 0 && (
          <div className={`flex items-center mt-4 ${timeRemaining < 60 ? "text-red-500 font-bold" : "text-gray-700 dark:text-gray-300"}`}>
            ⏳ <span className="ml-2">{formatTime(timeRemaining)}</span>
          </div>
        )}
        {/* Progress */}
        <div className="mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-1">
            <div
              className="bg-blue-500 h-1 rounded-full"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question List */}
        <div className="grid grid-cols-5 gap-1 mt-6">
          {questions.map((q, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`p-3 text-sm font-medium rounded-md transition ${getButtonClass(
                index,
                q
              )}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-8">
        <button
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500"
          onClick={() => setIsCancelOpen(true)}
        >
          Cancel Test
        </button>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 mt-3"
          onClick={() => setIsSubmitOpen(true)}
        >
          Submit Test
        </button>
      </div>

      {/* Modals */}
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
    </aside>
  );
}