import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo, useEffect, useState } from "react";

interface AvgScoreByDifficultyChartProps {
  tests: {
    difficulty: string;
    score: number;
  }[];
}

export default function AvgScoreByDifficultyChart({
  tests,
}: AvgScoreByDifficultyChartProps) {
  const data = useMemo(() => {
    const difficultyMap: Record<string, { totalScore: number; count: number }> =
      {};

    tests.forEach(({ difficulty, score }) => {
      if (!difficultyMap[difficulty]) {
        difficultyMap[difficulty] = { totalScore: 0, count: 0 };
      }
      difficultyMap[difficulty].totalScore += score;
      difficultyMap[difficulty].count += 1;
    });

    return Object.entries(difficultyMap).map(
      ([difficulty, { totalScore, count }]) => ({
        difficulty,
        avgScore: totalScore / count,
      })
    );
  }, [tests]);

  const getThemeColors = () => {
    const isDark =
      typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
    return {
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

  const { axisColor, gridColor, tooltipBg, tooltipText } = themeColors;

  if (data.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No data available.
      </p>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis
            dataKey="difficulty"
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
            formatter={(value: number) => [
              `${value.toFixed(1)}%`,
              "Average Score",
            ]}
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
          <Bar dataKey="avgScore" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
