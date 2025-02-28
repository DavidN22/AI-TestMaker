import { Question } from "@/Types/Question";

interface TestQuestionProps {
  questionData: Question;
  selectedAnswer?: string | string[];
  onAnswerSelect: (answer: string) => void;
  showHint: boolean;
}
export default function TestQuestion({
  questionData,
  selectedAnswer,
  onAnswerSelect,
  showHint,
}: TestQuestionProps) {
  const { question, answers, select_two, hint } = questionData;
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {question}
      </h2>

      {/* Answer Choices */}
      <div className="space-y-3">
        {Object.entries(answers).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center space-x-3 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
          >
            <input
              type={select_two ? "checkbox" : "radio"}
              name="answer"
              value={key}
              checked={
                select_two
                  ? Array.isArray(selectedAnswer) &&
                    selectedAnswer.includes(key) // Multi-select
                  : selectedAnswer === key // Single-select
              }
              onChange={() => onAnswerSelect(key)}
              className="h-5 w-5 text-blue-500"
            />
            <span className="text-gray-900 dark:text-white">{value}</span>
          </label>
        ))}
      </div>

      {/* Hint Section */}
      {showHint && (
        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-600 text-gray-900 dark:text-white rounded-md">
          <span className="font-medium">Hint: </span> {hint}
        </div>
      )}
    </div>
  );
}
