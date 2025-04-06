

// components/DarkModeToggle.tsx
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        const isDarkMode = localStorage.getItem("theme") === "dark";
        root.classList.toggle("dark", isDarkMode);
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
            className="relative cursor-pointer"
        >
            {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
        </button>
    );
}
