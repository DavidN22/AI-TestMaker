import { useState } from "react";
import TestHistoryModal from "../Modals/TestHistoryModal";
import { TestResultCardProps } from "@/Types/Results";

const getEmoji = (title: string) => {
  if (title.toLowerCase().includes("aws")) return "☁️";
  if (title.toLowerCase().includes("azure")) return "🔷";
  if (title.toLowerCase().includes("google")) return "🌍";
  return "📚";
};
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
};
export default function TestResultCard({ testData }: TestResultCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="group relative bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
    rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500 
    dark:hover:border-blue-400 cursor-pointer flex flex-col min-h-[200px] space-y-3"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl">{getEmoji(testData.title)}</span>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-ellipsis">
          {testData.title}
        </h2>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {formatDate(testData.date)}
      </p>

      {/* Score & Accuracy */}
      <div className="text-sm text-gray-700 dark:text-gray-400">
        <p className="font-semibold text-gray-900 dark:text-white">
          Score: <span className="text-blue-500">{testData.score}</span>
        </p>
        <p>
          {testData.correct_count} / {testData.quiz_data.length} correct
        </p>
      </div>

      {/* View Details Button */}
      <button
        className="cursor-pointer mt-auto bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium 
      px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-600"
      >
        View Results →
      </button>

      {/* Modal for Full Test History */}
      <TestHistoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        testData={testData}
      />
    </div>
  );
}
