import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setSearch,
  setProviders,
  setDifficulty,
  clearFilters,
} from "../store/Slices/filterSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilters() {
  const dispatch = useDispatch();
  const { search, providers, difficulty } = useSelector(
    (state: RootState) => state.filter
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    const queryProviders = searchParams.get("provider")
      ? searchParams.get("provider")!.split(",")
      : [];
    const queryDifficulty = searchParams.get("difficulty") || "";

    dispatch(setSearch(querySearch));
    dispatch(setProviders(queryProviders));
    dispatch(setDifficulty(queryDifficulty));
  }, [dispatch, searchParams]); 

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) params.search = search;
    if (providers.length > 0) params.provider = providers.join(",");
    if (difficulty) params.difficulty = difficulty;

    setSearchParams(params);
  }, [search, providers, difficulty, setSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleProviderChange = (provider: string) => {
    const updatedProviders = providers.includes(provider)
      ? providers.filter((p) => p !== provider)
      : [...providers, provider];

    dispatch(setProviders(updatedProviders));
  };

  const handleDifficultyChange = (level: string) => {
    dispatch(setDifficulty(level));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
    setSearchParams({});
  };

  return {
    search,
    selectedProviders: providers,
    difficulty,
    handleSearchChange,
    handleProviderChange,
    handleDifficultyChange,
    resetFilters,
  };
}
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import {
//   setSearch,
//   setProviders,
//   setDifficulty,
//   clearFilters,
// } from "../store/Slices/filterSlice";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// export function useFilters() {
//   const dispatch = useDispatch();
//   const { search, providers, difficulty } = useSelector(
//     (state: RootState) => state.filter
//   );
//   const [, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const params: Record<string, string> = {};
//     if (search) params.search = search;
//     if (providers.length > 0) params.provider = providers.join(",");
//     if (difficulty) params.difficulty = difficulty;

//     setSearchParams(params);
//   }, [search, providers, difficulty, setSearchParams]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setSearch(e.target.value));
//   };

//   const handleProviderChange = (provider: string) => {
//     const updatedProviders = providers.includes(provider)
//       ? providers.filter((p) => p !== provider)
//       : [...providers, provider];

//     dispatch(setProviders(updatedProviders));
//   };

//   const handleDifficultyChange = (level: string) => {
//     dispatch(setDifficulty(level));
//   };

//   const resetFilters = () => {
//     dispatch(clearFilters());
//     setSearchParams({});
//   };

//   return {
//     search,
//     selectedProviders: providers,
//     difficulty,
//     handleSearchChange,
//     handleProviderChange,
//     handleDifficultyChange,
//     resetFilters,
//   };
// }