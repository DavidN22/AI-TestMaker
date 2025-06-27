import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import { useMemo, useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { getTodayDateObj, getDateKey } from "./dateUtils";

interface TestActivityCalendarProps {
  tests: {
    date: string;
  }[];
}

export default function TestActivityCalendar({ tests }: TestActivityCalendarProps) {
  const data = useMemo(() => {
    const countMap: Record<string, number> = {};
    tests.forEach(({ date }) => {
      const key = getDateKey(date);
      countMap[key] = (countMap[key] || 0) + 1;
    });
    return Object.entries(countMap).map(([date, count]) => ({ date, count }));
  }, [tests]);

  const today = getTodayDateObj();
  const startDate = subDays(today, 360);

  const getIsDark = () =>
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark";

  const [isDark, setIsDark] = useState(getIsDark());

  useEffect(() => {
    const updateTheme = () => setIsDark(getIsDark());

    window.addEventListener("storage", updateTheme);
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", updateTheme);
      observer.disconnect();
    };
  }, []);

  const textColor = "#6b7280"; // Gray-500 stays same in both themes
  const emptyColor = isDark ? "#374151" : "#f3f4f6";

  return (
    <div className="w-full overflow-x-auto sm:overflow-visible">
      <div className="min-w-[600px] sm:min-w-0 mx-auto">
        <style>{`
          .react-calendar-heatmap text {
            font-size: 6px;
            fill: ${textColor};
          }
          .react-calendar-heatmap rect {
            rx: 2px;
            ry: 2px;
            width: 10px !important;
            height: 10px !important;
          }
          @media (max-width: 640px) {
            .react-calendar-heatmap rect {
              width: 16px !important;
              height: 16px !important;
            }
            .react-calendar-heatmap text {
              font-size: 10px;
            }
          }
          .react-calendar-heatmap .fill-gray-200 { fill: ${emptyColor}; }
          .react-calendar-heatmap .fill-green-100 { fill: #dcfce7; }
          .react-calendar-heatmap .fill-green-300 { fill: #86efac; }
          .react-calendar-heatmap .fill-green-500 { fill: #22c55e; }
          .react-calendar-heatmap .fill-green-700 { fill: #15803d; }
        `}</style>

        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={data}
          classForValue={(value) => {
            if (!value) return "fill-gray-200";
            if (value.count >= 4) return "fill-green-700";
            if (value.count === 3) return "fill-green-500";
            if (value.count === 2) return "fill-green-300";
            return "fill-green-100";
          }}
          tooltipDataAttrs={(value) =>
            ({
              "data-tooltip-id": "calendar-tooltip",
              "data-tooltip-content": value?.date
                ? `${new Date(value.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "UTC",
                  })}: ${value.count} test${value.count > 1 ? "s" : ""}`
                : "No tests",
            } as Record<string, string>)
          }
          gutterSize={1}
          showWeekdayLabels
        />
        <ReactTooltip
          id="calendar-tooltip"
          className="!text-xs !bg-gray-800 !text-white"
        />
      </div>
    </div>
  );
}
