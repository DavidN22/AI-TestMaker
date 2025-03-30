// components/Tooltip.tsx
import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export default function Tooltip({ children, content, className = "" }: TooltipProps) {
  return (
    <div className="relative group w-fit">
      {children}

      {/* Tooltip box */}
      <div
        className={`
          absolute top-full left-1/2 mt-3 -translate-x-1/2 z-50
          pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
          transition-all duration-300 ease-out
        `}
      >
        {/* Arrow */}
        <div className="w-3 h-3 rotate-45 absolute -top-1 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm" />

        {/* Content box */}
        <div
          className={`
            px-4 py-2 text-sm font-medium rounded-lg backdrop-blur-md shadow-xl border
            bg-white/80 text-gray-800 border-gray-200
            dark:bg-gray-800/80 dark:text-white dark:border-gray-700
            ${className}
          `}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
