import { useState } from "react";
import { ChatModal } from "./ChatModal";
import { BotIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [quickRepliesKey, setQuickRepliesKey] = useState(0);

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
        className="fixed bottom-6 right-6 z-50 bg-neutral-800 hover:bg-neutral-700 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all duration-300 dark:bg-neutral-100 dark:hover:bg-white dark:border dark:border-neutral-200 dark:shadow-2xl dark:shadow-black/20"
        aria-label={open ? "Close Chatbot" : "Open Chatbot"}
      >
        <BotIcon className="w-6 h-6 text-white dark:text-neutral-800" />
      </button>

      {/* Optional: Backdrop glow */}
      {open && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute bottom-6 right-6 w-28 h-28 bg-neutral-400/20 rounded-full blur-2xl opacity-30 dark:bg-white/15 transition-all duration-500" />
        </div>
      )}

      {/* Chat Modal */}
      <AnimatePresence>
        {open && <ChatModal onClose={() => setOpen(false)} quickRepliesKey={quickRepliesKey} />}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
