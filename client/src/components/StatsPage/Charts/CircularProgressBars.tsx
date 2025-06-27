import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarsProps {
  tests: {
    score: number;
    provider: string;
  }[];
  type: "overall" | "custom";
  color: string;
  text?: string;
  maxValue?: number;
  textSize?: string;
}

export default function CircularProgressBars({
  tests,
  type,
  color,
  text,
  maxValue = 100,
  textSize = "16px",
}: CircularProgressBarsProps) {
  let value = 0;
  if (type === "overall") {
    const top100 = tests.slice(0, 100);
    value =
      top100.reduce((sum, { score }) => sum + score, 0) / (top100.length || 1);
  } else if (type === "custom") {
    const custom = tests
      .slice(0, 100)
      .filter(({ provider }) => provider === "Custom");
    value = custom.reduce((sum, { score }) => sum + score, 0) /
      (custom.length || 1);
  }

  // Dark mode trail color support
  const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const trailColor = isDark ? '#374151' : '#e5e7eb';

  return (
    <CircularProgressbar
      value={value}
      maxValue={maxValue}
      text={text ?? `${value.toFixed(1)}%`}
      styles={buildStyles({
        textColor: color,
        pathColor: color,
        trailColor,
        textSize,
      })}
    />
  );
}


