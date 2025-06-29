import { quickReplies } from "./quickRepliesData";
import { AppDispatch } from "../../store/store";
import { addMessage, updateLastMessage } from "../../store/Slices/chatHistorySlice";

/**
 * Sends a chatbot message using Redux and handles simulated bot response
 */
export const sendMessageUtil = ({
  text,
  dispatch,
  endRef,
}: {
  text: string;
  dispatch: AppDispatch;
  endRef: React.RefObject<HTMLDivElement>;
}) => {
  if (!text.trim()) return;

  const normalizedInput = text.trim().toLowerCase();
  const matchedQuickReply = quickReplies.find(
    ({ question }) => question.trim().toLowerCase() === normalizedInput
  );

  dispatch(addMessage({ role: "user", text }));
  dispatch(addMessage({ role: "bot", text: "", loading: true }));

  setTimeout(() => {
    const replyText = matchedQuickReply
      ? matchedQuickReply.answer
      : "This is a placeholder response.";

    dispatch(updateLastMessage({ loading: false, text: replyText }));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 600);
};
