import { useState, useEffect } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"; // Sorting Icons
import TestResultCard from "./HistoryCard";
import SkeletonLoader from "../Loading/SkeletonLoader"; // Import SkeletonLoader
import { TestResults } from "@/Types/Results";
import { useGetTestResultsQuery } from "../../store/Slices/apiSlice";

export default function HistoryPage() {
  const {
    data: testHistory = [],
    error,
    isLoading: loading,
  } = useGetTestResultsQuery();
  const [filteredHistory, setFilteredHistory] = useState<TestResults[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [dateFilter, setDateFilter] = useState("");


  // Filter & Sort logic
  useEffect(() => {
    if (!testHistory.length) return;
    let filtered = testHistory.filter((test) =>
      test.title.toLowerCase().includes(search.toLowerCase())
    );

    if (dateFilter) {
      filtered = filtered.filter((test) => {
        const testDateUTC = new Date(test.date);
        const localTestDate = new Date(
          testDateUTC.getFullYear(),
          testDateUTC.getMonth(),
          testDateUTC.getDate()
        );
        return localTestDate.toISOString().split("T")[0] === dateFilter;
      });
    }

    // Sort by date
    filtered.sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setFilteredHistory(filtered);
  }, [search, dateFilter, sortOrder, testHistory]);

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"));
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Test History
      </h1>
      {error && (
        <p className="text-red-500">
          Error: {"status" in error ? error.status : error.message}
        </p>
      )}
      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by test name..."
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort Icon (Click to Toggle Sorting) */}
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

        {/* Date Filter (Calendar) */}
        <input
          type="date"
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
          : filteredHistory.map((test, index) => (
              <TestResultCard key={index} testData={test} />
            ))}
      </div>
    </div>
  );
}
