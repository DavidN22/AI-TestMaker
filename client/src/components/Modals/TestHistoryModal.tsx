import ModalTemplate from "./ModalTemplate";
import { TestResults } from "@/Types/Results";

interface TestHistoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  testData: TestResults | null;
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

  if (!testData) return null;

  const isAnswerCorrect = (key: string, correct: string | string[]) => {
    return Array.isArray(correct) ? correct.includes(key) : correct === key;
  };

  const isUserAnswer = (key: string, answer: string | string[] | null | undefined) => {
    if (answer === null || answer === undefined) return false;
    return Array.isArray(answer) ? answer.includes(key) : answer === key;
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
        {/* Weak Points */}
        {testData.weak_points && (
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg mb-4 text-sm text-red-700 dark:text-red-300 font-medium shadow-sm">
            <strong>Weak Points:</strong> {testData.weak_points}
          </div>
        )}

        {/* Test Summary */}
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow border border-gray-200 dark:border-neutral-700 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(testData.date)}
              </p>
              <p className="text-xl font-semibold text-black dark:text-white mt-1">
                Score: <span className="text-blue-500">{testData.score}</span>
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-700 dark:text-gray-300">
              <p>
                ✅ Correct: <strong>{testData.correct_count}</strong> | ❌ Wrong:{" "}
                <strong>{testData.wrong_count}</strong> | ⏳ Unanswered:{" "}
                <strong>{testData.unanswered_count}</strong>
              </p>
            </div>
          </div>
          {testData.summary && (
            <p className="mt-3 text-sm italic text-gray-800 dark:text-gray-400">
              {testData.summary}
            </p>
          )}
        </div>

        {/* Questions */}
        <div className="flex-1 overflow-y-auto space-y-6 px-1 sm:px-2">
          {testData.quiz_data.map((q, index) => {
            const wasAnswered = q.user_answer !== undefined && q.user_answer !== null;

            return (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-neutral-700 rounded-xl shadow p-5"
              >
                <p className="text-base font-medium text-black dark:text-white mb-3">
                  {index + 1}. {q.question}
                </p>

                <div className="space-y-3">
                  {Object.entries(q.answers).map(([key, value]) => {
                    const correct = isAnswerCorrect(key, q.correct_answer);
                    const selected = isUserAnswer(key, q.user_answer);

                    const baseStyle = "p-3 rounded-md text-sm border";

                    let variant = "";
                    if (correct && selected) {
                      variant =
                        "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 border-green-400 dark:border-green-600";
                    } else if (correct && !selected) {
                      variant =
                        "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700";
                    } else if (!correct && selected) {
                      variant =
                        "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700";
                    } else {
                      variant =
                        "bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-neutral-700";
                    }

                    return (
                      <div key={key} className={`${baseStyle} ${variant}`}>
                        <strong>{key.toUpperCase()}.</strong> {value}
                        {selected && correct && (
                          <span className="ml-2 font-semibold">(Your Answer ✅)</span>
                        )}
                        {selected && !correct && (
                          <span className="ml-2 font-semibold">(Your Answer ❌)</span>
                        )}
                        {!selected && correct && (
                          <span className="ml-2 font-semibold">(Correct Answer)</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {!wasAnswered && (
                  <p className="text-sm text-red-500 dark:text-red-400 italic mt-3">
                    ⏳ You did not answer this question
                  </p>
                )}

                {q.explanation && (
                  <div className="mt-4 bg-gray-50 dark:bg-neutral-800 p-3 rounded text-xs text-gray-600 dark:text-gray-400 italic border border-gray-200 dark:border-neutral-700">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 bg-white dark:bg-[#1E1E1E] p-4 border-t border-gray-200 dark:border-neutral-700">
          <button
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-md font-semibold hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}
