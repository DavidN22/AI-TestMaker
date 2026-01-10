import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import FlashcardViewer from "./FlashcardViewer";
import FlashcardModeSelector from "./FlashcardModeSelector";
import FlashcardGenerator from "./FlashcardGenerator";
import FlashcardHistory from "./FlashcardHistory";
import { useGetTokensQuery, tokenApiSlice } from "../../store/Slices/tokenSlice";
import { flashcardApi } from "../../store/Slices/flashcardApi";

interface Flashcard {
  term: string;
  definition: string;
  highlights?: string[];
}

interface Test {
  test_id: string;
  title: string;
  date: string;
}

interface FlashcardsSectionProps {
  onSelectionChange?: (hasSelection: boolean) => void;
  onSwitchSection?: (section: "flashcards" | "chatbot" | null) => void;
}

export default function FlashcardsSection({ onSelectionChange, onSwitchSection }: FlashcardsSectionProps) {
  const [mode, setMode] = useState<"ai" | "test" | "history" | null>(null);
  const [topic, setTopic] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [weakPointsOnly, setWeakPointsOnly] = useState(false);
  const [count, setCount] = useState(10);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentTests, setRecentTests] = useState<Test[]>([]);
  const [showNoTokensModal, setShowNoTokensModal] = useState(false);
  const [previousMode, setPreviousMode] = useState<"ai" | "test" | "history" | null>(null);
  const apiBase = useSelector((state: RootState) => state.config.apiBase);
  const dispatch = useDispatch();
  const { data: tokenData } = useGetTokensQuery();

  // Notify parent when mode changes
  useEffect(() => {
    onSelectionChange?.(mode !== null);
  }, [mode, onSelectionChange]);

  // Fetch recent tests
  useEffect(() => {
    const fetchRecentTests = async () => {
      try {
        const response = await axios.get(`${apiBase}/db/tests`, {
          withCredentials: true,
        });
        
        // Filter to keep only the most recent test for each title
        const testsMap = new Map();
        response.data.forEach((test: Test) => {
          if (!testsMap.has(test.title) || new Date(test.date) > new Date(testsMap.get(test.title).date)) {
            testsMap.set(test.title, test);
          }
        });
        
        // Convert back to array and sort by date, take top 10
        const uniqueTests = Array.from(testsMap.values())
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);
        
        setRecentTests(uniqueTests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchRecentTests();
  }, [apiBase]);

  const generateFlashcardsFromAI = async () => {
    if (!topic.trim()) return;
    
    // Check if user has tokens
    const currentTokens = Number(tokenData?.token || 0);
    if (currentTokens < 1) {
      setShowNoTokensModal(true);
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiBase}/study/generateFlashcards`,
        { topic, count },
        { withCredentials: true }
      );
      setFlashcards(response.data.message.flashcards || []);
      setCurrentIndex(0);
      setIsFlipped(false);
      
      // Invalidate tokens to refetch updated count
      dispatch(tokenApiSlice.util.invalidateTags(['Tokens']));
      // Invalidate flashcard history to show new set
      dispatch(flashcardApi.util.invalidateTags(['FlashcardHistory']));
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateFlashcardsFromTest = async () => {
    if (!selectedTest) return;
    
    // Check if user has tokens
    const currentTokens = Number(tokenData?.token || 0);
    if (currentTokens < 1) {
      setShowNoTokensModal(true);
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiBase}/study/generateFlashcardsFromTest`,
        { testId: selectedTest, count, weakPointsOnly },
        { withCredentials: true }
      );
      setFlashcards(response.data.message.flashcards || []);
      setCurrentIndex(0);
      setIsFlipped(false);
      
      // Invalidate tokens to refetch updated count
      dispatch(tokenApiSlice.util.invalidateTags(['Tokens']));
      // Invalidate flashcard history to show new set
      dispatch(flashcardApi.util.invalidateTags(['FlashcardHistory']));
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const resetFlashcards = () => {
    setFlashcards([]);
    // Return to previous mode if it exists, otherwise go to mode selector
    if (previousMode) {
      setMode(previousMode);
      setPreviousMode(null);
    } else {
      setMode(null);
    }
    setTopic("");
    setSelectedTest("");
    setWeakPointsOnly(false);
    setCount(10);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleCardSelect = (index: number) => {
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const handleSelectFlashcardSet = (cards: Flashcard[]) => {
    setFlashcards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setPreviousMode(mode); // Save current mode before clearing
  };

  // No Tokens Modal Component
  const NoTokensModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
          Out of Tokens
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
          You don't have any tokens left to generate flashcards.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 text-center mb-6">
          Tokens refresh every 2 days. Check your token count in the header.
        </p>
        <button
          onClick={() => setShowNoTokensModal(false)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
        >
          Got it
        </button>
      </div>
    </div>
  );

  // Render appropriate component based on state
  if (flashcards.length > 0) {
    return (
      <FlashcardViewer
        flashcards={flashcards}
        currentIndex={currentIndex}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
        onNext={nextCard}
        onPrev={prevCard}
        onReset={resetFlashcards}
        onCardSelect={handleCardSelect}
      />
    );
  }

  if (mode === null) {
    return (
      <FlashcardModeSelector
        onSelectMode={setMode}
        onSwitchSection={onSwitchSection}
      />
    );
  }

  if (mode === "history") {
    return (
      <FlashcardHistory
        onSelectFlashcardSet={handleSelectFlashcardSet}
        onBack={() => setMode(null)}
      />
    );
  }

  return (
    <>
      {showNoTokensModal && <NoTokensModal />}
      <FlashcardGenerator
        mode={mode as "ai" | "test"}
        topic={topic}
        selectedTest={selectedTest}
        weakPointsOnly={weakPointsOnly}
        count={count}
        loading={loading}
        recentTests={recentTests}
        tokenCount={Number(tokenData?.token || 0)}
        onTopicChange={setTopic}
        onTestChange={setSelectedTest}
        onWeakPointsChange={setWeakPointsOnly}
        onCountChange={setCount}
        onGenerate={mode === "ai" ? generateFlashcardsFromAI : generateFlashcardsFromTest}
        onBack={() => setMode(null)}
      />
    </>
  );
}
