import { motion } from "framer-motion";

export default function LoadingSpinner({ message }: { message: string }) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white/90 dark:bg-[#1E1E1E]/90"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Message */}
      <motion.p
        className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
}
