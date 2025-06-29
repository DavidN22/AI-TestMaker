import { motion } from "framer-motion";
import { useChatbot } from "./useChatbot";
import MessageList from "./MessageList";
import { BotIcon, X } from "lucide-react";
import { useGetDashboardDataQuery } from "../../store/Slices/statsApi";
import QuickReplies from "./QuickReplies";
import { useDispatch } from "react-redux";
import { clearMessages } from "../../store/Slices/chatHistorySlice";

// Ceneralized Chat Modal component for the chatbot that gets logic from the custom hook `useChatbot`

export const ChatModal = ({ onClose, quickRepliesKey }: { onClose: () => void; quickRepliesKey?: number }) => {
  const {
    messages,
    input,
    setInput,
    handleSend,
    endRef,
  } = useChatbot();

  const { data: dashboardData } = useGetDashboardDataQuery();
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7, rotate: -10 }} // Changed closing effect: fade out, shrink, and rotate
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-20 right-6 z-50 w-99 shadow-2xl rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-700 flex flex-col h-[34rem] overflow-hidden"
    >
      {/* Header */}
      <div className="relative px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-800 text-white shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shadow-inner">
              <BotIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Teskro Assistant</h2>
              <p className="text-xs opacity-90 leading-tight">
                Ask anything about your tests or progress
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => dispatch(clearMessages())}
              className="hover:ring-2 hover:ring-white/30 rounded-full p-1 transition text-xs bg-white/20 px-3 py-1 mr-1"
              aria-label="Clear Chatbot"
              title="Clear Chat"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="hover:ring-2 hover:ring-white/30 rounded-full p-1 transition"
              aria-label="Close Chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <QuickReplies endRef={endRef} key={quickRepliesKey} />

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 via-white to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 px-4 pt-4 pb-2 custom-scrollbar">
        <MessageList messages={messages} endRef={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 border-t bg-white/70 dark:bg-zinc-800/70 border-gray-200 dark:border-zinc-700 backdrop-blur-md"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 dark:border-zinc-600 rounded-xl px-4 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask your assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
};
