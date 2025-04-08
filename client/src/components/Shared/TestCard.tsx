import { useState } from "react";
import TestConfigModal from "../Modals/ConfigModal/configModal";
import { Cloud, Landmark, Globe, BookOpen } from "lucide-react";
import ModalTemplate from "../Modals/ModalTemplate";
import { useDeleteCustomTestMutation, useUpdateCustomTestMutation } from "../../store/Slices/customTestsApi";
import InlineSpinner from "../Loading/InlineSpinner";
import { TestCardProps, CreateTest } from "@/Types/Tests";
import CreateTestModal from "../Modals/CreateTestModal/CreateTestModal";
import TestCardMenu from "./TestCardMenu";
import { useRef } from "react";

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("aws"))
    return <Cloud className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("azure"))
    return <Landmark className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("google"))
    return <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  return <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
};

export default function TestCard({
  title,
  difficulty,
  headline,
  description,
  showMenu = false,
  testId,
}: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCustomTest, { isLoading }] = useDeleteCustomTestMutation();
  const [updateCustomTest] = useUpdateCustomTestMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTestData, setEditTestData] = useState<CreateTest | null>(null);
  const skipNextClickRef = useRef(false);


  const handleCardClick = () => {
    if (skipNextClickRef.current) {
      skipNextClickRef.current = false;
      return;
    }
    setIsModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!testId) return;
    try {
      await deleteCustomTest(testId);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTestData({
      title,
      headline,
      description,
      difficulty: difficulty || "Intermediate",
      provider: "Custom",
    });
    setIsEditModalOpen(true);
  };

  return (
<div
  className="relative bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
  rounded-xl p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-900 
  dark:hover:border-white cursor-pointer flex flex-col min-h-[180px] space-y-1.5 group"


    
      onClick={handleCardClick}
    >
      {showMenu && (
        <TestCardMenu
        onEdit={handleEdit}
        onDelete={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        skipNextClickRef={skipNextClickRef}
      />
      
      )}

{/* Title section */}
<div className="flex items-center gap-3 min-w-0 h-[40px]">
  <div>{getIcon(title)}</div>
  <h2 className="text-base font-semibold text-gray-900 dark:text-white tracking-wide line-clamp-2">

    {title}
  </h2>
</div>

{/* Headline section */}
<p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed line-clamp-2 h-[48px] mt-1">

  {headline}
</p>




      {difficulty && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Difficulty: {difficulty}
        </p>
      )}

      <button
        className="mt-auto bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium 
        px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Start Test →
      </button>

      <TestConfigModal
        testName={title}
        state={isModalOpen}
        description={description}
        setIsOpen={setIsModalOpen}
        difficulty={difficulty || ""}
      />

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
              Are you sure you want to delete this custom test? This action
              cannot be undone.
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

      {editTestData && (
        <CreateTestModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          initialData={editTestData}
          isEditing
          onUpdate={async (updatedData) => {
            try {
              if (testId) {
              await updateCustomTest({ testId, updatedData });
              }
              setIsEditModalOpen(false);
            } catch (err) {
              console.error("Failed to update test:", err);
            }
            }}
          />
          )}
    </div>
  );
}
