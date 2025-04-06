import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { motion } from "framer-motion";
import TestCard from "./TestCard";

export default function HomePage() {
  const filteredTests = useSelector(
    (state: RootState) => state.filter.filteredTests
  );
  const name = useSelector((state: RootState) => state.auth.fullName);

  const firstName = name?.split(" ")[0]
    ? name.split(" ")[0].charAt(0).toUpperCase() +
      name.split(" ")[0].slice(1).toLowerCase()
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
          {/* Render both Static and Custom tests from filteredTests */}
          {filteredTests.map((test, index) => (
            <TestCard
              key={`${index}`}
              title={test.title}
              headline={test.headline}
              description={test.description}
              testId={test.test_id} // testId exists only on custom tests
              showMenu={test.provider === "Custom"} // Show menu only for custom tests
            />
          ))}
        </div>
      </div>
    </div>
  );
}
