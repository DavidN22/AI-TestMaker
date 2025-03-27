import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tests } from "../../data/globalTestCardsStatic";

interface Test {
    title: string;
    provider: string; 
    difficulty: string;
    id : number;
    description: string;
   
}

type FilterState = {
    search: string;
    providers: string[];
    difficulty: string;
    filteredTests: Test[]; // Type the filteredTests array
};

const initialState: FilterState = {
    search: "",
    providers: [],
    difficulty: "",
    filteredTests: tests as Test[],
};

const filterSlice = createSlice({
    name: "filter",
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
            state.filteredTests = tests as Test[];
        },
    },
});

const applyFilters = (state: FilterState) => {
    return (tests as Test[]).filter((test) => {
        const searchMatch = test.title.toLowerCase().includes(state.search.toLowerCase());
        const providerMatch = state.providers.length === 0 || state.providers.includes(test.provider); // Check test.provider
        const difficultyMatch = !state.difficulty || test.difficulty === state.difficulty; // Allow empty difficulty

        return searchMatch && providerMatch && difficultyMatch;
    });
};


export const { setSearch, setProviders, setDifficulty, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;