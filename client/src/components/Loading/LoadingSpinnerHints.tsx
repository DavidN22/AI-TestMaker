import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingWithTrivia() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

      {/* Timer */}
      <motion.div
        className="mt-6 text-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Generating your test...
        </p>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
          {formatTime(elapsedTime)}
        </p>
      </motion.div>
    </motion.div>
  );
}
