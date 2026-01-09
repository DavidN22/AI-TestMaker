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
      className={`max-w-[85%] px-4 py-3 text-sm whitespace-pre-wrap ${
        isBot
          ? "self-start bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm"
          : "self-end bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-2xl rounded-tr-sm"
      }`}
    >
      {loading ? (
        <div className="py-0.5">
          <ChatbotLoading />
        </div>
      ) : isBot ? (
<div
  className="[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mt-2 [&>li]:mt-1
             [&>strong]:font-semibold [&>strong]:text-gray-900 [&>strong]:dark:text-white
             [&>h2]:text-gray-900 [&>h2]:dark:text-gray-100 [&>h2]:mt-4 [&>h2]:mb-2 [&>h2]:text-base [&>h2]:font-bold
             [&>h3]:text-gray-800 [&>h3]:dark:text-gray-200 [&>h3]:mt-3 [&>h3]:mb-1 [&>h3]:text-sm [&>h3]:font-semibold
             [&>hr]:my-3 [&>hr]:border-gray-200 [&>hr]:dark:border-zinc-700
             leading-relaxed"
  dangerouslySetInnerHTML={{ __html: formatBotText(text) }}
/>

      ) : (
        <div className="leading-relaxed">{text}</div>
      )}
    </div>
  );
};

export default MessageBubble;
