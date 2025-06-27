import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./Slices/filterSlice";
import { apiSlice } from "./Slices/apiSlice";
import toastReducer from "./Slices/toastSlice";
import authReducer from "./Slices/authSlice";
import { tokenApiSlice } from "./Slices/tokenSlice";
import configReducer from "./Slices/configSlice";
import { testsApi } from './Slices/customTestsApi'; 
import customFilterReducer from "./Slices/customFilterSlice";
import { statsApi } from "./Slices/statsApi";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    toast: toastReducer,
    auth: authReducer,
    config: configReducer,
    customFilter: customFilterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tokenApiSlice.reducerPath]: tokenApiSlice.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(tokenApiSlice.middleware)
      .concat(testsApi.middleware)
      .concat(statsApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
