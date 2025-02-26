import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileFilterModal from "../models/MobileFilterModal";

export default function MobileHeader({ onSettingsOpen, onLogout }: { onSettingsOpen: (val:boolean) => void; onLogout: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-white dark:bg-[#1A1A1A] shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 left-0 right-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-5">
          <MobileFilterModal />
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
              MyApp
            </h1>

            {/* Mobile Menu Toggle */}
            <button
              className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 250, damping: 40 }}
        className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-white/90 to-gray-100 dark:from-[#1A1A1A]/90 dark:to-[#121212]/90 backdrop-blur-lg z-50 flex flex-col px-8 py-10"
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 text-3xl hover:text-gray-900 dark:hover:text-gray-100 transition-all"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>

        {/* Navigation Links */}
        <nav className="mt-24 space-y-6">
          {[
            { to: "/", label: "🏠 Home" },
            { to: "/history", label: "📜 History" },
            { to: "/statistics", label: "📊 Statistics" },
          ].map((item) => (
            <Link
              key={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              to={item.to}
              className="block text-lg font-semibold text-gray-900 dark:text-white py-4 px-6 
              border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800
              hover:border-gray-500 dark:hover:border-gray-500 transition-all shadow-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider Line */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 w-4/5 mx-auto opacity-70"></div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          {/* Settings Button */}
          <button
            onClick={() => onSettingsOpen(true)}
            className="w-full text-lg font-semibold text-gray-900 dark:text-white py-4 px-6 
            border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800
            hover:border-gray-500 dark:hover:border-gray-500 transition-all shadow-md"
          >
            ⚙ Settings
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onLogout();
            }}
            className="w-full bg-red-600 text-white text-lg font-semibold py-4 px-6 rounded-lg 
            border border-red-700 hover:border-gray-500 dark:hover:border-gray-500 transition-all shadow-lg"
          >
            🚪 Logout
          </button>
        </div>
      </motion.div>
    </>
  );
}
