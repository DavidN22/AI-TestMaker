import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate.tsx";
import { Info, X, PlayIcon } from "lucide-react";
import { useApi } from "../../utils/api.ts";
import axios from "axios";
import CustomCombobox from "./CustomCombobox.tsx";
import LoadingWithTrivia from "../Loading/LoadingSpinnerHints.tsx";
import { tokenApiSlice } from "../../store/Slices/tokenSlice.ts";
import { useDispatch } from "react-redux";

interface TestConfigModalProps {
  setIsOpen: (isOpen: boolean) => void;
  testName: string;
  state: boolean;
  description: string;
}

export default function TestConfigModal({
  setIsOpen,
  state,
  testName,
  description,
}: TestConfigModalProps) {
  const [weakPointMode, setWeakPointMode] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const questionTypes = ["multiple choice", "select two", "true/false"];

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isTypeSelected = (type: string) => selectedTypes.includes(type);

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
        types: selectedTypes.length > 0 ? selectedTypes : questionTypes,
      });
      dispatch(tokenApiSlice.util.invalidateTags(["Tokens"]));

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

  const renderToggle = (enabled: boolean, onClick: () => void) => (
    <button
      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
        enabled ? "bg-neutral-700 dark:bg-neutral-300" : "bg-gray-300 dark:bg-gray-600"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  );

  return (
    <ModalTemplate
      isOpen={state}
      setIsOpen={setIsOpen}
      title={<span className="text-lg font-semibold">{testName} Settings</span>}
    >
      {loading && <LoadingWithTrivia />}

      <div className="space-y-5">

        {/* Weak Point Mode */}
        <div className="flex items-center justify-between border rounded-md p-3 dark:border-gray-700">
          <div className="flex items-center space-x-2 relative">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable Weak Point Mode
            </span>
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" />
              {showTooltip && (
                <div className="absolute bottom-full mb-2 w-56 max-w-xs p-2 text-xs text-white bg-neutral-800 rounded-md shadow-lg left-6 transform -translate-x-1/2">
                  If toggled, will generate questions you were weak on based on past tests.
                </div>
              )}
            </div>
          </div>
          {renderToggle(weakPointMode, () => setWeakPointMode(!weakPointMode))}
        </div>

        {/* Timer Toggle */}
        <div className="flex items-center justify-between border rounded-md p-3 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Timer
          </span>
          {renderToggle(timerEnabled, () => setTimerEnabled(!timerEnabled))}
        </div>

        {/* Time Limit Selector */}
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

        {/* Question Types Selector */}
        <div className="border rounded-md p-3 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Select Question Types
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {questionTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  isTypeSelected(type)
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            If no types are selected, all types will be included by default.
          </p>
        </div>
      </div>

      {/* Buttons */}
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
