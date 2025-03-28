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
    <aside className="md:sticky w-80 bg-white dark:bg-[#1E1E1E] p-6 shadow-lg md:block hidden overflow-auto border border-gray-300 dark:border-gray-700 transition-all">
      <div className="mb-6 text-left">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg"
        />
      </div>

      {/* Cloud Providers */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-2">Cloud Provider</h3>
        {["AWS", "Azure", "Google Cloud"].map((provider) => (
        <label
  key={provider}
  className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg"
>
            <span>{provider}</span>
            <input
              type="checkbox"
              checked={selectedProviders.includes(provider)}
              onChange={() => handleProviderChange(provider)}
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        ))}
      </div>

      {/* Difficulty Levels */}
      <div className="mt-6">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-2">Difficulty</h3>
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
         <label
         key={level}
         className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg"
       >
            <span>{level}</span>
            <input
              type="radio"
              name="difficulty-sidebar"
              value={level}
              checked={difficulty === level}
              onChange={() => handleDifficultyChange(level)}
              key={difficulty}
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        ))}
      </div>

      {/* Reset Button */}
      <button
  onClick={resetFilters}
  className="cursor-pointer mt-8 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
>
  Reset Filters
</button>
    </aside>
  );
}
