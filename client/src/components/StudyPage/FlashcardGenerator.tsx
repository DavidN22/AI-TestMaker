import { Sparkles, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "../../utils/useIsMobile";
import { useRef } from "react";

interface Test {
  test_id: string;
  title: string;
  date: string;
}

interface FlashcardGeneratorProps {
  mode: "ai" | "test";
  topic: string;
  selectedTest: string;
  weakPointsOnly: boolean;
  count: number;
  loading: boolean;
  recentTests: Test[];
  tokenCount: number;
  onTopicChange: (topic: string) => void;
  onTestChange: (testId: string) => void;
  onWeakPointsChange: (value: boolean) => void;
  onCountChange: (count: number) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export default function FlashcardGenerator({
  mode,
  topic,
  selectedTest,
  weakPointsOnly,
  count,
  loading,
  recentTests,
  tokenCount,
  onTopicChange,
  onTestChange,
  onWeakPointsChange,
  onCountChange,
  onGenerate,
  onBack,
}: FlashcardGeneratorProps) {
  const isAI = mode === "ai";
  const isMobile = useIsMobile(1024); // lg breakpoint
  const topicInputRef = useRef<HTMLTextAreaElement>(null);

  const handleExampleClick = (example: string) => {
    onTopicChange(example);
    
    // On mobile, scroll to the input box
    if (isMobile && topicInputRef.current) {
      setTimeout(() => {
        topicInputRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        topicInputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-57px)] py-12 px-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pb-8"
      >
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all mb-8 font-medium border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        >
          ← Back to options
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-8">
              <div className={`p-3 bg-gradient-to-br ${isAI ? 'from-blue-500 to-blue-600 shadow-blue-500/30' : 'from-purple-500 to-purple-600 shadow-purple-500/30'} rounded-xl shadow-lg`}>
                {isAI ? <Sparkles className="text-white" size={28} /> : <FileText className="text-white" size={28} />}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {isAI ? "AI Generation" : "From Your Tests"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isAI ? "Let AI create custom flashcards for any topic" : "Turn test results into study materials"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {isAI ? (
                /* AI Mode Form */
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      Your Topic
                    </label>
                    <textarea
                      ref={topicInputRef}
                      value={topic}
                      onChange={(e) => onTopicChange(e.target.value)}
                      placeholder="e.g., Python data structures, World War II, Organic Chemistry, React Hooks..."
                      className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
                      rows={6}
                    />
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Be specific and detailed for better flashcard quality. Include key concepts you want to master.</span>
                    </p>
                  </div>
                </>
              ) : (
                /* Test Mode Form */
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      Select Test
                    </label>
                    <select
                      value={selectedTest}
                      onChange={(e) => onTestChange(e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer"
                    >
                      <option value="">Choose a test...</option>
                      {recentTests.map((test) => (
                        <option key={test.test_id} value={test.test_id}>
                          {test.title} - {new Date(test.date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                    {recentTests.length === 0 && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>No tests found. Take a test first to generate flashcards from your results.</span>
                      </p>
                    )}
                  </div>

                  <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-700/30">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={weakPointsOnly}
                        onChange={(e) => onWeakPointsChange(e.target.checked)}
                        className="mt-1 w-5 h-5 text-purple-600 focus:ring-purple-500 rounded cursor-pointer"
                      />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                          <span>Focus on weak points</span>
                          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Target questions you got wrong to improve faster
                        </div>
                      </div>
                    </label>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                  Number of Cards: <span className={isAI ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"}>{count}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="5"
                  value={count}
                  onChange={(e) => onCountChange(Number(e.target.value))}
                  className={`w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer ${isAI ? 'accent-blue-600' : 'accent-purple-600'}`}
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">
                  <span>10 cards</span>
                  <span>25 cards</span>
                  <span>40 cards</span>
                </div>
              </div>

              <button
                onClick={onGenerate}
                disabled={(isAI && !topic.trim()) || (!isAI && !selectedTest) || loading || tokenCount < 1}
                className={`w-full py-5 bg-gradient-to-r ${isAI ? 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-blue-500/40' : 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/30 hover:shadow-purple-500/40'} text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    Generating Flashcards...
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      {isAI ? <Sparkles size={24} /> : <FileText size={24} />}
                      <span>Generate Flashcards</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold">1 Token</span>
                    </div>
                  </>
                )}
              </button>
              {tokenCount < 1 && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-start gap-2 font-medium">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>You're out of tokens. Tokens refresh every 2 days.</span>
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Info & Tips */}
          <div className="space-y-6">
            {isAI ? (
              /* AI Mode Info */
              <>
                {/* Example Topics */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    Example Topics
                  </h4>
                  {isMobile && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5 font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      Tap to use
                    </p>
                  )}
                  <div className="space-y-2">
                    {[
                      "JavaScript ES6 Features",
                      "French Revolution Timeline",
                      "Human Anatomy - Circulatory System",
                      "Machine Learning Basics",
                      "Spanish Verb Conjugations"
                    ].map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleExampleClick(example)}
                        className="w-full text-left px-4 py-3 bg-white dark:bg-gray-800/50 border border-blue-200 dark:border-blue-800/50 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md active:scale-[0.98] transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                          {example}
                        </span>
                        <ChevronRight className="w-4 h-4 text-blue-400 dark:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Pro Tips
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">1</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Include context and specifics in your topic for more accurate flashcards
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">2</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Start with 10-15 cards to keep sessions manageable and focused
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">3</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Review your flashcards multiple times for better retention
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">⚡</div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Instant AI</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">∞</div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Any Topic</div>
                  </div>
                </div>
              </>
            ) : (
              /* Test Mode Info */
              <>
                {/* Benefits */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Why Test-Based Learning?
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Personalized Learning</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Flashcards generated from your actual test results
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Target Weak Points</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Focus on areas where you need the most improvement
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">Efficient Study</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Build on knowledge gaps identified in your tests
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Study Tips */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Study Strategy
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    For best results:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Review within 24 hours of taking the test
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Focus on weak points first
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                      Repeat sessions until mastery
                    </li>
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">🎯</div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Targeted</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">📈</div>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Results</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
