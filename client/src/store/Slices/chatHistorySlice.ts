import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatMessage = {
  role: "user" | "bot";
  text: string;
  loading?: boolean;
  confirmation?: {
    options: "yes" | "no";
  };
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
clearConfirmation(state) {
  const index = state.messages.findIndex(
    (msg) => msg.role === "bot" && msg.confirmation
  );
  if (index !== -1) {
    state.messages[index] = {
      ...state.messages[index],
      confirmation: undefined,
    };
  }
}
  },
});

export const {
  addMessage,
  setMessages,
  clearMessages,
  updateLastMessage,
  clearConfirmation,
} = chatHistorySlice.actions;

export default chatHistorySlice.reducer;
