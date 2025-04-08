import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tests } from "../../data/globalTestCardsStatic";
import { Test } from "../../Types/Tests";

interface StaticTestsState {
  search: string;
  providers: string[];
  difficulty: string;
  allTests: Test[];
  filteredTests: Test[];
}

const initialState: StaticTestsState = {
  search: "",
  providers: [],
  difficulty: "",
  allTests: tests,      
  filteredTests: tests,
};

const staticTestsSlice = createSlice({
  name: "staticTests",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filteredTests = applyFilters(state);
    },
    setProviders: (state, action: PayloadAction<string[]>) => {
      state.providers = action.payload;
      state.filteredTests = applyFilters(state);
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
      state.filteredTests = applyFilters(state);
    },
    clearFilters: (state) => {
      state.search = "";
      state.providers = [];
      state.difficulty = "";
      state.filteredTests = state.allTests;
    },
  },
});

const applyFilters = (state: StaticTestsState) => {
  return state.allTests.filter((test) => {
    const searchMatch = test.title.toLowerCase().includes(state.search.toLowerCase());
    const providerMatch =
      state.providers.length === 0 || state.providers.includes(test.provider);
    const difficultyMatch = !state.difficulty || test.difficulty === state.difficulty;

    return searchMatch && providerMatch && difficultyMatch;
  });
};

export const {
  setSearch,
  setProviders,
  setDifficulty,
  clearFilters,
} = staticTestsSlice.actions;

export default staticTestsSlice.reducer;
