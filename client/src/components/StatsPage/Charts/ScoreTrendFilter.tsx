import { useMemo, useState, useEffect } from "react";

interface ScoreTrendFilterProps {
  tests: {
    date: string;
    score: number;
    provider: string;
    difficulty: string;
    weak_points: string;
    title?: string;
  }[];
  onFilterChange: (filters: { title: string; provider: string }) => void;
}

export default function ScoreTrendFilter({ tests, onFilterChange }: ScoreTrendFilterProps) {
  const [selectedTitle, setSelectedTitle] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState("All");

  const titles = useMemo(() => {
    // Count frequency of each title (default to 'Untitled' if missing)
    const freqMap = new Map<string, number>();
    tests.forEach((t) => {
      const title = t.title ?? "Untitled";
      freqMap.set(title, (freqMap.get(title) || 0) + 1);
    });
    // Sort titles by frequency, descending
    const sortedTitles = Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([title]) => title)
      .slice(0, 5); // Take top 5
    return ["All", ...sortedTitles];
  }, [tests]);

  const providers = useMemo(() => {
    const uniqueProviders = new Set(tests.map((t) => t.provider));
    return ["All", ...Array.from(uniqueProviders)];
  }, [tests]);

  useEffect(() => {
    onFilterChange({ title: selectedTitle, provider: selectedProvider });
  }, [selectedTitle, selectedProvider, onFilterChange]);

 return (
  <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-4">
    {/* Title filter with helper text */}
    <div className="flex flex-col">
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
        Showing top 5 most frequent test titles
      </p>
      <select
        aria-label="Test Title"
        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px] transition-colors duration-150 shadow-sm hover:border-indigo-400"
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
      >
        {titles.map((title) => (
          <option
            key={title}
            value={title}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {title}
          </option>
        ))}
      </select>
    </div>

    {/* Provider filter aligned side by side */}
    <div className="flex flex-col">
      <label className="sr-only" htmlFor="provider">
        Provider
      </label>
      <select
        id="provider"
        aria-label="Provider"
        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px] transition-colors duration-150 shadow-sm hover:border-indigo-400"
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
      >
        {providers.map((provider) => (
          <option
            key={provider}
            value={provider}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {provider}
          </option>
        ))}
      </select>
    </div>
  </div>
);

}
