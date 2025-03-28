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
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Results for ${testData.title}`}
      size="xl"
      fullScreen={true}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Weak Points Section */}
        {testData.weak_points && (
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-4 text-sm text-red-700 dark:text-red-300 font-medium shadow-sm">
            <p>Weak Points: {testData.weak_points}</p>
          </div>
        )}

        {/* Test Summary */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow border border-gray-200 dark:border-neutral-700 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(testData.date)}
              </p>
              <p className="text-lg font-semibold text-black dark:text-white mt-1">
                Score: <span className="text-blue-500">{testData.score}</span>
              </p>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 mt-3 sm:mt-0">
              <p>
                ✅ Correct: <b>{testData.correct_count}</b> | ❌ Wrong:{" "}
                <b>{testData.wrong_count}</b> | ⏳ Unanswered:{" "}
                <b>{testData.unanswered_count}</b>
              </p>
            </div>
          </div>
          {testData.summary && (
            <p className="mt-3 text-sm text-gray-800 dark:text-gray-400 italic">
              {testData.summary}
            </p>
          )}
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto space-y-6 px-1 sm:px-2">
          {testData.quiz_data.map((q, index) => {
            const wasAnswered =
              q.user_answer !== undefined && q.user_answer !== null;

            return (
              <div
              key={index}
              className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-5"
            >
            
                <p className="text-base font-medium text-black dark:text-white mb-2">
                  {index + 1}. {q.question}
                </p>

                <div className="space-y-2">
                  {Object.entries(q.answers).map(([key, value]) => {
                    const isCorrect = Array.isArray(q.correct_answer)
                      ? q.correct_answer.includes(key)
                      : q.correct_answer === key;
                    const isUserAnswer = Array.isArray(q.user_answer)
                      ? q.user_answer.includes(key)
                      : q.user_answer === key;

                    const baseStyle =
                      "p-3 rounded-md text-sm transition-all border";
                    let variant = "";

                    if (isCorrect) {
                      variant =
                        "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700";
                    } else if (isUserAnswer) {
                      variant =
                        "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700";
                    } else {
                      variant =
                        "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-neutral-700";
                    }

                    return (
                      <div key={key} className={`${baseStyle} ${variant}`}>
                        <strong>{key.toUpperCase()}.</strong> {value}
                      </div>
                    );
                  })}
                </div>

                {!wasAnswered && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-2 italic">
                    You did not answer this question
                  </p>
                )}

                {q.explanation && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 bg-white dark:bg-[#1E1E1E] p-4 border-t border-gray-200 dark:border-neutral-700">

          <button
             className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-medium hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}
