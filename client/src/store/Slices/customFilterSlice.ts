// store/Slices/customFilterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTest } from "../../Types/Tests";

interface CustomFilterState {
  search: string;
  difficulty: string;
  allCustomTests: CreateTest[];
  filteredCustomTests: CreateTest[];
}

const initialState: CustomFilterState = {
  search: "",
  difficulty: "",
  allCustomTests: [],
  filteredCustomTests: [],
};

const customFilterSlice = createSlice({
  name: "customFilter",
  initialState,
  reducers: {
    setCustomSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.filteredCustomTests = applyCustomFilters(state);
    },
    setCustomDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
      state.filteredCustomTests = applyCustomFilters(state);
    },
    setAllCustomTests(state, action: PayloadAction<CreateTest[]>) {
      state.allCustomTests = action.payload;
      state.filteredCustomTests = applyCustomFilters({ ...state, allCustomTests: action.payload });
    },
    clearCustomFilters(state) {
      state.search = "";
      state.difficulty = "";
      state.filteredCustomTests = state.allCustomTests;
    },
  },
});

function applyCustomFilters(state: CustomFilterState): CreateTest[] {
  return state.allCustomTests.filter((test) => {
    const searchMatch = test.title.toLowerCase().includes(state.search.toLowerCase());
    const difficultyMatch = !state.difficulty || test.difficulty === state.difficulty;
    return searchMatch && difficultyMatch;
  });
}

export const {
  setCustomSearch,
  setCustomDifficulty,
  setAllCustomTests,
  clearCustomFilters,
} = customFilterSlice.actions;

export default customFilterSlice.reducer;
