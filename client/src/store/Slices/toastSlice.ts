import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
  type: "success" | "error" | null;
}

const initialState: ToastState = {
  message: null,
  type: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.type = "error";
    },
    showSuccess: (state: ToastState, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.type = "success";
    },
    clearError: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});


export const { showError, showSuccess, clearError } = toastSlice.actions;
export default toastSlice.reducer;
