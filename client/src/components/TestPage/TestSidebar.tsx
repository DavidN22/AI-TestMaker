import { useState, useEffect, useRef } from "react";
import CancelTest from "../Modals/CancelTestModal";
import SubmitTest from "../Modals/SubmitTestModal";
import { Question } from "../../Types/Question";
import { CheckCircle, Circle, AlertTriangle } from "lucide-react";


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

  const getQuestionIcon = (
    question: { user_answer?: string | string[]; select_two?: boolean }
  ) => {
    if (
      question.select_two &&
      Array.isArray(question.user_answer) &&
      question.user_answer.length === 1
    ) {
      return <AlertTriangle className="text-yellow-500 w-4 h-4" />;
    } else if (isQuestionAnswered(question.user_answer, question.select_two)) {
      return <CheckCircle className="text-green-500 w-4 h-4" />;
    } else {
      return <Circle className="text-gray-400 w-4 h-4" />;
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
      className={`flex flex-col items-center justify-center text-xs font-semibold py-2 rounded-md transition-all border ${
        index === currentIndex
          ? "border-black dark:border-white"
          : "border-gray-300 dark:border-gray-600"
      }`}
    >
      <span>{index + 1}</span>
      {getQuestionIcon(q)}
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