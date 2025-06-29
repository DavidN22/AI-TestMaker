import ChatbotLoading from "./ChatbotLoading";

const MessageBubble = ({
  role,
  text,
  loading,
}: {
  role: "user" | "bot";
  text: string;
  loading?: boolean;
}) => {
  const isBot = role === "bot";

  return (
    <div
      className={`max-w-[80%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
        isBot
          ? "self-start bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-100"
          : "self-end bg-blue-600 text-white"
      }`}
    >
      {loading ? (
        <ChatbotLoading />
      ) : isBot ? (
        <div
          className="[&>ul]:list-disc [&>ul]:pl-5 [&>li]:mt-1 space-y-1"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default MessageBubble;
