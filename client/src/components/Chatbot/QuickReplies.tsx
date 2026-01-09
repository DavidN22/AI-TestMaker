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
  // Remove message.length > 1 condition to allow quick replies to show even if there are multiple messages
  if (hidden || visibleReplies.length === 0|| messages.length>1) return null;

  return (
    <div className="px-5 py-4 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Suggestions
        </h3>
        <button
          onClick={() => setHidden(true)}
          className="w-6 h-6 rounded-md bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 transition-colors"
          aria-label="Hide quick replies"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {visibleReplies.map(({ question, answer }) => (
          <button
            key={question}
            onClick={() => handleQuickReply(question, answer)}
            className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 transition-colors whitespace-nowrap font-medium"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;
