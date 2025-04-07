// components/Modals/CreateTestForm.tsx
import { CreateTest } from "@/Types/Tests";
import CustomCombobox from "../CustomCombobox";

interface CreateTestFormProps {
  testData: CreateTest;
  setTestData: (data: CreateTest) => void;
  errors?: {
    title?: string;
    description?: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{ title?: string; description?: string }>>;
}

const titleLengthLimit = 35;
const headlineLengthLimit = 60;
const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

export default function CreateTestForm({
  testData,
  setTestData,
  errors,
  setErrors,
}: CreateTestFormProps) {
  return (
    <div className="space-y-6">
{/* Title */}
<div>
  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
    Test Name <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    placeholder="e.g. Cloud Mastery"
    className={`w-full px-3 py-2 rounded-md border ${
      errors?.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white"
    } bg-white dark:bg-[#2A2A2A] text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-[1.5px]`}
    value={testData.title}
    onChange={(e) => {
      if (e.target.value.length <= titleLengthLimit) {
        setTestData({ ...testData, title: e.target.value });
        if (errors?.title) {
          setErrors((prev) => ({ ...prev, title: undefined }));
        }
      }
    }}
    
    required
  />
  <div
    className={`text-xs mt-1 ${
      testData.title.length >= titleLengthLimit
        ? "text-red-500"
        : "text-gray-500 dark:text-gray-400"
    }`}
  >
    {testData.title.length}/{titleLengthLimit}
  </div>
  {errors?.title && (
    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
  )}
</div>

{/* Headline */}
<div>
  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
    Headline (one-liner)
  </label>
  <input
    type="text"
    placeholder="e.g. Basic cloud fundamentals"
    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
    value={testData.headline}
    onChange={(e) => {
      if (e.target.value.length <= headlineLengthLimit) {
        setTestData({ ...testData, headline: e.target.value });
      }
    }}
  />
  <div
    className={`text-xs mt-1 ${
      testData.headline.length >= headlineLengthLimit
        ? "text-red-500"
        : "text-gray-500 dark:text-gray-400"
    }`}
  >
    {testData.headline.length}/{headlineLengthLimit}
  </div>
</div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Brief summary of your test..."
          className={`w-full px-3 py-2 rounded-md border ${
            errors?.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white"
          } bg-white dark:bg-[#2A2A2A] text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-[1.5px]`}
          rows={3}
          value={testData.description}
          onChange={(e) => {
            setTestData({ ...testData, description: e.target.value });
            if (errors?.description) {
              setErrors((prev) => ({ ...prev, description: undefined }));
            }
          }}
          
        />
        {errors?.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* Difficulty Combobox */}
      <CustomCombobox
        label="Difficulty"
        options={difficultyOptions}
        selected={testData.difficulty}
        onChange={(value) => setTestData({ ...testData, difficulty: value })}
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
  );
}
