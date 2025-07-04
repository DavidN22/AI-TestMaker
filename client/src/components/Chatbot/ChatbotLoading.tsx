const ChatbotLoading = () => (
  <span className="flex items-center gap-1 px-1 py-0.5">
    <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-blue-300 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
    <span className="w-2 h-2 bg-blue-200 dark:bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
  </span>
);

export default ChatbotLoading;
