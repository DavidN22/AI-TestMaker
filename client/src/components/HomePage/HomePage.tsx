import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { motion } from "framer-motion";
import TestCard from "../Shared/TestCard";

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

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Burning the midnight oil?";
  }

  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">
      <div className="flex-1 flex flex-col items-center p-10">
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="w-full max-w-8xl bg-gray-50 dark:bg-[#2A2A2A] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 overflow-auto"
  style={{ height: "100vh" }}
>


          <motion.h1
            className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {greeting}
            {firstName && `, ${firstName}`}!
          </motion.h1>

          <motion.p
            className="text-md text-gray-700 dark:text-gray-400 mt-3 mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            Ready to challenge yourself with AI-curated tests?
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTests.map((test, index) => (
              <TestCard
                key={index}
                title={test.title}
                headline={test.headline}
                description={test.description}
                difficulty={test.difficulty}
                testId={test.test_id}
                showMenu={test.provider === "Custom"}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
