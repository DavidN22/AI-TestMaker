import { useState } from "react";
import TestConfigModal from "../Modals/configModal";
import { Cloud, Landmark, Globe, BookOpen } from "lucide-react";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import ModalTemplate from "../Modals/ModalTemplate";
import { useDeleteCustomTestMutation } from "../../store/Slices/customTestsApi";
import InlineSpinner from "../Loading/InlineSpinner";
import { TestCardProps } from "@/Types/Tests";


const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("aws")) return <Cloud className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("azure")) return <Landmark className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("google")) return <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  return <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
};

export default function TestCard({ title, headline, description, showMenu = false, testId }: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCustomTest, { isLoading }] = useDeleteCustomTestMutation();

  const handleConfirmDelete = async () => {
    if (!testId) return;
    try {
      await deleteCustomTest(testId);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div
      className="relative bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-900 
      dark:hover:border-white cursor-pointer flex flex-col min-h-[220px] space-y-3 group"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Optional Ellipsis Menu */}
      {showMenu && (
        <Menu as="div" className="absolute top-3 right-3 z-10 text-left">
          <Menu.Button
            onClick={(e) => e.stopPropagation()}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDeleteModalOpen(true);
                    }}
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
      )}

      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <div>{getIcon(title)}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate group-hover:whitespace-normal">
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
        {headline}
      </p>

      {/* Start Button */}
      <button
        className="mt-auto bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium 
        px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Start Test →
      </button>

      {/* Config Modal */}
      <TestConfigModal
        testName={title}
        state={isModalOpen}
        description={description}
        setIsOpen={setIsModalOpen}
      />

      {/* Delete Confirmation Modal */}
      <ModalTemplate
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Delete Custom Test"
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[120px]">
            <InlineSpinner />
          </div>
        ) : (
          <>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this custom test? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </>
        )}
      </ModalTemplate>
    </div>
  );
}
