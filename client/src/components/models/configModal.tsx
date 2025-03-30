import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate.tsx";
import { Info } from "lucide-react";
import { useApi } from "../../utils/api.ts";
import axios from "axios";
import CustomCombobox from "./CustomCombobox.tsx";
import LoadingWithTrivia from "../Loading/LoadingSpinnerHints.tsx";
import { useGetTokensQuery } from "../../store/Slices/tokenSlice";

interface TestConfigModalProps {
  setIsOpen: (isOpen: boolean) => void;
  testName: string;
  state: boolean;
}

export default function TestConfigModal({
  setIsOpen,
  state,
  testName,
}: TestConfigModalProps) {
  const [weakPointMode, setWeakPointMode] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const { fetchTest, loading } = useApi();
  const { refetch } = useGetTokensQuery();
  const handleStart = async () => {
    try {
      const questions = await fetchTest({
        testName,
        numQuestions,
        weakPointMode,
      });
      refetch();
      setTimeout(() => {
        navigate(`/test/${testName}`, {
          state: {
            testName,
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

  const numQuestionsList = [10, 20, 25, 30, 40, 45, 50];
  const timeLimitList = [5, 10, 15, 20, 30, 45, 60];

  return (
    <ModalTemplate
      isOpen={state}
      setIsOpen={setIsOpen}
      title={`${testName} Settings`}
    >
      {loading && <LoadingWithTrivia />}

      {/* Weak Point Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 relative">
          <span className="text-gray-700 dark:text-gray-300">
            Enable Weak Point Mode
          </span>
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" />
            {showTooltip && (
              <div className="absolute bottom-full mb-2 w-56 max-w-xs p-2 text-xs text-white bg-gray-700 rounded-md shadow-md left-6 sm:left-5 sm:right-0 transform sm:translate-x-0 translate-x-[-50%]">
                If toggled, will generate questions you were weak on based on
                past tests.
              </div>
            )}
          </div>
        </div>
        <button
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            weakPointMode ? "bg-blue-500" : "bg-gray-400"
          }`}
          onClick={() => setWeakPointMode(!weakPointMode)}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
              weakPointMode ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Timer Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Enable Timer</span>
        <button
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            timerEnabled ? "bg-blue-500" : "bg-gray-400"
          }`}
          onClick={() => setTimerEnabled(!timerEnabled)}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
              timerEnabled ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Time Limit Selector (if enabled) */}
      {timerEnabled && (
        <CustomCombobox
          label="Set Time Limit (minutes)"
          options={timeLimitList}
          selected={timeLimit}
          onChange={(value) => setTimeLimit(value)}
          displayValue={(value) => `${value} Minutes`}
        />
      )}

      {/* Number of Questions Selector */}
      <CustomCombobox
        label="Number of Questions"
        options={numQuestionsList}
        selected={numQuestions}
        onChange={(value) => setNumQuestions(value)}
        displayValue={(value) => `${value} Questions`}
      />

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleStart}
        >
          Start Test
        </button>
      </div>
    </ModalTemplate>
  );
}
