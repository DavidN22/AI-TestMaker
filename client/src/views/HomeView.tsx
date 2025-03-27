import HomePage from "../components/HomePage/HomePage";
import Header from "../components/Header/Header";
import { motion } from "framer-motion";
export default function HomeView() {



  return (
    <div className="flex flex-col h-screen">
      <Header />
      <motion.div
      className="flex flex-1 overflow-hidden"
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in smoothly
      exit={{ opacity: 0 }} // Fade out smoothly
      transition={{ duration: 0.5, ease: "easeInOut" }} // Fast but subtle transition
    >
      <HomePage />
    </motion.div>
    </div>
  );
}
