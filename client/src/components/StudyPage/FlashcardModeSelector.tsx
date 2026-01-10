import { Sparkles, FileText, ArrowRight, History, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useGetFlashcardHistoryQuery } from "../../store/Slices/flashcardApi";

interface FlashcardModeSelectorProps {
  onSelectMode: (mode: "ai" | "test" | "history") => void;
  onSwitchSection?: (section: "flashcards" | "chatbot" | null) => void;
}

export default function FlashcardModeSelector({ onSelectMode, onSwitchSection }: FlashcardModeSelectorProps) {
  const { data: historyData, isLoading: loading } = useGetFlashcardHistoryQuery();
  const recentSets = historyData?.recent.slice(0, 3) || [];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };
  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-57px)] py-8 px-4 overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto pb-8">
        {/* Header with Back Button */}
        {onSwitchSection && (
          <button
            onClick={() => onSwitchSection(null)}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-800 rounded-lg transition-all mb-6 font-medium backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Study Tools
          </button>
        )}
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mb-4 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">AI Flashcard Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 pb-1 leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
              Choose Your Learning Method
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform any topic into interactive flashcards with AI
            </p>
          </motion.div>
        </div>

        {/* Main Content Area with Sidebar Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Primary Actions */}
          <div className="lg:col-span-2 space-y-6">

            {/* AI Generation Mode */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl transition-all"
            onClick={() => onSelectMode("ai")}
          >
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all">
                <ArrowRight className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                AI Generation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Describe any topic and let our AI instantly create comprehensive flashcards tailored to your learning needs.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Any subject, any complexity level</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Instant generation in seconds</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Customizable card count</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                Start Generating 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

          {/* Test-Based Mode */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-2xl transition-all"
            onClick={() => onSelectMode("test")}
          >
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all">
                <ArrowRight className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-105 transition-all">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                From Your Tests
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Turn your test results into targeted study materials. Focus on weak points for maximum improvement.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Personalized to your performance</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Target weak points specifically</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Faster improvement on problem areas</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-purple-600 dark:text-purple-400 font-bold group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                Browse Tests 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>
          </div>

          {/* Right Column - History & Favorites Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Recent History Section */}
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 sticky top-4">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your latest flashcard sets</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {loading ? (
                  // Loading skeleton
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 animate-pulse"
                    >
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))
                ) : recentSets.length > 0 ? (
                  recentSets.map((set) => (
                    <div
                      key={set.id}
                      onClick={() => onSelectMode("history")}
                      className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {set.title || set.topic || 'Untitled Set'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {set.flashcards.flashcards.length} cards • {formatTimeAgo(set.created_at)}
                          </p>
                        </div>
                        <ArrowRight className="text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex-shrink-0 transition-colors" size={16} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <History className="text-gray-400 dark:text-gray-500" size={20} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No flashcard sets yet
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Create your first set to see it here
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => onSelectMode("history")}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <History size={18} />
                View All History
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Favorites Preview */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Favorites</h4>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Save your best flashcard sets for quick access
                </p>
                <button
                  onClick={() => onSelectMode("history")}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center gap-1 group"
                >
                  Manage Favorites
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights - Updated positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Use AI Flashcards?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">Lightning Fast</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Generate comprehensive sets in seconds</p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">Highly Targeted</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Focus exactly on what you need to learn</p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">AI-Powered</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Smart content with deep understanding</p>
            </div>
            <div className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-2xl">∞</span>
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">Unlimited Topics</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Study any subject you can imagine</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
