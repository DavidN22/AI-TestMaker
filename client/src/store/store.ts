import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./Slices/filterSlice";
import { apiSlice } from "./Slices/apiSlice";
import toastReducer from "./Slices/toastSlice";
import authReducer from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    toast: toastReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
