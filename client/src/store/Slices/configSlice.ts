import { createSlice } from "@reduxjs/toolkit";

const isDev = window.location.hostname === "localhost";

const initialState = {
  apiBase: isDev ? "/api" : "https://api.teskro.com/api",
  frontendBase: isDev ? "http://localhost:8000" : "https://teskro.com",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
});

export default configSlice.reducer;
