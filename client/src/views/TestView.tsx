import TestPage from "../components/TestPage/TestPage";
import { motion } from "framer-motion";
export default function TestView() {
  return (
<motion.div
  className="flex flex-col min-h-screen bg-white dark:bg-[#1E1E1E]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <TestPage />
</motion.div>

  );
}
