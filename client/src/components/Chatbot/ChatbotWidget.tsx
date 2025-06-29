import { useState } from "react";
import { ChatModal } from "./ChatModal";
import { BotIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [quickRepliesKey, setQuickRepliesKey] = useState(0);

  // Handler for toggling open state
  const handleWidgetClick = () => {
    setOpen((prev) => {
      if (!prev) setQuickRepliesKey((k) => k + 1); // Reset quick replies on open
      return !prev;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleWidgetClick}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
        aria-label={open ? "Close Chatbot" : "Open Chatbot"}
      >
        <BotIcon className="w-6 h-6" />
      </button>

      {/* Optional: Add backdrop blur glow effect */}
      {open && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute bottom-6 right-6 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl opacity-40 dark:bg-blue-300/20 transition-all duration-300" />
        </div>
      )}

      {/* Chat Modal with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {open && <ChatModal onClose={() => setOpen(false)} quickRepliesKey={quickRepliesKey} />}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
