import { motion } from "framer-motion";
import Header from "../Header/Header";

export default function LoadingPlaceholder() {
  return (
    <>
      <Header />
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-1 overflow-hidden items-center justify-center">
          <p className="text-lg font-semibold text-gray-700">
            Feature not yet added
          </p>
        </div>
      </motion.div>
    </>
  );
}
