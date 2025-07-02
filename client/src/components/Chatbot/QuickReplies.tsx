import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateLastMessage } from "../../store/Slices/chatHistorySlice";
import { RootState } from "../../store/store";
import { quickReplies } from "./quickRepliesData";

interface QuickRepliesProps {
  endRef: React.RefObject<HTMLDivElement>;
  resetKey?: number;
}

const QuickReplies = ({ endRef, resetKey }: QuickRepliesProps) => {
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatHistory.messages);

  useEffect(() => {
    // Removed setUsedQuestions as it's no longer needed
  }, [resetKey]);

  const handleQuickReply = (question: string, answer: string) => {
    dispatch(addMessage({ role: "user", text: question }));
    dispatch(addMessage({ role: "bot", text: "", loading: true }));

    setTimeout(() => {
      dispatch(updateLastMessage({ loading: false, text: answer }));
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  const visibleReplies = quickReplies.filter(
    (item) =>
      !messages.some(
        (msg) => msg.role === "user" && msg.text.trim().toLowerCase() === item.question.trim().toLowerCase()
      )
  );

  if (hidden || visibleReplies.length === 0) return null;

  return (
    <div className="px-4 py-3 flex flex-wrap gap-2 bg-white dark:bg-zinc-800 border-b dark:border-zinc-700 relative">
      <button
        onClick={() => setHidden(true)}
        className="absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-white bg-transparent border-none cursor-pointer"
        aria-label="Hide quick replies"
      >
        ✕
      </button>
      {visibleReplies.map(({ question, answer }) => (
        <button
          key={question}
          onClick={() => handleQuickReply(question, answer)}
          className="bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 text-blue-800 dark:text-white text-sm px-4 py-1.5 rounded-full transition whitespace-nowrap"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
