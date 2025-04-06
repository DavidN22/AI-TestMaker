import { useState } from "react";
import TestHistoryModal from "../Modals/TestHistoryModal";
import ModalTemplate from "../Modals/ModalTemplate";
import { useDeleteTestResultMutation } from "../../store/Slices/apiSlice";
import { TestResults } from "@/Types/Results";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Cloud, Landmark, Globe, BookOpen } from "lucide-react";

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("aws")) return <Cloud className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("azure")) return <Landmark className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("google")) return <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  return <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export default function TestResultCard({
  testData,
  setFilteredHistory,
}: {
  testData: TestResults;
  setFilteredHistory: React.Dispatch<React.SetStateAction<TestResults[]>>;
}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [deleteTest] = useDeleteTestResultMutation();

  const handleCardClick = () => {
    if (!isDropdownOpen) {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className="relative group bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500 
      dark:hover:border-blue-400 cursor-pointer flex flex-col min-h-[200px] space-y-3"
      onClick={handleCardClick}
    >
      {/* 3-dot menu */}
      <Menu as="div" className="absolute top-3 right-3 z-10 text-left">
  <Menu.Button
    onClick={(e) => e.stopPropagation()}
    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
  >
    <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
  </Menu.Button>

  <Menu.Items
    onClick={(e) => e.stopPropagation()}
    className="absolute right-0 mt-2 w-32 origin-top-right bg-white dark:bg-[#2C2C2C] 
               border border-gray-200 dark:border-gray-600 divide-y divide-gray-100 dark:divide-gray-700 
               rounded-md shadow-lg focus:outline-none z-50"
  >
    <div className="px-1 py-1">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={() => setIsConfirmDeleteOpen(true)}
            className={`${
              active
                ? "bg-gray-100 dark:bg-gray-700 text-red-700"
                : "text-red-600"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            Delete
          </button>
        )}
      </Menu.Item>
    </div>
  </Menu.Items>
</Menu>


      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
      <div>{getIcon(testData.title)}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-ellipsis">
          {testData.title}
        </h2>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {formatDate(testData.date)}
      </p>

      {/* Score & Accuracy */}
      <div className="text-sm text-gray-700 dark:text-gray-400">
        <p className="font-semibold text-gray-900 dark:text-white">
          Score: <span className="text-blue-500">{testData.score}</span>
        </p>
        <p>
          {testData.correct_count} / {testData.quiz_data.length} correct
        </p>
      </div>

      {/* View Details Button */}
      <button
        className="cursor-pointer mt-auto bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium 
        px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-600"
      >
        View Results →
      </button>

      {/* Modal for result details */}
      <TestHistoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        testData={testData}
      />

      {/* Confirmation Modal for delete */}
      <ModalTemplate
        isOpen={isConfirmDeleteOpen}
        setIsOpen={setIsConfirmDeleteOpen}
        title="Confirm Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this test result? This action cannot
          be undone.
        </p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsConfirmDeleteOpen(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => {
              setFilteredHistory((prev) =>
                prev.filter((test) => test.test_id !== testData.test_id)
              );
              setIsConfirmDeleteOpen(false);
              deleteTest(testData.test_id);
            }}
          >
            Yes, Delete
          </button>
        </div>
      </ModalTemplate>
    </div>
  );
}
