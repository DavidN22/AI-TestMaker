import { Sparkles, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface FlashcardModeSelectorProps {
  onSelectMode: (mode: "ai" | "test") => void;
  onSwitchSection?: (section: "flashcards" | "chatbot" | null) => void;
}

export default function FlashcardModeSelector({ onSelectMode, onSwitchSection }: FlashcardModeSelectorProps) {
  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-57px)] py-8 px-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto pb-8">
        {/* Header with Back Button */}
        {onSwitchSection && (
          <button
            onClick={() => onSwitchSection(null)}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all mb-6 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Study Tools
          </button>
        )}
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mb-4 border border-blue-200/50 dark:border-blue-700/50">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">AI Flashcard Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Choose Your Learning Method
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform any topic into interactive flashcards with AI
            </p>
          </motion.div>
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* AI Generation Mode */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all"
            onClick={() => onSelectMode("ai")}
          >
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="text-blue-600 dark:text-blue-400" size={18} />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <Sparkles className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Describe any topic and let our AI instantly create comprehensive flashcards tailored to your learning needs.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Any subject, any complexity level
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant generation in seconds
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Customizable card count
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:underline">
                Start Generating →
              </span>
            </div>
          </motion.div>

          {/* Test-Based Mode */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-xl transition-all"
            onClick={() => onSelectMode("test")}
          >
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="text-purple-600 dark:text-purple-400" size={18} />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                From Your Tests
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Turn your test results into targeted study materials. Focus on weak points for maximum improvement.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Personalized to your performance
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Target weak points specifically
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Faster improvement on problem areas
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-sm group-hover:underline">
                Browse Tests →
              </span>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">⚡</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">Lightning Fast</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Generate in seconds</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">Highly Targeted</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Focus on what matters</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">🧠</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">AI-Powered</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Smart assistance</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl">∞</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">Unlimited Topics</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Study anything</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
