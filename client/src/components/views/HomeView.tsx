import HomePage from "../HomePage/HomePage";
import Header from "../Header/Header";
import { motion } from "framer-motion";
import SidebarFilter from "../HomePage/SidebarFilter";
// HomeView.tsx
export default function HomeView() {
  return (
    <div className="flex flex-col h-screen dark:bg-[#1E1E1E]">
      <Header />
      {/* Sidebar Filter */}
   
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

