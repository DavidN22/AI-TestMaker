import { useState } from "react";
import { useGetCustomTestsQuery } from "../../store/Slices/customTestsApi";
import TestCard from "../Shared/TestCard";
import CreateTestModal from "../Modals/CreateTestModal/CreateTestModal";
import TestCardSkeleton from "../Loading/TestCardSkeleton";
import { motion } from "framer-motion";
import CustomSidebarFilter from "./CustomSidebarFilter";
import { useDispatch } from "react-redux";
import { setAllCustomTests } from "../../store/Slices/customFilterSlice";
import { useCustomFilters } from "../../utils/useCustomFilters";
import { useEffect } from "react";

export default function CustomTestsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: customTests = [], isLoading } = useGetCustomTestsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const dispatch = useDispatch();
  const { filteredCustomTests } = useCustomFilters();

  useEffect(() => {
    if (customTests.length > 0) {
      dispatch(setAllCustomTests(customTests));
    }
  }, [customTests, dispatch]);
  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">
      <CustomSidebarFilter />
      <div className="flex-1 flex flex-col items-center p-12 md:p-6 xl:p-18 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-8xl bg-gray-50 dark:bg-[#2A2A2A] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 overflow-auto"
          style={{ height: "100vh" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
            {isLoading &&
              Array.from({ length: 2 }).map((_, idx) => (
                <TestCardSkeleton key={`skeleton-${idx}`} />
              ))}

            {!isLoading &&
              filteredCustomTests.map((test, index) => (
                <TestCard
                  key={test.test_id || index}
                  title={test.title}
                  headline={test.headline}
                  description={test.description}
                  difficulty={test.difficulty}
                  testId={test.test_id}
                  showMenu={true}
                />
              ))}

            <div
              onClick={() => setIsCreateModalOpen(true)}
              className="relative cursor-pointer rounded-2xl p-6 flex flex-col min-h-[220px] items-center justify-center text-center
              transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] group 
              bg-white/10 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-gray-700"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 ease-in-out shadow-md">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mt-4 text-gray-800 dark:text-white">
                Create New Test
              </h2>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                Start a custom test powered by AI
              </p>
            </div>
          </div>

          <CreateTestModal
            isOpen={isCreateModalOpen}
            setIsOpen={setIsCreateModalOpen}
          />
        </motion.div>
      </div>
    </div>
  );
}
