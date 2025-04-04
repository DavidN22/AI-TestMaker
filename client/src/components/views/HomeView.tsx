import HomePage from "../HomePage/HomePage";
import { motion } from "framer-motion";
import SidebarFilter from "../HomePage/SidebarFilter";
// HomeView.tsx
export default function HomeView() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] dark:bg-[#1E1E1E]">
      <motion.div
        className="flex flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
           <SidebarFilter />
        <HomePage />
      </motion.div>
    </div>
  );
}

