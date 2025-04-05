import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { Eye, CheckCircle, X } from "lucide-react";
import CustomCombobox from "./CustomCombobox";
import PreviewTest from "../../utils/PreviewTest";
import { PreviewData } from "@/Types/Question";
import InlineSpinner from "../Loading/InlineSpinner";
import { useApi } from "../../utils/api";
import { useCreateCustomTestMutation } from "../../store/Slices/customTestsApi";
import { Difficulty, TestCreation } from "@/Types/Tests";

interface CreateTestModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const difficultyOptions: Difficulty[] = [
  { level: "Beginner" },
  { level: "Intermediate" },
  { level: "Advanced" },
];

export default function CreateTestModal({
  isOpen,
  setIsOpen,
}: CreateTestModalProps) {
  const [testData, setTestData] = useState<TestCreation>({
    title: "",
    headline: "",
    description: "",
    difficulty: { level: "Beginner" },
    provider: "Custom",
  });

  const { getPreviewTest, loading } = useApi();
  const [isCreating, setIsCreating] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [createCustomTest] = useCreateCustomTestMutation();

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await createCustomTest(testData);
      setPreviewData(null);
      setIsOpen(false);
    } catch (err) {
      console.error("Error creating test:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create a Custom Test"
      size="custom"
    >
      <div className="flex flex-col justify-between h-full space-y-6 relative">
        {/* Loading Overlay for Create */}
        {isCreating && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 dark:bg-black/60 rounded-md">
            <InlineSpinner message="Creating your test..." />
          </div>
        )}

        {/* Preview Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <InlineSpinner message="Generating AI preview..." />
          </div>
        ) : previewData ? (
          <PreviewTest
            preview={previewData}
            onBack={() => setPreviewData(null)}
            onCreate={handleCreate}
          />
        ) : (
          <>
            {/* Form Fields */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Test Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cloud Mastery"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
                  value={testData.title}
                  onChange={(e) =>
                    setTestData({ ...testData, title: e.target.value })
                  }
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Headline (one-liner)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Basic cloud fundamentals"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
                  value={testData.headline}
                  onChange={(e) =>
                    setTestData({ ...testData, headline: e.target.value })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  placeholder="Brief summary of your test..."
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm resize-none focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
                  rows={3}
                  value={testData.description}
                  onChange={(e) =>
                    setTestData({ ...testData, description: e.target.value })
                  }
                />
              </div>

              <CustomCombobox
                label="Difficulty"
                options={difficultyOptions.map((option) => option.level)}
                selected={testData.difficulty.level}
                onChange={(value: Difficulty["level"]) =>
                  setTestData({ ...testData, difficulty: { level: value } })
                }
              />

              {/* Provider (readonly) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Provider
                </label>
                <input
                  type="text"
                  value="Custom"
                  disabled
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#2A2A2A] text-gray-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                disabled={isCreating}
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>

              <button
                disabled={isCreating}
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]"
                onClick={async () => {
                  const preview = await getPreviewTest({
                    ...testData,
                    difficulty: testData.difficulty.level,
                  });
                  setPreviewData(preview);
                }}
              >
                <Eye className="w-4 h-4" />
                Generate Preview
              </button>

              <button
                disabled={isCreating}
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                onClick={handleCreate}
              >
                <CheckCircle className="w-4 h-4" />
                Create
              </button>
            </div>
          </>
        )}
      </div>
    </ModalTemplate>
  );
}
