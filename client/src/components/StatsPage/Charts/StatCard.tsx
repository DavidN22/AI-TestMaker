import { ReactNode } from "react";

export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-xl shadow-sm p-5 flex flex-col gap-2 items-center text-center border border-gray-200 dark:border-white/10">
      <div className="text-3xl font-semibold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        {icon}
        {label}
      </div>
    </div>
  );
}
