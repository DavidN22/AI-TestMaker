import { ChevronLeft, ChevronRight, ArrowLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToggleIndividualFavoriteMutation, useCheckIndividualFavoriteMutation } from "../../store/Slices/flashcardApi";

interface Flashcard {
  term: string;
  definition: string;
  highlights?: string[];
}

interface FlashcardViewerProps {
  flashcards: Flashcard[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onCardSelect: (index: number) => void;
}

export default function FlashcardViewer({
  flashcards,
  currentIndex,
  isFlipped,
  onFlip,
  onNext,
  onPrev,
  onReset,
  onCardSelect,
}: FlashcardViewerProps) {
  const [favoriteStates, setFavoriteStates] = useState<boolean[]>([]);
  const [toggleIndividualFavorite] = useToggleIndividualFavoriteMutation();
  const [checkIndividualFavorite] = useCheckIndividualFavoriteMutation();

  const currentCard = flashcards[currentIndex];

  // Check favorite status for all flashcards on mount
  useEffect(() => {
    const checkFavorites = async () => {
      const states = await Promise.all(
        flashcards.map(async (card) => {
          try {
            const response = await checkIndividualFavorite({
              term: card.term,
              definition: card.definition,
            }).unwrap();
            return response.isFavorite;
          } catch (error) {
            return false;
          }
        })
      );
      setFavoriteStates(states);
    };

    if (flashcards.length > 0) {
      checkFavorites();
    }
  }, [flashcards]);

  const toggleFavorite = async () => {
    try {
      const response = await toggleIndividualFavorite({
        term: currentCard.term,
        definition: currentCard.definition,
        highlights: currentCard.highlights,
      }).unwrap();

      // Update local state
      const newStates = [...favoriteStates];
      newStates[currentIndex] = response.isFavorite;
      setFavoriteStates(newStates);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Helper function to render text with highlights
  const renderHighlightedText = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) {
      return <span>{text}</span>;
    }

    const parts: { text: string; isHighlighted: boolean }[] = [];
    let lastIndex = 0;

    // Sort highlights by their position in the text (longest first to avoid partial matches)
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
    const positions: { start: number; end: number; highlight: string }[] = [];

    // Find all positions of highlights
    sortedHighlights.forEach(highlight => {
      const lowerText = text.toLowerCase();
      const lowerHighlight = highlight.toLowerCase();
      let index = lowerText.indexOf(lowerHighlight);
      
      while (index !== -1) {
        // Check if this position overlaps with existing highlights
        const overlaps = positions.some(
          pos => (index >= pos.start && index < pos.end) || (index + highlight.length > pos.start && index < pos.end)
        );
        
        if (!overlaps) {
          positions.push({ start: index, end: index + highlight.length, highlight });
        }
        
        index = lowerText.indexOf(lowerHighlight, index + 1);
      }
    });

    // Sort positions by start index
    positions.sort((a, b) => a.start - b.start);

    // Build the parts array
    positions.forEach(({ start, end }) => {
      if (start > lastIndex) {
        parts.push({ text: text.substring(lastIndex, start), isHighlighted: false });
      }
      parts.push({ text: text.substring(start, end), isHighlighted: true });
      lastIndex = end;
    });

    if (lastIndex < text.length) {
      parts.push({ text: text.substring(lastIndex), isHighlighted: false });
    }

    return (
      <>
        {parts.map((part, index) => 
          part.isHighlighted ? (
            <mark key={index} className="bg-yellow-200 dark:bg-yellow-600/40 text-gray-900 dark:text-white px-1 rounded font-semibold">
              {part.text}
            </mark>
          ) : (
            <span key={index}>{part.text}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-57px)] py-2 sm:py-4 px-3 sm:px-4 lg:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header Section */}
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-1.5">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Active Study Session</span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Card {currentIndex + 1} <span className="text-gray-400 dark:text-gray-500">of</span> {flashcards.length}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleFavorite}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 transition-all shadow-sm border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 min-h-[44px]"
                title={favoriteStates[currentIndex] ? "Remove from favorites" : "Add to favorites"}
              >
                <motion.div
                  animate={{
                    scale: favoriteStates[currentIndex] ? [1, 1.3, 1] : 1,
                    rotate: favoriteStates[currentIndex] ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Star
                    size={20}
                    className={favoriteStates[currentIndex] ? "fill-yellow-400 text-yellow-400 drop-shadow-md" : "text-gray-400 group-hover:text-yellow-500"}
                  />
                </motion.div>
                {favoriteStates[currentIndex] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-lg border-2 border-yellow-400"
                  />
                )}
              </motion.button>
              <button
                onClick={onReset}
                className="flex items-center justify-center p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm border border-gray-200 dark:border-gray-700 min-h-[44px]"
                title="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout - Sidebar + Flashcard */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-3 sm:gap-4 lg:gap-6 h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] lg:h-[calc(100vh-180px)]">
          {/* Sidebar - Card List */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                All Cards
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{flashcards.length} total</p>
            </div>
            <div className="overflow-y-auto h-[calc(100%-80px)] p-3 space-y-2">
              {flashcards.map((card, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => onCardSelect(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    idx === currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                      idx === currentIndex
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold line-clamp-2 ${
                        idx === currentIndex ? "text-white" : "text-gray-900 dark:text-white"
                      }`}>
                        {card.term}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Flashcard Area */}
          <div className="flex flex-col">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden mb-2 sm:mb-3 lg:mb-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
              ></div>
            </div>

            {/* Flashcard Container */}
            <div className="flex-1 flex flex-col min-h-0 relative" style={{ perspective: "1000px" }}>
              {/* Desktop Navigation Arrows */}
              <button
                onClick={onPrev}
                className="hidden lg:flex items-center justify-center w-10 h-16 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all shadow-md border border-gray-200 dark:border-gray-700 absolute left-8 top-1/2 -translate-y-1/2 z-10"
                aria-label="Previous card"
              >
                <ChevronLeft size={28} strokeWidth={2.5} />
              </button>

              <motion.div
                className="relative w-full flex-1 cursor-pointer touch-manipulation lg:max-w-4xl lg:mx-auto"
                onClick={onFlip}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of Card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-50/50 to-indigo-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="px-2.5 py-1 sm:px-3 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wide">
                      Term
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full overflow-y-auto">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white text-center px-3 sm:px-6 leading-tight break-words">
                      {flashcards[currentIndex].term}
                    </h3>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center px-3">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      <span className="hidden xs:inline">Click to reveal definition</span>
                      <span className="xs:hidden">Tap to reveal</span>
                    </p>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-50 via-purple-50/50 to-pink-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800 border-2 border-purple-200 dark:border-purple-800 rounded-xl sm:rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="px-2.5 py-1 sm:px-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full uppercase tracking-wide">
                      Definition
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full overflow-y-auto">
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900 dark:text-white text-center leading-relaxed px-3 sm:px-6 break-words">
                      {renderHighlightedText(flashcards[currentIndex].definition, flashcards[currentIndex].highlights)}
                    </p>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 flex justify-center px-3">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 sm:gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      <span className="hidden xs:inline">Click to flip back</span>
                      <span className="xs:hidden">Tap to flip</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <button
                onClick={onNext}
                className="hidden lg:flex items-center justify-center w-10 h-16 rounded-lg bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-sm text-white hover:from-blue-600 hover:to-purple-600 hover:scale-110 active:scale-95 transition-all shadow-md absolute right-8 top-1/2 -translate-y-1/2 z-10"
                aria-label="Next card"
              >
                <ChevronRight size={28} strokeWidth={2.5} />
              </button>
            </div>

            {/* Mobile Progress Dots */}
            <div className="flex lg:hidden justify-center gap-1.5 sm:gap-2 my-2 sm:my-3 overflow-x-auto pb-2 px-4">
              {flashcards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onCardSelect(idx)}
                  className={`h-2.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0 py-5 sm:py-0 ${
                    idx === currentIndex
                      ? "w-10 sm:w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                      : "w-2.5 sm:w-2 bg-gray-300 dark:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500"
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
              <button
                onClick={onPrev}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all font-semibold shadow-md border border-gray-200 dark:border-gray-700 min-h-[48px] sm:min-h-0"
              >
                <ChevronLeft size={20} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              <button
                onClick={onNext}
                className="flex items-center justify-center gap-2 px-6 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all font-semibold shadow-lg shadow-blue-500/30 min-h-[48px] sm:min-h-0"
              >
                Next
                <ChevronRight size={20} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
