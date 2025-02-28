import { useState, useEffect } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"; // Sorting Icons
import TestResultCard from "./HistoryCard";
import historyData from "../../history.json"; 
import { TestResults } from "@/Types/Results";
import historyData2 from "../../history2.json"; 
const generateMockHistory = () => {
  return [
    { ...historyData, title: "AWS Fundamentals", date: "2025-02-20" },
    { ...historyData, title: "Google Cloud Basics", date: "2025-02-18" },
    { ...historyData, title: "Azure Security", date: "2025-02-15" },
    { ...historyData, title: "AWS Advanced Networking", date: "2025-02-10" },
    { ...historyData, title: "GCP Associate Cloud Engineer", date: "2025-02-05" },
    { ...historyData, title: "AWS Certified Solutions Architect", date: "2025-01-28" },
    { ...historyData2, title: "Azure DevOps Engineer", date: "2025-01-20" }
  ];
};


export default function HistoryPage() {
  const [testHistory, setTestHistory] = useState<TestResults[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<TestResults[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [dateFilter, setDateFilter] = useState("");

  // Load generated test history
  useEffect(() => {
    const mockHistory = generateMockHistory();
    setTestHistory(mockHistory);
    setFilteredHistory(mockHistory);
  }, []);

  // Apply search, sorting, and filtering dynamically
  useEffect(() => {
    let filtered = testHistory.filter((test) =>
      test.title.toLowerCase().includes(search.toLowerCase())
    );

    // Filter by date
    if (dateFilter) {
      const selectedDate = new Date(dateFilter).getTime();
      filtered = filtered.filter(
        (test) => new Date(test.date).getTime() === selectedDate
      );
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Test History
      </h1>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by test name..."
          className="p-2 border rounded-md w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort Icon (Click to Toggle Sorting) */}
        <button
          onClick={toggleSortOrder}
          className="p-2 border rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          {sortOrder === "recent" ? (
            <FaSortAmountDown className="text-gray-700 dark:text-white" size={20} title="Sort: Recent → Oldest" />
          ) : (
            <FaSortAmountUp className="text-gray-700 dark:text-white" size={20} title="Sort: Oldest → Recent" />
          )}
        </button>

        {/* Date Filter (Calendar) */}
        <input
          type="date"
          className="p-2 border rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Test Cards Grid (4 per row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHistory.map((test, index) => (
          <TestResultCard key={index} testData={test} />
        ))}
      </div>
    </div>
  );
}
