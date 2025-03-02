import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Animated Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Loading Text with Dots Animation */}
      <motion.p
        className="mt-4 text-lg font-semibold text-gray-700"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Generating Your Quiz<span className="dots">...</span>
      </motion.p>
    </div>
  );
}
