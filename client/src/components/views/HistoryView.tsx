import HistoryPage from '../HistoryPage/HistoryPage';
import Header from "../Header/Header";
import { motion } from "framer-motion";

export default function HistoryView() {
  return (
    <div className="flex flex-col h-screen dark:bg-[#1E1E1E]">
      <Header />
      <motion.div
      
      className="flex flex-1 overflow-hidden"
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in smoothly
      exit={{ opacity: 0 }} // Fade out smoothly
      transition={{ duration: 0.5, ease: "easeInOut" }} // Fast but subtle transition
    >
      <HistoryPage />
    </motion.div>
    </div>
  );
}
