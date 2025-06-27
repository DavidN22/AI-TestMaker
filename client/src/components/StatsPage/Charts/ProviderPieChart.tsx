import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#6366f1", // indigo
  "#f97316", // orange
  "#10b981", // emerald
  "#3b82f6", // blue
  "#ec4899", // pink
  "#a1a1aa", // gray for 'Other'
];

interface ProviderPieChartProps {
  tests: {
    provider: string;
  }[];
}

export default function ProviderPieChart({ tests }: ProviderPieChartProps) {
  const grouped = tests.reduce((acc: Record<string, number>, test) => {
    acc[test.provider] = (acc[test.provider] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 5);
  const rest = entries.slice(5);
  const otherCount = rest.reduce((sum, [, value]) => sum + value, 0);

  const data = [
    ...top.map(([name, value]) => ({ name, value })),
    ...(otherCount > 0 ? [{ name: "Other", value: otherCount }] : []),
  ];

  const isDark =
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
  const legendText = isDark ? "#f3f4f6" : "#111827";
  const tooltipBg = isDark ? "#1f2937" : "#fff";
  const tooltipText = isDark ? "#f3f4f6" : "#111827";

  if (data.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        No data to show.
      </p>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            cx="50%"
            cy="50%"
            label={false}
            labelLine={false}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: "1px solid #374151",
              color: tooltipText,
              borderRadius: 8,
              fontSize: 13,
            }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: tooltipText }}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ color: legendText, fontSize: 13 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
