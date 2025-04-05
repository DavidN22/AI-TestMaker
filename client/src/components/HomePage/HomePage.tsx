import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { motion } from "framer-motion";
import TestCard from "./TestCard";
import TestCardSkeleton from "../Loading/TestCardSkeleton";
import CreateTestModal from "../Modals/CreateTestModal";
import { useGetCustomTestsQuery } from "../../store/Slices/customTestsApi";

export default function HomePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const filteredTests = useSelector((state: RootState) => state.filter.filteredTests);
  const name = useSelector((state: RootState) => state.auth.fullName);

  const { data: customTests = [], isLoading } = useGetCustomTestsQuery();


  const firstName = name?.split(" ")[0]
    ? name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1).toLowerCase()
    : "";

  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour >= 5 && hour < 12) greeting = "Good morning ☀️";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon 🌤️";
  else if (hour >= 17 && hour < 22) greeting = "Good evening 🌙";
  else greeting = "Burning the midnight oil? 🦉";


  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">
      <div className="flex-1 flex flex-col items-center p-10 overflow-auto">
        <div className="w-full max-w-6xl text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {greeting}
            {firstName && `, ${firstName}`}!
          </motion.h1>

          <motion.p
            className="text-md text-gray-700 dark:text-gray-400 mt-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            Ready to challenge yourself with AI-curated tests?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
          {/* Static Tests */}
          {filteredTests.map((test, index) => (
            <TestCard
              key={`static-${test.id}-${index}`}
              title={test.title}
              headline={test.headline || test.headline}
              description={test.description || ""}
            />
          ))}

          {/* Skeletons for Custom Tests */}
          {isLoading &&
            Array.from({ length: 2 }).map((_, idx) => (
              <TestCardSkeleton key={`skeleton-${idx}`} />
            ))}

          {/* Custom Tests with Menu */}
          {!isLoading &&
          
              customTests.map((test, index) => (
                <TestCard
                  key={`${index}`}
                  title={test.title}
                  headline={test.headline || test.headline}
                  description={test.description || ""}
                  testId={test.test_id}
                  showMenu
                />
              ))}
       

          {/* Create Test Button */}
          <div
            onClick={() => setIsCreateModalOpen(true)}
            className="relative border border-dashed border-gray-400 dark:border-gray-600 
              rounded-xl p-6 shadow-md flex flex-col min-h-[220px] items-center justify-center 
              text-center transition-all duration-300 hover:shadow-lg group cursor-pointer 
              bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#2A2A2A] dark:via-[#1E1E1E] dark:to-[#2A2A2A]"
          >
            <span className="text-5xl text-blue-500 group-hover:scale-110 transition-transform">
              +
            </span>
            <h2 className="text-lg font-semibold mt-3 text-gray-800 dark:text-white">
              Create Test
            </h2>
          </div>
        </div>

        <CreateTestModal
          isOpen={isCreateModalOpen}
          setIsOpen={setIsCreateModalOpen}
        />

      </div>
    </div>
  );
}
