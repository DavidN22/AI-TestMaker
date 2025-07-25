import { motion } from "framer-motion";
import { Hourglass } from "lucide-react";

export default function LoadingPlaceholder() {
  return (
    <>
   
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-[#1E1E1E]/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="text-gray-800 dark:text-gray-200"
          >
            <Hourglass className="w-8 h-8" />
          </motion.div>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Feature coming soon
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            Check back soon!
          </p>
        </div>
      </motion.div>
    </>
  );
}
