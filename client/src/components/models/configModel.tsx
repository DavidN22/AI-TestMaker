import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ModalTemplate from "./ModalTemplate";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { Info } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { showError } from "../../store/Slices/toastSlice";
import { fetchTest } from "../../utils/api.ts";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  

  const handleStart = async () => {
    setLoading(true);
    try {
      const questions = await fetchTest({ testName, numQuestions, weakPointMode });
      navigate(`/test/${testName}`, {
        state: {
          testName,
          timer: timerEnabled ? timeLimit * 60 : null,
          questions,
        },
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(showError(error.response.data.message));
      } else {
        dispatch(showError("An unexpected error occurred."));
      }
      setLoading(false);
      console.error("Error fetching test questions:", error);
    }
  };


  const numQuestionsList = [10, 20, 25, 30, 40, 45, 50];
  const timeLimitList = [0.1, 0.2, 0.5,5, 10, 15, 20, 30, 45, 60];

  return (
    <>
    
    
    <ModalTemplate
      isOpen={state}
      setIsOpen={setIsOpen}
      title={`${testName} Settings`}
    >  
       {loading && <LoadingSpinner message = "Generating your test" />}
      {/* Weak Point Mode Toggle */}
    
<div className="mt-4 flex items-center justify-between">
  <div className="flex items-center space-x-2 relative">
    <span className="text-gray-700 dark:text-gray-300">
      Enable Weak Point Mode
    </span>
    {/* Info Icon with Hover Tooltip */}
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Info className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" />
      {showTooltip && (
        <div
          className="absolute bottom-full mb-2 w-56 max-w-xs p-2 text-xs text-white bg-gray-700 rounded-md shadow-md
          left-6 sm:left-5 sm:right-0 transform sm:translate-x-0 translate-x-[-50%]"
        >
          If toggled, will generate questions you were weak on based on past tests.
        </div>
      )}
    </div>
  </div>


      {/* Toggle Button */}
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
      {timerEnabled && (
  <div className="mt-4 relative">
    <label className="block text-gray-700 dark:text-gray-300 mb-1">
      Set Time Limit (minutes)
    </label>
    <Combobox value={timeLimit} onChange={(value) => setTimeLimit(value as number)}>
      {({ open }) => ( // Get 'open' state
        <div className="relative">
          <Combobox.Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md flex justify-between items-center">
            <span>{timeLimit} Minutes</span>
            <ChevronDownIcon 
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} 
            />
          </Combobox.Button>

          {/* Smooth Transition Effect */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-60"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 max-h-60"
            leaveTo="opacity-0 max-h-0"
          >
            <Combobox.Options className="absolute w-full mt-1 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-50 max-h-60 overflow-y-auto scrollbar">
              {timeLimitList.map((num) => (
                <Combobox.Option
                  key={num}
                  value={num}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                >
                  {num} Minutes
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
  </div>
)}


      {/* Number of Questions Selector */}
      <div className="mt-4 relative">
      <label className="block text-gray-700 dark:text-gray-300 mb-1">
        Number of Questions
      </label>
      <Combobox value={numQuestions} onChange={(value) => setNumQuestions(value as number)}>
        {({ open }) => ( // Get the 'open' state from Combobox
          <div className="relative">
            <Combobox.Button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-md flex justify-between items-center">
              <span>{numQuestions} Questions</span>
              <ChevronDownIcon 
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
              />
            </Combobox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 max-h-0"
              enterTo="opacity-100 max-h-60"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 max-h-60"
              leaveTo="opacity-0 max-h-0"
            >
              <Combobox.Options className="absolute w-full mt-1 bg-white dark:bg-gray-700 shadow-md rounded-md border border-gray-300 dark:border-gray-600 p-2 space-y-1 z-50 max-h-60 overflow-y-auto scrollbar">
                {numQuestionsList.map((num) => (
                  <Combobox.Option
                    key={num}
                    value={num}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  >
                    {num} Questions
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        )}
      </Combobox>
    </div>
      {/* Submit & Cancel Buttons */}
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
    </>
  );
}
