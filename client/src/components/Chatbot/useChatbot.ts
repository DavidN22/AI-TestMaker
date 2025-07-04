import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addMessage,
  setMessages as setMessagesRedux,
  updateLastMessage,
  clearMessages,
  clearConfirmation,
} from "../../store/Slices/chatHistorySlice";
import { quickReplies } from "./quickRepliesData";
import { useApi } from "../../utils/api";

// Custom hook that centralizes chatbot logic
export const useChatbot = () => {
  const { sendChatToBot } = useApi();
  const dispatch = useDispatch();
  const messages = useSelector(
    (state: RootState) => state.chatHistory.messages
  );
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string, skipUserBubble = false) => {
    dispatch(clearConfirmation()); // Clear any existing confirmation state
  if (!text.trim()) return;

  const normalizedInput = text.trim().toLowerCase();
  const matchedQuickReply = quickReplies.find(
    ({ question }) => question.trim().toLowerCase() === normalizedInput
  );

  const trimmed = messages.length >= 10 ? messages.slice(1) : messages;

  const cleaned = trimmed.map((msg) =>
    msg.role === "bot" && msg.confirmation
      ? { ...msg, confirmation: undefined }
      : msg
  );
// uncomment this line if you want to keep the cleaned messages in Redux
  //dispatch(setMessagesRedux(cleaned));

  if (!skipUserBubble) {
    dispatch(addMessage({ role: "user", text }));
  }

  dispatch(addMessage({ role: "bot", text: "", loading: true }));

  try {
    let replyText = "";

if (matchedQuickReply) {
  replyText = matchedQuickReply.answer;

 setTimeout(() => {
    dispatch(
      updateLastMessage({
        text: replyText,
        loading: false,
      })
    );
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 600);

} else {
  const formattedHistory = [
    ...cleaned.map((m) => ({ role: m.role, content: m.text })),
    { role: "user", content: text },
  ];

  const response = await sendChatToBot(formattedHistory);

  replyText = response.answer || "Sorry, I couldn't understand that.";
  dispatch(
    updateLastMessage({
      text: replyText,
      loading: false,
      confirmation: response.confirmation ?? undefined,
    })
  );
}

  } catch (err) {
    dispatch(
      updateLastMessage({
        text: "Error talking to server.",
        loading: false,
      })
    );
    console.error("Chatbot error:", err);
  }

  endRef.current?.scrollIntoView({ behavior: "smooth" });
};



  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const messageToSend = input.trim();
    setInput(""); // clear immediately
    sendMessage(messageToSend);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    messages,
    input,
    setInput,
    handleSend,
    sendMessage,
    setMessages: (msgs: typeof messages) => dispatch(setMessagesRedux(msgs)),
    endRef,
    clearMessages: () => dispatch(clearMessages()),
  };
};
