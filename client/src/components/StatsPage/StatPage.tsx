import { useGetDashboardDataQuery, useGetAllUsersQuery } from "../../store/Slices/statsApi";
import ScoreTrendChart from "./Charts/ScoreTrendChart";
import ProviderPieChart from "./Charts/ProviderPieChart";
import StatCard from "./Charts/StatCard";
import { BarChart2, PieChart, Gauge } from "lucide-react";
import TestActivityCalendar from "./Charts/TestActivityCalendar";
import AvgScoreByDifficultyChart from "./Charts/AvgScoreByDifficultyChart";
import CircularProgressBars from "./Charts/CircularProgressBars";
import StatPageSkeleton from "./StatPageSkeleton";
import { getDateKey } from "./Charts/dateUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";

const ADMIN_EMAIL = "naymondavid@gmail.com";

export default function StatPage() {
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const isAdmin = userEmail === ADMIN_EMAIL;
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery(undefined, {
    skip: !isAdmin,
  });
  
  const { data, isLoading, error } = useGetDashboardDataQuery(selectedUserId);
  
  if (isLoading) return <StatPageSkeleton />;

  if (error || !data)
    return (
      <div className="p-8 text-sm text-destructive">Error loading stats.</div>
    );
  const { meta, tests } = data;
  const { total_tests, avg_score, last_test_date } = meta;

  const cardClass =
    "bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow p-6";

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
     <header className="text-center mb-8">
  <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
    📊 {selectedUserId ? `Stats for ${selectedUserId}` : 'Your Test Dashboard'}
  </h2>
  <p className="text-gray-500 dark:text-gray-400 mt-2">
    Performance insights at a glance
  </p>
  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
    Based on {selectedUserId ? 'their' : 'your'} last 100 tests
  </p>
  
  {/* Admin User Selector */}
  {isAdmin && (
    <div className="mt-6 flex items-center justify-center gap-3">
      <label htmlFor="user-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        View stats for:
      </label>
      <select
        id="user-select"
        value={selectedUserId || ""}
        onChange={(e) => setSelectedUserId(e.target.value || undefined)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        disabled={isLoadingUsers}
      >
        <option value="">My Stats</option>
        {usersData?.users.map((user) => (
          <option key={user.email} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  )}
</header>


      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Total Tests"
          value={total_tests}
          icon={<BarChart2 className="w-6 h-6" />}
        />
        <StatCard
          label="Average Score"
          value={`${avg_score.toFixed(1)}%`}
          icon={<Gauge className="w-6 h-6" />}
        />
        <StatCard
          label="Last Test"
          value={
            last_test_date
              ? getDateKey(last_test_date)
              : "-"
          }
          icon={<PieChart className="w-6 h-6" />}
        />
      </section>

      {/* Circular Progress Bars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className={`${cardClass} flex flex-col items-center`}>
          <div style={{ width: "150px", height: "150px" }}>
            <CircularProgressBars tests={tests} type="overall" color="#6366f1" />
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            Overall Average Score
          </div>
        </div>
        <div className={`${cardClass} flex flex-col items-center`}>
          <div style={{ width: "150px", height: "150px" }}>
            <CircularProgressBars tests={tests} type="custom" color="#10b981" />
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            Custom Tests Average Score
          </div>
        </div>
      </section>

      {/* Main Chart Grid with asymmetric layout */}
      <section className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="col-span-1 sm:col-span-3 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            🧠 Avg Score by Difficulty
          </h3>
          <AvgScoreByDifficultyChart tests={tests} />
        </div>

        <div className="col-span-1 sm:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            🥧 Tests by Provider
          </h3>
          <ProviderPieChart tests={tests} />
        </div>
      </section>

      {/* Score Trend Chart */}
      <div className={cardClass}>
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          📈 Score Trend
        </h3>
        {tests.length > 0 ? (
          <ScoreTrendChart tests={tests} />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No test history available yet.
          </p>
        )}
      </div>

      {/* Heatmap */}
      <section className={cardClass}>
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          📅 Test Activity
        </h3>
        <TestActivityCalendar tests={tests} />
      </section>
    </div>
  );
}
