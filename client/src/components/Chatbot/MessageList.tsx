import MessageBubble from "./MessageBubble";
import ConfirmationPanel from "./ConfirmationPanel";

const MessageList = ({
  messages,
  endRef,
}: {
  messages: {
    role: "user" | "bot";
    text: string;
    loading?: boolean;
    confirmation?: { options: "yes" | "no" };
  }[];
  endRef: React.RefObject<HTMLDivElement>;
}) => {
  const lastConfirmationIndex = [...messages]
    .reverse()
    .findIndex((m) => m.role === "bot" && m.confirmation);

  const confirmationIdx =
    lastConfirmationIndex >= 0
      ? messages.length - 1 - lastConfirmationIndex
      : -1;

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
          Start a conversation!
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx}>
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <MessageBubble
                role={msg.role}
                text={msg.text}
                loading={msg.loading}
                confirmation={msg.confirmation}
              />
            </div>

            {idx === confirmationIdx && (
              <div className="flex justify-center">
                <ConfirmationPanel />
              </div>
            )}
          </div>
        ))
      )}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
