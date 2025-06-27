import CustomTestsPage from "../CustomTestsPage/CustomTestsPage";
import { motion } from "framer-motion";

// HomeView.tsx
export default function CustomPageView() {
  return (
    <div className="flex flex-col h-[calc(100vh-57px)] dark:bg-[#1E1E1E]">
      <motion.div
        className="flex flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
         
        <CustomTestsPage />
      </motion.div>
    </div>
  );
}

