import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addMessage,
  setMessages as setMessagesRedux,
  updateLastMessage,
  clearMessages,
} from "../../store/Slices/chatHistorySlice";
import { quickReplies } from "./quickRepliesData"; 

// Custom hook that centralizes chatbot logic
export const useChatbot = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatHistory.messages);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

const sendMessage = (text: string) => {
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

  setInput("");
};


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
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
