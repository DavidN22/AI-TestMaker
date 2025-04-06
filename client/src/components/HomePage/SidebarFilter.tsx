import { Search, Cloud, Target, RefreshCcw } from "lucide-react";
import { useFilters } from "../../utils/useFilters";

export default function SidebarFilter() {
  const {
    search,
    selectedProviders,
    difficulty,
    handleSearchChange,
    handleProviderChange,
    handleDifficultyChange,
    resetFilters,
  } = useFilters();

  return (
    <aside className="md:sticky top-0 h-screen w-80 bg-white dark:bg-[#1E1E1E] p-0 md:block hidden border-l border-r border-b border-gray-300 dark:border-gray-700 transition-all">
      {/* Scrollable content inside */}
      <div className="h-full overflow-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white">
            <FilterIcon className="w-5 h-5" />
            Filters
          </h2>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search exams"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </div>

        {/* Cloud Providers */}
        <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-300 mb-3">
            <Cloud className="w-4 h-4" />
            Cloud Provider
          </h3>
          <div className="space-y-2">
            {["AWS", "Azure", "Google Cloud"].map((provider) => (
              <label
                key={provider}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span className="text-gray-700 dark:text-gray-200">{provider}</span>
                <input
                  type="checkbox"
                  checked={selectedProviders.includes(provider)}
                  onChange={() => handleProviderChange(provider)}
                  className="w-5 h-5 cursor-pointer accent-gray-900 dark:accent-white"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-300 mb-3">
            <Target className="w-4 h-4" />
            Difficulty
          </h3>
          <div className="space-y-2">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label
                key={level}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span className="text-gray-700 dark:text-gray-200">{level}</span>
                <input
                  type="radio"
                  name="difficulty-sidebar"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => handleDifficultyChange(level)}
                  className="w-5 h-5 cursor-pointer accent-gray-900 dark:accent-white"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors font-medium"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

// Optional icon for the filter header
function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-3.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
  );
}
