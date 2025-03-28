import { useState, useEffect, useRef } from "react";
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
  className?: string;
} 

export default function TestSidebar({
  questions,
  currentIndex,
  setCurrentIndex,
  timer: initialTimer,
  title,
  onCancel,
  onSubmit,
  className = "" ,
}: TestSidebarProps) {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialTimer);
  
  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;
  useEffect(() => {
    if (initialTimer > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            console.log("Time's up!");
            onSubmitRef.current(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [initialTimer]); 
  

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const handleSubmit = async () => {
    setIsSubmitOpen(false);
    onSubmit();
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
      return "bg-black text-white dark:bg-white dark:text-black";
    } else if (
      question.select_two &&
      Array.isArray(question.user_answer) &&
      question.user_answer.length === 1
    ) {
      return "bg-yellow-500 text-black hover:bg-yellow-400";
    } else if (isQuestionAnswered(question.user_answer, question.select_two)) {
      return "bg-green-500 text-white hover:bg-green-400";
    } else {
      return "bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700";
    }
  };
  
  

  return (
<aside
  className={`w-80 bg-white dark:bg-[#1E1E1E] p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all flex flex-col justify-between ${className}`}
>
  {/* Header */}
  <div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
      Basic AWS knowledge assessment
    </p>

    {/* Timer */}
    {initialTimer > 0 && (
      <div
        className={`flex items-center mt-4 text-lg ${
          timeRemaining < 60
            ? "text-red-500 font-bold"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        ⏳ <span className="ml-2">{formatTime(timeRemaining)}</span>
      </div>
    )}

    {/* Progress */}
    <div className="mt-5">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full">
        <div
          className="bg-black dark:bg-white h-2 rounded-full transition-all"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
    </div>

    {/* Question List */}
    <div className="grid grid-cols-5 gap-2 mt-6">
      {questions.map((q, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`text-sm font-semibold py-2 rounded-md transition-all ${
            getButtonClass(index, q)
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>

  {/* Bottom Buttons */}
  <div className="mt-8 space-y-3">
    <button
      className="w-full bg-white dark:bg-[#1E1E1E] border border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900 transition-all"
      onClick={() => setIsCancelOpen(true)}
    >
      Cancel Test
    </button>
    <button
      className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md hover:bg-gray-900 dark:hover:bg-gray-200 transition-all"
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
    onSubmit={handleSubmit}
  />
</aside>


  );
}