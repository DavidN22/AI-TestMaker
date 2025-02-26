import TestPage from "../components/TestPage/TestPage";
import { motion } from "framer-motion";
export default function TestView() {
  return (
    <motion.div
      className="flex flex-col h-screen"
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in smoothly
      exit={{ opacity: 0 }} // Fade out smoothly
      transition={{ duration: 0.5, ease: "easeInOut" }} // Fast but subtle transition
    >
      <TestPage />
    </motion.div>
  );
}
