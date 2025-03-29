import { motion } from "framer-motion";
import Header from "../Header/Header";

export default function LoadingPlaceholder() {
  return (
    <>
      <Header />
      <motion.div
  className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-[#0e0e0e]/90 backdrop-blur-md"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  <div className="flex flex-1 overflow-hidden items-center justify-center">
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
      Feature coming soon!
    </p>
  </div>
</motion.div>

    </>
  );
}
