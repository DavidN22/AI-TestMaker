import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FlashcardViewer from "./FlashcardViewer";
import FlashcardModeSelector from "./FlashcardModeSelector";
import FlashcardGenerator from "./FlashcardGenerator";

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
  const [mode, setMode] = useState<"ai" | "test" | null>(null);
  const [topic, setTopic] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [weakPointsOnly, setWeakPointsOnly] = useState(false);
  const [count, setCount] = useState(10);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentTests, setRecentTests] = useState<Test[]>([]);
  const apiBase = useSelector((state: RootState) => state.config.apiBase);

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
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateFlashcardsFromTest = async () => {
    if (!selectedTest) return;
    
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
    setMode(null);
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

  return (
    <FlashcardGenerator
      mode={mode}
      topic={topic}
      selectedTest={selectedTest}
      weakPointsOnly={weakPointsOnly}
      count={count}
      loading={loading}
      recentTests={recentTests}
      onTopicChange={setTopic}
      onTestChange={setSelectedTest}
      onWeakPointsChange={setWeakPointsOnly}
      onCountChange={setCount}
      onGenerate={mode === "ai" ? generateFlashcardsFromAI : generateFlashcardsFromTest}
      onBack={() => setMode(null)}
    />
  );
}
