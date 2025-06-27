import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo, useState, useEffect } from "react";
import ScoreTrendFilter from "./ScoreTrendFilter";

interface ScoreTrendChartProps {
  tests: {
    date: string;
    score: number;
    provider: string;
    difficulty: string;
    weak_points: string;
    title?: string;
  }[];
}

export default function ScoreTrendChart({ tests }: ScoreTrendChartProps) {
  const [filters, setFilters] = useState({ title: "All", provider: "All" });

  const filteredData = useMemo(() => {
    return tests
      .filter(
        (t) =>
          (filters.title === "All" || (t.title ?? "Untitled") === filters.title) &&
          (filters.provider === "All" || t.provider === filters.provider)
      )
      .map(({ date, score }) => ({ date, score }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [tests, filters]);

  const getThemeColors = () => {
    const isDark =
      typeof window !== "undefined" &&
      localStorage.getItem("theme") === "dark";
    return {
      isDark,
      axisColor: isDark ? "#d1d5db" : "#374151",
      gridColor: isDark ? "#374151" : "#e5e7eb",
      tooltipBg: isDark ? "#1f2937" : "#fff",
      tooltipText: isDark ? "#f3f4f6" : "#111827",
    };
  };

  const [themeColors, setThemeColors] = useState(getThemeColors());

  useEffect(() => {
    const handleThemeChange = () => {
      setThemeColors(getThemeColors());
    };
    window.addEventListener("storage", handleThemeChange);
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const { axisColor, gridColor, tooltipBg, tooltipText, isDark } = themeColors;

  return (
    <div className="w-full">
      <div className="flex justify-start mb-2">
        <div className="ml-12">
          <ScoreTrendFilter tests={tests} onFilterChange={setFilters} />
        </div>
      </div>
      {filteredData.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No data for selected filters.
        </p>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor, fontSize: 12 }}
                tickLine={{ stroke: axisColor }}
                axisLine={{ stroke: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor, fontSize: 12 }}
                tickLine={{ stroke: axisColor }}
                axisLine={{ stroke: axisColor }}
              />
              <Tooltip
                contentStyle={{
                  background: tooltipBg,
                  border: "1px solid " + gridColor,
                  color: tooltipText,
                  borderRadius: 8,
                  fontSize: 13,
                }}
                itemStyle={{ color: tooltipText }}
                labelStyle={{ color: tooltipText }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{
                  r: 3,
                  stroke: isDark ? "#fff" : "#6366f1",
                  strokeWidth: 1.5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
