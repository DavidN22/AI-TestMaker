import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import data from "../../data.json";
import ModalTemplate from "./ModalTemplate";

interface TestConfigModalProps {
  setIsOpen: (isOpen: boolean) => void;
  testName: string;
  state: boolean;
}

export default function TestConfigModal({ setIsOpen, state, testName }: TestConfigModalProps) {
  const [weakPointMode, setWeakPointMode] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(5);
  
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/test`, {
      state: {
        testName,
        timer: timerEnabled ? timeLimit * 60 : null,
        questions: data.questions,
      },
    });
    setIsOpen(false);
  };

  const numQuestionsList = [10, 20, 25, 30, 40, 45, 50];
  const timeLimitList = [5, 10, 15, 20, 30, 45, 60];

  return (
    <ModalTemplate isOpen={state} setIsOpen={setIsOpen} title={`${testName} Settings`}>
      {/* Weak Point Mode Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Enable Weak Point Mode</span>
        <button
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${weakPointMode ? "bg-blue-500" : "bg-gray-400"}`}
          onClick={() => setWeakPointMode(!weakPointMode)}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${weakPointMode ? "translate-x-6" : ""}`} />
        </button>
      </div>

      {/* Timer Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Enable Timer</span>
        <button
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${timerEnabled ? "bg-blue-500" : "bg-gray-400"}`}
          onClick={() => setTimerEnabled(!timerEnabled)}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${timerEnabled ? "translate-x-6" : ""}`} />
        </button>
      </div>

      {/* Number of Questions Selector */}
      <div className="mt-4 relative">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Number of Questions</label>
        <Combobox value={numQuestions} onChange={(value) => setNumQuestions(value as number)}>
          <div className="relative">
            <Combobox.Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md flex justify-between items-center">
              <span>{numQuestions} Questions</span>
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </Combobox.Button>
            <Transition as="div">
              <Combobox.Options className="absolute w-full mt-1 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-50 max-h-70 overflow-y-auto scrollbar">
                {numQuestionsList.map((num) => (
                  <Combobox.Option key={num} value={num} className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                    {num} Questions
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>

      {/* Time Limit Selector */}
      {timerEnabled && (
        <div className="mt-4 relative">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Set Time Limit (minutes)</label>
          <Combobox value={timeLimit} onChange={(value) => setTimeLimit(value as number)}>
            <div className="relative">
              <Combobox.Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md flex justify-between items-center">
                <span>{timeLimit} Minutes</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              </Combobox.Button>
              <Transition as="div">
                <Combobox.Options className="absolute w-full mt-1 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-50 max-h-70 overflow-y-auto scrollbar">
                  {timeLimitList.map((num) => (
                    <Combobox.Option key={num} value={num} className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                      {num} Minutes
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}

      {/* Submit & Cancel Buttons */}
      <div className="mt-6 flex justify-between">
        <button onClick={() => setIsOpen(false)} className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
        <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleStart}>Start Test</button>
      </div>
    </ModalTemplate>
  );
}
