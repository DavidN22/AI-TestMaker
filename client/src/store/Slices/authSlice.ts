import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  isAuthLoading: boolean;
}

const initialState: AuthState = {
  email: null,
  fullName: null,
  avatarUrl: null,
  isAuthLoading: true,
};

  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUserData(
        state,
        action: PayloadAction<{
          email: string;
          fullName: string;
          avatarUrl: string;
        }>
      ) {
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.avatarUrl = action.payload.avatarUrl;
        state.isAuthLoading = false;
      },
      logout(state) {
        state.email = null;
        state.fullName = null;
        state.avatarUrl = null;
        state.isAuthLoading = false;
      },
      setAuthLoading(state, action: PayloadAction<boolean>) {
        state.isAuthLoading = action.payload;
      },
    },
    
  });
  
  export const { setUserData, logout, setAuthLoading } = authSlice.actions;
  export default authSlice.reducer;
