import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsModal from "../models/settingsModel";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { handleLogout } from "../../utils/api";
export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const email = useSelector((state: RootState) => state.auth.email);
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/login";
  };
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 left-0 right-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Branding */}
            <Link
              to="/"
              className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide hover:opacity-80 transition"
            >
              MyApp
            </Link>

            {email ? (
              // 🔐 Authenticated view
              <nav className="flex space-x-5 items-center">
                <NavItem
                  to="/home"
                  label="Home"
                  active={location.pathname === "/home"}
                />
                <NavItem
                  to="/history"
                  label="History"
                  active={location.pathname === "/history"}
                />
                <NavItem
                  to="/statistics"
                  label="Statistics"
                  active={location.pathname === "/statistics"}
                />

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="relative cursor-pointer text-gray-700 dark:text-gray-300 
                  hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1
                  before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] 
                  before:bg-indigo-600 dark:before:bg-indigo-400 before:transition-all before:duration-300 
                  hover:before:w-full"
                >
                  ⚙ Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer px-3 py-1.5 border border-red-500 text-red-500 rounded-lg text-sm font-medium 
                  transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </nav>
            ) : (
              // 🔓 Unauthenticated view
              <button
                onClick={handleGoogleSignIn}
                className="cursor-pointer px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium 
                transition-all duration-200 hover:bg-indigo-600 hover:text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header only if authenticated */}
      {email && (
        <MobileHeader onSettingsOpen={setIsSettingsOpen} onLogout={handleLogout} />
      )}

      {/* Settings Modal */}
      <SettingsModal state={isSettingsOpen} onClose={setIsSettingsOpen} />
    </>
  );
}

/* 📌 Nav Item Component */
function NavItem({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`relative text-gray-700 dark:text-gray-300 transition-colors 
        hover:text-indigo-600 dark:hover:text-indigo-400
        ${
          !active
            ? "before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-indigo-600 dark:before:bg-indigo-400 before:transition-all before:duration-300 hover:before:w-full"
            : ""
        }
      `}
    >
      {label}
      {active && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-md"></div>
      )}
    </Link>
  );
}
