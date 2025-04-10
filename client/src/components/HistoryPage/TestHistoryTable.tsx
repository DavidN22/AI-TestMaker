import SkeletonLoaderTable from "../Loading/SkeletonLoaderTable";
import { TestResults } from "@/Types/Results";
import { Trash2 } from "lucide-react";

type Props = {
  loading: boolean;
  testData: TestResults[];
  onView: (test: TestResults) => void;
  onDelete: (test: TestResults) => void;
  sortOrder: "recent" | "oldest";
  toggleSortOrder: () => void;
};

export default function TestHistoryTable({
  loading,
  testData,
  onView,
  onDelete,
  sortOrder,
  toggleSortOrder,
}: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-600";
    return "text-red-500";
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "easy") return "text-green-600";
    if (difficulty === "medium") return "text-yellow-700";
    if (difficulty === "hard") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="space-y-0">
      {/* Header row */}
      <div className="flex justify-between px-2 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        <div
          onClick={toggleSortOrder}
          className="w-1/5 cursor-pointer hover:underline"
        >
          Date {sortOrder === "recent" ? "↓" : "↑"}
        </div>
        <div className="w-1/4">Test Title</div>
        <div className="w-1/6">Score</div>
        <div className="w-1/5">Correct</div>
        <div className="w-1/6">Difficulty</div>
        <div className="w-1/6">Actions</div>
      </div>

      {loading ? (
        [...Array(2)].map((_, i) => (
          <div
            key={i}
            className="py-4 px-2 border-b border-gray-200 dark:border-gray-700"
          >
            <SkeletonLoaderTable />
          </div>
        ))
      ) : testData.length === 0 ? (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500">
          No test results found.
        </div>
      ) : (
        testData.map((test) => (
          <div
            key={test.test_id}
            onClick={() => onView(test)}
            className="flex items-center justify-between px-2 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] transition-colors cursor-pointer"
          >
            <div className="w-1/5 text-sm text-gray-700 dark:text-gray-300">
              {new Date(test.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="w-1/4 text-sm font-medium text-gray-900 dark:text-white">
              {test.title}
            </div>

            <div
              className={`w-1/6 text-sm font-semibold ${getScoreColor(
                parseFloat(test.score.toString().replace("%", ""))
              )}`}
            >
              {test.score}
            </div>

            <div className="w-1/5 text-sm text-gray-700 dark:text-gray-300">
              {test.correct_count} / {test.quiz_data.length}
            </div>

            <div
              className={`w-1/6 text-sm font-medium ${getDifficultyColor(
                test.difficulty
              )}`}
            >
              {test.difficulty}
            </div>

            <div
              className="w-1/6 flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                onClick={() => onView(test)}
                className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                View <span className="text-base">→</span>
              </span>
              <button
                onClick={() => onDelete(test)}
                className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
