import TestCard from "./TestCard";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

export default function HomePage() {
  const filteredTests = useSelector(
    (state: RootState) => state.filter.filteredTests
  );
  const name = useSelector((state: RootState) => state.auth.fullName);

  const firstName = name?.split(" ")[0]
    ? name.split(" ")[0].charAt(0).toUpperCase() +
      name.split(" ")[0].slice(1).toLowerCase()
    : "";

  // Local time greeting
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning ☀️";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon 🌤️";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Good evening 🌙";
  } else {
    greeting = "Burning the midnight oil? 🦉";
  }

  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-10 overflow-auto">
        <div className="w-full max-w-6xl text-center">
          {/* Animated Greeting */}
          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {greeting}
            {firstName && `, ${firstName}`}!
          </motion.h1>

          {/* Animated Subtext */}
          <motion.p
            className="text-md text-gray-700 dark:text-gray-400 mt-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            Ready to challenge yourself with AI-curated tests?
          </motion.p>
        </div>

        {/* Grid Layout for Tests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
          {filteredTests.map((test, index) => (
            <TestCard
              key={index}
              title={test.title}
              description={test.description}
            />
          ))}
          {/* Create Your Own Test - Coming Soon Card */}
          <div
            className="relative bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-[#2A2A2A] dark:via-[#1E1E1E] dark:to-[#2A2A2A]
  border border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-6 shadow-md flex flex-col min-h-[220px] 
  items-center justify-center text-center transition-all duration-300 hover:shadow-lg group cursor-not-allowed"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl animate-pulse">🛠️</span>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Create Your Own Test
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 px-2">
                Customize challenges to match your skills. Coming soon!
              </p>
              <div className="mt-3 text-xs text-blue-500 dark:text-blue-400 italic opacity-70">
                Feature in development
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
