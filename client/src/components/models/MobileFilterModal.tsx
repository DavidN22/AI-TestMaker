import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { useFilters } from "../../utils/useFilters";
import ModalTemplate from "./ModalTemplate";

export default function MobileFilterModal() {
  const {
    search,
    selectedProviders,
    difficulty,
    handleSearchChange,
    handleProviderChange,
    handleDifficultyChange,
    resetFilters,
  } = useFilters();
  const [isOpen, setIsOpen] = useState(false);
console.log("MobileFilterModal");
  return (
    <>
      {/* Floating Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden absolute top-3 right-12 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        <FunnelIcon className="h-6 w-6" />
      </button>

      {/* Modal */}
      <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Filters">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search tests..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Cloud Provider Filter */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Cloud Provider</h3>
          {["AWS", "Azure", "Google Cloud"].map((provider) => (
            <label key={provider} className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={selectedProviders.includes(provider)}
                onChange={() => handleProviderChange(provider)}
                className="w-4 h-4 text-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{provider}</span>
            </label>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Difficulty</h3>
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <label key={level} className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                name="difficulty-mobile"
                value={level}
                checked={difficulty === level}
                onChange={() => handleDifficultyChange(level)}
                className="w-4 h-4 text-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{level}</span>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded transition"
          >
            Close
          </button>
        </div>
      </ModalTemplate>
    </>
  );
}
