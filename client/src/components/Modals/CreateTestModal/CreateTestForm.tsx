// components/Modals/CreateTestForm.tsx
import {CreateTest } from "@/Types/Tests";
import CustomCombobox from "../CustomCombobox";

interface CreateTestFormProps {
  testData: CreateTest;
  setTestData: (data: CreateTest) => void;
}

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

export default function CreateTestForm({ testData, setTestData }: CreateTestFormProps) {
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
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
          value={testData.title}
          onChange={(e) => setTestData({ ...testData, title: e.target.value })}
          required
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
          onChange={(e) => setTestData({ ...testData, headline: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Brief summary of your test..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2A2A2A] text-sm resize-none focus:outline-none focus:ring-[1.5px] focus:ring-black dark:focus:ring-white"
          rows={3}
          value={testData.description}
          onChange={(e) => setTestData({ ...testData, description: e.target.value })}
        />
      </div>

      {/* Difficulty Combobox */}
      <CustomCombobox
        label="Difficulty"
        options={difficultyOptions.map((option) => option)}
        selected={testData.difficulty}
        onChange={(value) =>
          setTestData({ ...testData, difficulty: value })
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
  );
}
