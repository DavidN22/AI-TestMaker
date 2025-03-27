import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    email: string | null;
    isAuthLoading: boolean;
  }
  
  const initialState: AuthState = {
    email: null,
    isAuthLoading: true,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUserEmail(state, action: PayloadAction<string>) {
        state.email = action.payload;
        state.isAuthLoading = false;
      },
      logout(state) {
        state.email = null;
        state.isAuthLoading = false;
      },
      setAuthLoading(state, action: PayloadAction<boolean>) {
        state.isAuthLoading = action.payload;
      }
    },
  });
  
  export const { setUserEmail, logout, setAuthLoading } = authSlice.actions;
  export default authSlice.reducer;
