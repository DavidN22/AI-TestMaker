// components/DarkModeToggle.tsx
/* eslint-disable react-refresh/only-export-components */
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
    <button onClick={toggleTheme} className="relative cursor-pointer">
      {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
    </button>
  );
}

export function isDarkMode() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
}
