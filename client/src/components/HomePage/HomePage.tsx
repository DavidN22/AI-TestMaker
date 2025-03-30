import TestCard from "./TestCard";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import SidebarFilter from "./SidebarFilter";
import { motion } from "framer-motion";

export default function HomePage() {
  const filteredTests = useSelector(
    (state: RootState) => state.filter.filteredTests
  );
  const name = useSelector(
    (state: RootState) => state.auth.fullName
  );

  const firstName = name?.split(" ")[0] 
    ? name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[0].slice(1).toLowerCase() 
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
    <div className="flex flex-1 overflow-hidden bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">

      {/* Sidebar */}
      <SidebarFilter />

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
            {greeting}{firstName && `, ${firstName}`}!
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
          {filteredTests.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              description={test.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
