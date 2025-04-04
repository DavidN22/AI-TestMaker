import ModalTemplate from "./ModalTemplate";
import { useState } from "react";
import { Eye, CheckCircle, X } from "lucide-react";
import CustomCombobox from "./CustomCombobox";
import PreviewTest from "./PreviewTest";
import { PreviewData } from "@/Types/Question";
import InlineSpinner from "../Loading/InlineSpinner"; 

interface CreateTestModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const mockAIResponse: PreviewData = {
  questions: [
    {
      question_number: 1,
      question: "What is the purpose of Amazon S3?",
      answers: {
        a: "Compute service",
        b: "Object storage service",
        c: "Relational database",
        d: "Monitoring tool",
      },
      correct_answer: ["b"],
      hint: "It's designed for storing and retrieving any amount of data.",
      explanation: "Amazon S3 is an object storage service used for storing and retrieving data.",
    },
    {
      question_number: 2,
      question: "AWS Lambda is a type of serverless compute service. True or False?",
      answers: {
        a: "True",
        b: "False",
      },
      correct_answer: ["a"],
      hint: "It's commonly used to run code without provisioning servers.",
      explanation: "AWS Lambda is a serverless compute service that runs your code in response to events.",
    },
    {
      question_number: 3,
      question: "Which two AWS services are commonly used for serverless applications?",
      answers: {
        a: "Amazon EC2",
        b: "AWS Lambda",
        c: "Amazon RDS",
        d: "Amazon S3",
        e: "Amazon Route 53",
      },
      correct_answer: ["b", "d"],
      select_two: true,
      hint: "One handles compute, the other handles storage.",
      explanation: "AWS Lambda and Amazon S3 are often used together in serverless applications.",
    },
  ],
};

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

export default function CreateTestModal({ isOpen, setIsOpen }: CreateTestModalProps) {
  const [testData, setTestData] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    provider: "Custom",
  });

  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Create a Custom Test" size="custom">
      <div className="flex flex-col justify-between h-full space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
             <InlineSpinner message="Generating AI preview..." />
          </div>
        ) : previewData ? (
          <PreviewTest
            preview={previewData}
            onBack={() => setPreviewData(null)}
            onCreate={() => {
              console.log("Final Test Data:", testData, previewData);
              setIsOpen(false);
            }}
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
                  onChange={(e) => setTestData({ ...testData, title: e.target.value })}
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
                  onChange={(e) => setTestData({ ...testData, description: e.target.value })}
                />
              </div>

              {/* Difficulty */}
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>

              <button
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setPreviewData(mockAIResponse);
                    setLoading(false);
                  }, 1500);
                }}
              >
                <Eye className="w-4 h-4" />
                Generate Preview
              </button>

              <button
                className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                onClick={() => {
                  console.log("Create Test:", testData);
                  setIsOpen(false);
                }}
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
