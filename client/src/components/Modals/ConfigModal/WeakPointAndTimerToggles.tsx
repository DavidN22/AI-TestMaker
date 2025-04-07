import { Info } from "lucide-react";
import { useState } from "react";
import CustomCombobox from "../../Modals/CustomCombobox";

interface WeakPointAndTimerTogglesProps {
  weakPointMode: boolean;
  setWeakPointMode: (val: boolean) => void;
  timerEnabled: boolean;
  setTimerEnabled: (val: boolean) => void;
  timeLimit: number;
  setTimeLimit: (val: number) => void;
  timeLimitList: number[];
}

export default function WeakPointAndTimerToggles({
  weakPointMode,
  setWeakPointMode,
  timerEnabled,
  setTimerEnabled,
  timeLimit,
  setTimeLimit,
  timeLimitList,
}: WeakPointAndTimerTogglesProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderToggle = (enabled: boolean, onClick: () => void) => (
    <button
      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition ${
        enabled
          ? "bg-neutral-700 dark:bg-neutral-300"
          : "bg-gray-300 dark:bg-gray-600"
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
    <>
      {/* Weak Point Toggle */}
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
                If toggled, will generate questions you were weak on based on
                past tests.
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

      {/* Time Limit Dropdown */}
      {timerEnabled && (
        <CustomCombobox
          label="Set Time Limit (minutes)"
          options={timeLimitList}
          selected={timeLimit}
          onChange={(value) => setTimeLimit(value)}
          displayValue={(value) => `${value} Minutes`}
        />
      )}
    </>
  );
}
