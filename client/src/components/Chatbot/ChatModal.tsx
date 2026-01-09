import { motion } from "framer-motion";
import { useChatbot } from "./useChatbot";
import MessageList from "./MessageList";
import { BotIcon, X } from "lucide-react";
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

  const dispatch = useDispatch();
  const isBotLoading = messages.some((m) => m.role === "bot" && m.loading);
  return (
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.95 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 z-50 w-[95vw] max-w-sm sm:w-[26rem] shadow-xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col h-[36rem] overflow-hidden"
>
      {/* Header */}
<div className="relative px-6 py-5 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
  <div className="flex justify-between items-start">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
        <BotIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Teskro Assistant</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          How can I help you today?
        </p>
      </div>
    </div>
    <div className="flex gap-1 items-center">
      <button
        onClick={() => dispatch(clearMessages())}
        className="hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-xs px-3 py-1.5 text-gray-600 dark:text-gray-400 transition-colors font-medium"
        aria-label="Clear Chatbot"
        title="Clear Chat"
      >
        Clear
      </button>
      <button
        onClick={onClose}
        className="hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg p-1.5 transition-colors"
        aria-label="Close Chatbot"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" strokeWidth={2} />
      </button>
    </div>
  </div>
</div>

      <QuickReplies endRef={endRef} resetKey={quickRepliesKey} />

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-900 px-5 pt-4 pb-2 custom-scrollbar">
        <MessageList messages={messages} endRef={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-end gap-3 px-5 py-4 border-t bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800"
      >
<textarea
  className="flex-1 min-h-[44px] max-h-[120px] resize-none border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600 transition-colors"
  placeholder="Type your message..."
  value={input}
  ref={el => {
    if (el && input === "") {
      el.style.height = 'auto';
    }
  }}
  onChange={(e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    const maxHeight = 120;
    const newHeight = Math.min(e.target.scrollHeight, maxHeight);
    e.target.style.height = `${newHeight}px`;
    e.target.style.overflow = e.target.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }}
onKeyDown={(e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (isBotLoading) return;
    const form = e.currentTarget.form;
    if (form) {
      const submitEvent = new Event('submit', {
        cancelable: true,
        bubbles: true,
      });
      form.dispatchEvent(submitEvent);
    }
  }
}}
  rows={1}
/>

        <button
          type="submit"
          disabled={isBotLoading}
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95"
>
          Send
        </button>
      </form>
    </motion.div>
  );
};
