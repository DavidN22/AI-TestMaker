import { Search, Target, RefreshCcw } from "lucide-react";
import { useCustomFilters } from "../../utils/useCustomFilters";

export default function CustomSidebarFilter() {
    const {
        search,
        difficulty,
        handleSearchChange,
        handleDifficultyChange,
        resetFilters,
      } = useCustomFilters();

  return (
    <aside className="md:sticky top-0 h-screen w-80 bg-white dark:bg-[#121212] p-0 md:block hidden border-r border-gray-200 dark:border-gray-800 transition-all">
      <div className="h-full overflow-auto p-6 space-y-8">

        {/* Header */}
        <div className="mb-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
            <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            Filters
          </h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search tests..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none shadow-sm hover:shadow-md transition-all"
          />
        </div>

        {/* Difficulty */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            <Target className="w-4 h-4" />
            Difficulty
          </h3>
          <div className="space-y-2">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label
                key={level}
                className="flex items-center justify-between px-4 py-2 rounded-md bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
              >
                <span className="text-sm text-gray-800 dark:text-gray-200">{level}</span>
                <input
                  type="radio"
                  name="difficulty-sidebar"
                  value={level}
                  checked={difficulty === level}
                  onChange={() => handleDifficultyChange(level)}
                  className="w-5 h-5 accent-black dark:accent-white"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-200 transition-all text-sm font-semibold shadow-md hover:shadow-lg"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 019 18v-3.586L3.293 6.707A1 1 0 013 6V4z" />
    </svg>
  );
}
