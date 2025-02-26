import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setSearch, setProviders, setDifficulty, clearFilters } from "../store/Slices/filterSlice";

export function useFilters() {
    const dispatch = useDispatch();
    const { search, providers, difficulty } = useSelector((state: RootState) => state.filter);

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