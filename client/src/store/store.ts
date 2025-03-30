import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./Slices/filterSlice";
import { apiSlice } from "./Slices/apiSlice";
import toastReducer from "./Slices/toastSlice";
import authReducer from "./Slices/authSlice";
import { tokenApiSlice } from "./Slices/tokenSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    toast: toastReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tokenApiSlice.reducerPath]: tokenApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(tokenApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
