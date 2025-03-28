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
      {/* Question */}
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-8">
        {question}
      </h2>

      {/* Answer Choices */}
      <div className="space-y-4">
        {Object.entries(answers).map(([key, value]) => {
          const isSelected = select_two
            ? Array.isArray(selectedAnswer) && selectedAnswer.includes(key)
            : selectedAnswer === key;

          return (
            <label
              key={key}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all cursor-pointer border-2 ${
                isSelected
                  ? "border-black dark:border-white bg-gray-100 dark:bg-neutral-800"
                  : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-gray-400 dark:hover:border-neutral-500"
              }`}
            >
              {/* Custom Checkbox / Radio */}
              <div
                className={`h-5 w-5 flex items-center justify-center transition-all ${
                  select_two ? "rounded-sm" : "rounded-full"
                } border-2 ${
                  isSelected
                    ? "border-black dark:border-white bg-black dark:bg-white"
                    : "border-gray-400 dark:border-gray-600"
                }`}
              >
                <input
                  type={select_two ? "checkbox" : "radio"}
                  name="answer"
                  value={key}
                  className={`appearance-none w-full h-full cursor-pointer ${
                    select_two ? "" : "rounded-full"
                  }`}
                  checked={isSelected}
                  onChange={() => onAnswerSelect(key)}
                />
                {/* Subtle Checkmark */}
                {select_two && isSelected && (
                  <span className="text-white dark:text-black text-sm font-bold leading-none">
                    ✓
                  </span>
                )}
              </div>

              {/* Answer Text */}
              <span className="text-sm sm:text-base text-black dark:text-white">
                {value}
              </span>
            </label>
          );
        })}
      </div>

      {/* Hint Section */}
      {showHint && (
        <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-600 text-gray-900 dark:text-white rounded-md text-sm sm:text-base">
          <span className="font-semibold">Hint: </span> {hint}
        </div>
      )}
    </div>
  );
}
