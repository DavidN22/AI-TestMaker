import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import TestResultCard from "./HistoryCard";
import SkeletonLoader from "../Loading/SkeletonLoader";
import { TestResults } from "@/Types/Results";
import { useGetTestResultsQuery } from "../../store/Slices/apiSlice";
import TestHistoryModal from "../Modals/TestHistoryModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestResults | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const justSubmitted = location.state?.justSubmitted;
  const testId = location.state?.testId;

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

    filtered.sort((a, b) =>
      sortOrder === "recent"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setFilteredHistory(filtered);
  }, [search, dateFilter, sortOrder, testHistory]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"));
  };

  useEffect(() => {
    if (justSubmitted && testId && filteredHistory.length > 0 && !loading) {
      const submittedTest = filteredHistory.find((test) => test.test_id === testId);
      if (submittedTest) {
        setSelectedTest(submittedTest);
        setIsModalOpen(true);
        navigate(location.pathname, { replace: true }); // Clear state
      }
    }
  }, [justSubmitted, testId, filteredHistory, loading, navigate, location.pathname]);

  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 overflow-auto">

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

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
        ) : testHistory.length === 0 ? (
          <div className="col-span-full text-center mt-10">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No tests taken yet. Once you take a test, your results will appear here.
            </p>
            <div className="mt-6">
              <svg
                className="mx-auto h-20 w-20 text-gray-300 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        ) : (
          filteredHistory.map((test, index) => (
            <TestResultCard key={index} testData={test} />
          ))
        )}
      </div>

      {/* Always-mounted modal */}
      <TestHistoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        testData={selectedTest}
      />
    </div>
    </div>
  );
}
