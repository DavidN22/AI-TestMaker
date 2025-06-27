import { useState, useRef } from "react";
import TestHistoryModal from "../Modals/TestHistoryModal";
import ModalTemplate from "../Modals/ModalTemplate";
import { useDeleteTestResultMutation } from "../../store/Slices/apiSlice";
import { TestResults } from "@/Types/Results";
import { Cloud, Landmark, Globe, BookOpen } from "lucide-react";
import DeleteTestMenuItem from "./DeleteTestMenuItem";
import {getDateKey} from "../StatsPage/Charts/dateUtils";

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("aws"))
    return <Cloud className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("azure"))
    return <Landmark className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("google"))
    return <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  return <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return getDateKey(date);
};

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "easy") return "text-green-600";
  if (difficulty === "medium") return "text-yellow-700";
  if (difficulty === "hard") return "text-red-600";
  return "text-gray-500";
};

export default function TestResultCard({
  testData,
  setFilteredHistory,
}: {
  testData: TestResults;
  setFilteredHistory: React.Dispatch<React.SetStateAction<TestResults[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [deleteTest] = useDeleteTestResultMutation();
  const skipNextClickRef = useRef(false);

  const handleCardClick = () => {
    if (skipNextClickRef.current) {
      skipNextClickRef.current = false;
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div
      className="relative group bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500 
      dark:hover:border-blue-400 cursor-pointer flex flex-col min-h-[200px] space-y-3"
      onClick={handleCardClick}
    >
      {/* 3-dot menu */}
      <DeleteTestMenuItem
        onDelete={() => setIsConfirmDeleteOpen(true)}
        skipNextClickRef={skipNextClickRef}
      />

      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <div>{getIcon(testData.title)}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-ellipsis">
          {testData.title}
        </h2>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {formatDate(testData.date)}
      </p>

      {/* Score, Accuracy, Difficulty */}
      <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          Score: <span className="text-blue-500">{testData.score}</span>
        </p>
        <p>
          {testData.correct_count} / {testData.quiz_data.length} correct
        </p>
        <p className={`capitalize font-medium ${getDifficultyColor(testData.difficulty)}`}>
          Difficulty: {testData.difficulty}
        </p>
      </div>

      {/* View Details Button */}
      <button
        className="cursor-pointer mt-auto bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium 
        px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-600"
      >
        View Results →
      </button>

      {/* Modal for result details */}
      <TestHistoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        testData={testData}
      />

      {/* Confirmation Modal for delete */}
      <ModalTemplate
        isOpen={isConfirmDeleteOpen}
        setIsOpen={setIsConfirmDeleteOpen}
        title="Confirm Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this test result? This action cannot
          be undone.
        </p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsConfirmDeleteOpen(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => {
              setFilteredHistory((prev) =>
                prev.filter((test) => test.test_id !== testData.test_id)
              );
              setIsConfirmDeleteOpen(false);
              deleteTest(testData.test_id);
            }}
          >
            Yes, Delete
          </button>
        </div>
      </ModalTemplate>
    </div>
  );
}
