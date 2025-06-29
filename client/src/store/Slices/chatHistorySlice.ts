import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatMessage = {
  role: "user" | "bot";
  text: string;
  loading?: boolean;
};

interface ChatHistoryState {
  messages: ChatMessage[];
}

const initialState: ChatHistoryState = {
  messages: [],
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    updateLastMessage(state, action: PayloadAction<Partial<ChatMessage>>) {
      if (state.messages.length > 0) {
        state.messages[state.messages.length - 1] = {
          ...state.messages[state.messages.length - 1],
          ...action.payload,
        };
      }
    },
  },
});

export const { addMessage, setMessages, clearMessages, updateLastMessage } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
