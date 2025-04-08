// components/History/SearchAndFilterControls.tsx
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  dateFilter: string;
  setDateFilter: (val: string) => void;
  sortOrder: "recent" | "oldest";
  toggleSortOrder: () => void;
};

export default function SearchAndFilterControls({
  search,
  setSearch,
  dateFilter,
  setDateFilter,
  sortOrder,
  toggleSortOrder,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-5 justify-center">
      <input
        type="text"
        placeholder="Search by test name..."
        className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={toggleSortOrder}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-200 dark:bg-[#1E1E1E] hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
      >
        {sortOrder === "recent" ? (
          <FaSortAmountDown
            className="text-gray-700 dark:text-white"
            size={20}
            title="Sort: Recent → Oldest"
          />
        ) : (
          <FaSortAmountUp
            className="text-gray-700 dark:text-white"
            size={20}
            title="Sort: Oldest → Recent"
          />
        )}
      </button>

      <input
        type="date"
        className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white rounded-md"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />
    </div>
  );
}
