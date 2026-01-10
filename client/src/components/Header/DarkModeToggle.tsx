// components/DarkModeToggle.tsx
/* eslint-disable react-refresh/only-export-components */
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
// This is used to check the initial theme preference from localStorage and update the icon accordingly.
  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = isDark ? "light" : "dark";
    root.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none"
      style={{
        backgroundColor: isDark ? "#374151" : "#d1d5db",
      }}
      aria-label="Toggle dark mode"
    >
      {/* Switch Track */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          backgroundColor: isDark ? "#374151" : "#d1d5db",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Switch Knob */}
      <motion.div
        className="relative z-10 flex items-center justify-center w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-sm"
        initial={false}
        animate={{
          x: isDark ? 23 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon size={12} className="text-gray-600" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -180,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun size={12} className="text-gray-700" />
        </motion.div>
      </motion.div>
    </button>
  );
}

export function isDarkMode() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
}
