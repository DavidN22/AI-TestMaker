import { useGetDashboardDataQuery } from "../../store/Slices/statsApi";
import ScoreTrendChart from "./Charts/ScoreTrendChart";
import ProviderPieChart from "./Charts/ProviderPieChart";
import StatCard from "./Charts/StatCard";
import { BarChart2, PieChart, Gauge } from "lucide-react";
import TestActivityCalendar from "./Charts/TestActivityCalendar";
import AvgScoreByDifficultyChart from "./Charts/AvgScoreByDifficultyChart";
import CircularProgressBars from "./Charts/CircularProgressBars";
import StatPageSkeleton from "./StatPageSkeleton";

export default function StatPage() {
  const { data, isLoading, error } = useGetDashboardDataQuery();

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
    📊 Your Test Dashboard
  </h2>
  <p className="text-gray-500 dark:text-gray-400 mt-2">
    Performance insights at a glance
  </p>
  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
    Based on your last 100 tests
  </p>
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
    ? new Date(last_test_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "UTC",
      })
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
      <section className="grid grid-cols-5 gap-6">
        <div className={`col-span-3 ${cardClass}`}>
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            🧠 Avg Score by Difficulty
          </h3>
          <AvgScoreByDifficultyChart tests={tests} />
        </div>

        <div className={`col-span-2 ${cardClass}`}>
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
