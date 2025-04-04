import { motion } from "framer-motion";

export default function InlineSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <motion.div
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <motion.p
          className="mt-3 text-sm text-gray-700 dark:text-gray-300"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
