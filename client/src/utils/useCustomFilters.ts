// utils/useCustomFilters.ts

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setCustomSearch,
  setCustomDifficulty,
  clearCustomFilters,
} from "../store/Slices/customFilterSlice";

export function useCustomFilters() {
  const dispatch = useDispatch();
  const { search, difficulty, filteredCustomTests } = useSelector(
    (state: RootState) => state.customFilter
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomSearch(e.target.value));
  };

  const handleDifficultyChange = (level: string) => {
    dispatch(setCustomDifficulty(level));
  };

  const resetFilters = () => {
    dispatch(clearCustomFilters());
  };

  return {
    search,
    difficulty,
    filteredCustomTests,
    handleSearchChange,
    handleDifficultyChange,
    resetFilters,
  };
}
