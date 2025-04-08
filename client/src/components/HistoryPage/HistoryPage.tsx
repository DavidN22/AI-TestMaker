import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TestResults } from "@/Types/Results";
import {
  useGetTestResultsQuery,
  useDeleteTestResultMutation,
} from "../../store/Slices/apiSlice";
import TestHistoryModal from "../Modals/TestHistoryModal";
import ModalTemplate from "../Modals/ModalTemplate";

import SearchAndFilterControls from "./SearchAndFilterControls";
import TestHistoryTable from "./TestHistoryTable";
import TestResultCard from "./HistoryCard";
import { useIsMobile } from "../../utils/useIsMobile"; // 👈 Import mobile hook
import SkeletonLoader from "../Loading/SkeletonLoader";

export default function HistoryPage() {
  const {
    data: testHistory = [],
    error,
    isLoading: loading,
  } = useGetTestResultsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  const [filteredHistory, setFilteredHistory] = useState<TestResults[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<TestResults | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [deleteTest] = useDeleteTestResultMutation();
  const isMobile = useIsMobile();

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

  useEffect(() => {
    if (justSubmitted && testId && filteredHistory.length > 0 && !loading) {
      const submittedTest = filteredHistory.find(
        (test) => test.test_id === testId
      );
      if (submittedTest) {
        setSelectedTest(submittedTest);
        setIsModalOpen(true);
        navigate(location.pathname, { replace: true });
      }
    }
  }, [
    justSubmitted,
    testId,
    filteredHistory,
    loading,
    navigate,
    location.pathname,
  ]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "recent" ? "oldest" : "recent"));
  };

  return (
    <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100 px-2 sm:px-6">
      <div className="flex-1 flex flex-col items-center p-2 sm:p-10">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-8xl bg-gray-50 dark:bg-[#2A2A2A] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 overflow-auto"
          style={{ height: "100vh" }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-center mb-5">
            Test History
          </h1>

          {error && (
            <p className="text-red-500 text-center">
              Error: {"status" in error ? error.status : error.message}
            </p>
          )}

          {/* 🔍 Search, Sort, Date Filter */}
          <SearchAndFilterControls
            search={search}
            setSearch={setSearch}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />

          {/* 📋 Table or Card Grid */}
          {isMobile ? (
            filteredHistory.length === 0 && !loading ? (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No test results found.
              </p>
            ) : (
              <div className="grid gap-4 mt-6">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className="min-h-[200px]">
                        <SkeletonLoader />
                      </div>
                    ))
                  : filteredHistory.map((test) => (
                      <TestResultCard
                        key={test.test_id}
                        testData={test}
                        setFilteredHistory={setFilteredHistory}
                      />
                    ))}
              </div>
            )
          ) : (
            <TestHistoryTable
              loading={loading}
              testData={filteredHistory}
              sortOrder={sortOrder}
              toggleSortOrder={toggleSortOrder}
              onView={(test) => {
                setSelectedTest(test);
                setIsModalOpen(true);
              }}
              onDelete={(test) => {
                setSelectedTest(test);
                setIsConfirmDeleteOpen(true);
              }}
            />
          )}

          {/* 🔍 View Modal */}
          <TestHistoryModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            testData={selectedTest}
          />

          {/* ❌ Delete Modal */}
          <ModalTemplate
            isOpen={isConfirmDeleteOpen}
            setIsOpen={setIsConfirmDeleteOpen}
            title="Confirm Deletion"
          >
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this test result? This action
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  if (!selectedTest) return;
                  setFilteredHistory((prev) =>
                    prev.filter((test) => test.test_id !== selectedTest.test_id)
                  );
                  setIsConfirmDeleteOpen(false);
                  deleteTest(selectedTest.test_id);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </ModalTemplate>
        </motion.div>
      </div>
    </div>
  );
}
