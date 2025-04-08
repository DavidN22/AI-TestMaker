import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "../ModalTemplate.tsx";
import { X, PlayIcon } from "lucide-react";
import { useApi } from "../../../utils/api.ts";
import axios from "axios";
import CustomCombobox from "../CustomCombobox.tsx";
import LoadingWithTrivia from "../../Loading/LoadingSpinnerHints.tsx";
import { tokenApiSlice } from "../../../store/Slices/tokenSlice.ts";
import { useDispatch } from "react-redux";
import WeakPointAndTimerToggles from "./WeakPointAndTimerToggles.tsx";
import QuestionTypeSelector from "./QuestionTypeSelector.tsx";

interface TestConfigModalProps {
  setIsOpen: (isOpen: boolean) => void;
  testName: string;
  state: boolean;
  description: string;
  difficulty: string;
  provider?: string;
}

export default function TestConfigModal({
  setIsOpen,
  state,
  testName,
  description,
  difficulty,
  provider
}: TestConfigModalProps) {
  const [weakPointMode, setWeakPointMode] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(5);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const numQuestionsList = [10, 20, 25, 30, 40, 45, 50];
  const timeLimitList = [5, 10, 15, 20, 30, 45, 60];
console.log(provider)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchTest, loading } = useApi();

  const handleStart = async () => {
    try {
      const questions = await fetchTest({
        testName,
        numQuestions,
        weakPointMode,
        description,
        difficulty: selectedDifficulty || difficulty,
        types:
          selectedTypes.length > 0
            ? selectedTypes
            : ["multiple choice", "select two", "true/false"],
      });

      dispatch(tokenApiSlice.util.invalidateTags(["Tokens"]));

      setTimeout(() => {
        navigate(`/test/${testName}`, {
          state: {
            testName,
            provider,
            timer: timerEnabled ? timeLimit * 60 : null,
            questions,
          },
        });
      }, 100);

      setIsOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setIsOpen(false);
      }
      console.error("Error fetching test questions:", error);
    }
  };

  return (
    <ModalTemplate
      isOpen={state}
      setIsOpen={setIsOpen}
      title={<span className="text-lg font-semibold">{testName} Settings</span>}
    >
      {loading && <LoadingWithTrivia />}

      <div className="space-y-5">
        <WeakPointAndTimerToggles
          weakPointMode={weakPointMode}
          setWeakPointMode={setWeakPointMode}
          timerEnabled={timerEnabled}
          setTimerEnabled={setTimerEnabled}
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
          timeLimitList={timeLimitList}
        />

        <CustomCombobox
          label="Number of Questions"
          options={numQuestionsList}
          selected={numQuestions}
          onChange={(value) => setNumQuestions(value)}
          displayValue={(value) => `${value} Questions`}
        />

        <CustomCombobox
          label="Select Difficulty"
          options={["Beginner", "Intermediate", "Advanced"]}
          selected={selectedDifficulty || difficulty}
          onChange={(value) => setSelectedDifficulty(value)}
          displayValue={(value) => value}
        />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          This will override the default difficulty for this test.
        </p>

        <QuestionTypeSelector
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>

      <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
          Cancel
        </button>

        <button
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          onClick={handleStart}
        >
          <PlayIcon className="w-4 h-4" />
          Start Test
        </button>
      </div>
    </ModalTemplate>
  );
}
