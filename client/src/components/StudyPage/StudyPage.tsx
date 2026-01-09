import { useState } from "react";
import FlashcardsSection from "./FlashcardsSection";
import StudyChatbotSection from "./StudyChatbotSection";
import { GraduationCap, MessageSquare, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudyPage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "chatbot" | null>(null);

  const flashcardFeatures = [
    "Generate flashcards from any topic instantly",
    "Create flashcards from your past test results",
    "Focus on weak points to improve faster",
    "Interactive flip-to-reveal learning"
  ];

  const chatbotFeatures = [
    "Ask questions about any topic",
    "Get instant explanations and clarifications",
    "Personalized learning assistance 24/7",
    "Deep dive into complex concepts"
  ];

  const handleTabSwitch = (tab: "flashcards" | "chatbot" | null) => {
    setActiveTab(tab);
  };

  // Show selection cards when no tab is active
  const showSelectionCards = activeTab === null;

  return (
    <div className="min-h-[calc(100vh-3.6rem)] overflow-y-auto bg-white dark:bg-[#1E1E1E]">
      {showSelectionCards ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mb-4 border border-blue-200/50 dark:border-blue-700/50">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Study Tools
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Accelerate your learning with intelligent flashcards and AI tutoring
            </p>
          </motion.div>

          {/* Tab Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Flashcards Tab */}
            <button
              onClick={() => setActiveTab("flashcards")}
              className="relative group text-left rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  AI Flashcards
                </h3>
                
                <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
                  Smart flashcards for efficient memorization
                </p>
                
                <ul className="space-y-2">
                  {flashcardFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </button>

            {/* Chatbot Tab - Coming Soon (Disabled) */}
            <div
              className="relative text-left rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 opacity-75 cursor-not-allowed"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Coming Soon
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-600 dark:text-gray-400">
                  Study Assistant
                </h3>
                
                <p className="text-sm mb-4 text-gray-500 dark:text-gray-500">
                  Your personal AI tutor, available anytime
                </p>
                
                <ul className="space-y-2">
                  {chatbotFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-500">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Stats and Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">∞</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Unlimited Topics</div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">⚡</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Instant Generation</div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">🎯</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Adaptive Learning</div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">🧠</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">AI-Powered</div>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800/30 dark:to-blue-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              How Study Tools Work
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Choose Your Method</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Select between AI-generated flashcards or test-based learning focused on your weak points.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">AI Creates Content</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our AI analyzes your topic or test results to generate personalized study materials.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Study & Master</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Review interactive flashcards or chat with the AI tutor to reinforce your knowledge.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "flashcards" ? (
                <FlashcardsSection 
                  onSelectionChange={() => {}}
                  onSwitchSection={handleTabSwitch}
                />
              ) : (
                <StudyChatbotSection 
                  onSwitchSection={handleTabSwitch}
                  currentSection={activeTab!}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
