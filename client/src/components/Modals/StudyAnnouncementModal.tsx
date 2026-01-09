import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, GraduationCap, Brain, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyAnnouncementModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function StudyAnnouncementModal({
  isOpen,
  setIsOpen,
}: StudyAnnouncementModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTryNow = () => {
    setIsOpen(false);
    navigate("/study");
  };

  return (
    <Dialog as="div" open={isOpen} className="relative z-50" onClose={handleClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 backdrop-blur-sm duration-200 ease-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full"
            >
              <DialogPanel className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {/* Header with Gradient */}
                <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 pb-12">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white">NEW FEATURE</span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      AI-Powered Study Tools
                    </h2>
                    <p className="text-lg text-white/90">
                      Master any topic with intelligent flashcards designed just for you
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 -mt-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg mb-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Generated</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Create flashcards on any topic instantly with AI
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                          <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Test-Based</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Generate from your test results to target weak points
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-3">
                          <Zap className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Flip cards to reveal answers and track progress
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800/30">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        How It Works
                      </h4>
                      <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                          <span>Choose between AI-generated flashcards or test-based learning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
                          <span>Enter your topic or select a past test to analyze</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-pink-600 dark:text-pink-400">3.</span>
                          <span>Study with interactive flashcards designed for your needs</span>
                        </li>
                      </ol>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleTryNow}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-5 h-5" />
                      Try Study Tools Now
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
}
