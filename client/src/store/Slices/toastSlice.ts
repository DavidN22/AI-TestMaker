import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
}

const initialState: ToastState = {
  message: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearError: (state) => {
      state.message = null;
    },
  },
});

export const { showError, clearError } = toastSlice.actions;
export default toastSlice.reducer;
