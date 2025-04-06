import { Question } from "@/Types/Question";


interface PreviewTestProps {
  questions: Question[];
  onBack: () => void;
  onCreate: () => void;
}

export default function PreviewTest({ questions, onBack, onCreate }: PreviewTestProps) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
      {questions.map((q, index) => (
        <div key={index} className="border rounded-lg p-4 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-2">
            {index + 1}. {q.question}
          </h3>
          <ul className="space-y-1 text-sm">
            {Object.entries(q.answers).map(([key, value]) => (
              <li key={key}>
                <span
                  className={
                    q.correct_answer.includes(key) ? "text-green-600 font-medium" : ""
                  }
                >
                  {key}. {value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            <strong>Hint:</strong> {q.hint}
            <br />
            <strong>Explanation:</strong> {q.explanation}
          </p>
          {q.select_two && (
            <p className="text-xs italic mt-1 text-yellow-600">* Select two answers</p>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#333]"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="text-sm px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          onClick={onCreate}
        >
          Create Test
        </button>
      </div>
    </div>
  );
}
