import MessageBubble from "./MessageBubble";

const MessageList = ({
  messages,
  endRef,
}: {
  messages: { role: "user" | "bot"; text: string; loading?: boolean }[];
  endRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
          Start a conversation!
        </div>
      )}
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} role={msg.role} text={msg.text} loading={msg.loading} />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
