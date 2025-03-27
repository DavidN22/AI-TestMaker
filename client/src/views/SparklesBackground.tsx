// SparklesBackground.tsx
import { motion } from 'framer-motion';

export const SparklesCore = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 2 }}
    >
      <div className="absolute w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
    </motion.div>
  );
};
