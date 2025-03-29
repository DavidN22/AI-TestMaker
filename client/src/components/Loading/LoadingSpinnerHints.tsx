import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { triviaFacts } from "../../data/triviaFacts";

export default function LoadingWithTrivia() {
  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    setCurrentFact(triviaFacts[Math.floor(Math.random() * triviaFacts.length)]);

    const interval = setInterval(() => {
      setCurrentFact(triviaFacts[Math.floor(Math.random() * triviaFacts.length)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 px-4"
      style={{ backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/90 dark:bg-[#1E1E1E]/90" />

      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Trivia Fact */}
      <motion.p
        key={currentFact}
        className="mt-6 text-lg text-center font-medium text-gray-800 dark:text-gray-200 max-w-xl z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentFact}
      </motion.p>
    </motion.div>
  );
}
