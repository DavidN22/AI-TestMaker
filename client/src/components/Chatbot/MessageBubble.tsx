import ChatbotLoading from "./ChatbotLoading";

const MessageBubble = ({
  role,
  text,
  loading,
}: {
  role: "user" | "bot";
  text: string;
  loading?: boolean;
  confirmation?: { options: "yes" | "no" };
}) => {
  const isBot = role === "bot";

function formatBotText(text: string) {
  let formatted = text;

  // Headers
  formatted = formatted.replace(/^### (.*?)$/gm, "<h3 class='text-sm font-semibold mt-3 mb-1'>$1</h3>");
  formatted = formatted.replace(/^## (.*?)$/gm, "<h2 class='text-base font-bold mt-4 mb-2'>$1</h2>");
  // Horizontal rule
  formatted = formatted.replace(/^---$/gm, "<hr class='my-3 border-t border-gray-300 dark:border-zinc-600' />");
  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return formatted;
}



  return (
    <div
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm ${
        isBot
          ? "self-start bg-white/90 dark:bg-zinc-800/90 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
          : "self-end bg-gradient-to-r from-neutral-800 to-neutral-700 dark:from-zinc-700 dark:to-zinc-600 text-white shadow-md"
      }`}
    >
      {loading ? (
        <div className="py-1">
          <ChatbotLoading />
        </div>
      ) : isBot ? (
<div
  className="[&>ul]:list-disc [&>ul]:pl-4 [&>li]:mt-0.5
             [&>strong]:font-semibold [&>strong]:text-gray-900 [&>strong]:dark:text-white
             [&>h2]:text-gray-800 [&>h2]:dark:text-gray-100 [&>h2]:mt-2 [&>h2]:mb-1 [&>h2]:text-sm [&>h2]:font-bold
             [&>h3]:text-gray-700 [&>h3]:dark:text-gray-200 [&>h3]:mt-1 [&>h3]:mb-0.5 [&>h3]:text-sm [&>h3]:font-medium
             [&>hr]:my-1 [&>hr]:border-gray-300 [&>hr]:dark:border-zinc-600
             leading-snug text-sm"
  dangerouslySetInnerHTML={{ __html: formatBotText(text) }}
/>

      ) : (
        <div className="leading-relaxed">{text}</div>
      )}
    </div>
  );
};

export default MessageBubble;
