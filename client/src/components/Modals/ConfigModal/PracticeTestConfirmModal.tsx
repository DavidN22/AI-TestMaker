import { useState, useEffect } from "react";
import ModalTemplate from "../ModalTemplate";
import CustomCombobox from "../CustomCombobox";
import { AlertCircle, Zap, Clock } from "lucide-react";

interface PracticeTestConfirmModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: (selectedModel: string) => void;
  onCancel: () => void;
}

export default function PracticeTestConfirmModal({
  isOpen,
  setIsOpen,
  onConfirm,
  onCancel,
}: PracticeTestConfirmModalProps) {
  const modelOptions = ["gpt-5.1", "gemini", "deepseek"];
  const [selectedModel, setSelectedModel] = useState("gpt-5.1");

  useEffect(() => {
    // Always default to gpt-5.1 for practice tests
    setSelectedModel("gpt-5.1");
  }, [isOpen]);

  const modelInfo: Record<string, { label: string; speed: string; description: string }> = {
    "gpt-5.1": {
      label: "GPT-5.1 (Smartest)",
      speed: "~3 minutes",
      description: "Highest quality questions with advanced reasoning"
    },
    gemini: {
      label: "Gemini (Fastest)",
      speed: "",
      description: "Quick generation with good quality"
    },
    deepseek: {
      label: "Deepseek",
      speed: "",
      description: "Balanced speed and quality"
    },
  };

  const handleConfirm = () => {
    onConfirm(selectedModel);
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Practice Test Confirmation"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header with icon */}
        <div className="flex items-start gap-4 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Practice Test Mode
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              You're about to start a full practice test with 65 questions, 90 minutes, and Intermediate difficulty.
            </p>
          </div>
        </div>

        {/* Warning about GPT-5.1 */}
        <div className="flex items-start gap-4 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-semibold text-amber-900 dark:text-amber-100 mb-2">
              Using Our Smartest AI Model
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              I recommend GPT-5.1 for practice tests. It generates the highest quality questions but may take up to 3 minutes to complete.
            </p>
          </div>
        </div>

        {/* Model Selection */}
        <div className="space-y-4">
          <CustomCombobox
            label="Select AI Model"
            options={modelOptions}
            selected={selectedModel}
            onChange={setSelectedModel}
            displayValue={(value) => modelInfo[value]?.label || value}
          />
          
          {/* Model info display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {modelInfo[selectedModel]?.speed && (
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Estimated time: {modelInfo[selectedModel]?.speed}</span>
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {modelInfo[selectedModel]?.description}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            className="text-sm px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
            onClick={handleConfirm}
          >
            <Zap className="w-4 h-4" />
            Start Practice Test
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
}
