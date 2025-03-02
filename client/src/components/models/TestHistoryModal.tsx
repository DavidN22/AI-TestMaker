import ModalTemplate from "./ModalTemplate";
import { TestResults } from "@/Types/Results";

interface TestHistoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  testData: TestResults;
}

export default function TestHistoryModal({
  isOpen,
  setIsOpen,
  testData,
}: TestHistoryModalProps) {
  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Results for ${testData.title}`}
      size="xl"
      fullScreen={true}
    >
      <div className="flex flex-col h-full">
        {/* Test Summary */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Date: {testData.date}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Score: <span className="text-blue-500">{testData.score}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Correct: {testData.correctCount} | Wrong: {testData.wrongCount} |
            Unanswered: {testData.unansweredCount}
          </p>
        </div>

        {/* Scrollable Questions Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {testData.updatedQuizData.map((q, index) => {
            const wasAnswered = q.user_answer !== undefined && q.user_answer !== null;
            
            return (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
              >
                {/* Question Numbering */}
                <p className="font-semibold text-gray-900 dark:text-white">
                  {index + 1}. {q.question}
                </p>
                <div className="mt-2 space-y-1">
                  {Object.entries(q.answers).map(([key, value]) => {
                    const isCorrect = Array.isArray(q.correct_answer)
                      ? q.correct_answer.includes(key)
                      : q.correct_answer === key;
                    const isUserAnswer = Array.isArray(q.user_answer)
                      ? q.user_answer.includes(key)
                      : q.user_answer === key;

                    return (
                      <div
                        key={key}
                        className={`p-2 rounded-md ${
                          isCorrect
                            ? "bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-300"
                            : isUserAnswer
                            ? "bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                        }`}
                      >
                        {key.toUpperCase()}: {value}
                      </div>
                    );
                  })}
                </div>

                {/* Unanswered Indication */}
                {!wasAnswered && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    (You did not answer this question)
                  </p>
                )}

                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* ✅ Always Visible Close Button ✅ */}
        <div className="sticky bottom-0 p-4 w-full">
          <button
            className="w-full bg-gray-900 dark:bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-600"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}
