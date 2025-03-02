import HistoryPage from '../components/HistoryPage/HistoryPage';
import Header from "../components/Header/Header";
import { motion } from "framer-motion";

export default function HistoryView() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <motion.div
      className="flex flex-col h-screen"
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
