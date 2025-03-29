import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SettingsModal from "../models/settingsModal";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";
import { Home, History, BarChart } from "lucide-react";
import { RootState } from "../../store/store";
import { useApi } from "../../utils/api.ts";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "./UserDropdown";

export default function Header() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);
  const { handleLogout } = useApi();
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/login";
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white/70 dark:bg-[#1E1E1E] backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 left-0 right-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Branding */}
            <Link
              to="/"
              className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide hover:opacity-80 transition"
            >
              MyApp
            </Link>

            <nav className="flex items-center justify-end w-full space-x-5">
              {email ? (
                <>
                  {/* Left Group: Main Nav Links */}
                  <div className="flex space-x-5">
                    <NavItem to="/home" label="Home" icon={Home} />
                    <NavItem to="/history" label="History" icon={History} />
                    <NavItem to="/statistics" label="Statistics" icon={BarChart} />
                  </div>

                  {/* Right Group: Theme Toggle + User Dropdown */}
                  <div className="flex items-center space-x-5 ml-10 pr-4">
                    <DarkModeToggle />
                    <UserDropdown
                      onSettingsOpen={() => setIsSettingsOpen(true)}
                      onLogout={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-5 pr-4 ml-10">
                  <DarkModeToggle />
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 
hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors duration-200 text-sm font-medium shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#4285F4"
                        d="M24 9.5c3.06 0 5.67 1.06 7.77 2.8l5.8-5.8C33.11 3.06 28.89 1 24 1 14.61 1 6.84 6.64 3.61 14.29l6.76 5.26C12.04 13.46 17.57 9.5 24 9.5z"
                      />
                      <path
                        fill="#34A853"
                        d="M46.5 24c0-1.57-.14-3.1-.4-4.58H24v9.11h12.73c-.56 3.04-2.25 5.63-4.77 7.37l7.45 5.8c4.35-4.01 6.89-9.93 6.89-16.7z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.37 28.45A14.4 14.4 0 019.5 24c0-1.55.26-3.04.72-4.45l-6.76-5.26A23.86 23.86 0 001 24c0 3.82.91 7.43 2.5 10.63l6.87-6.18z"
                      />
                      <path
                        fill="#EA4335"
                        d="M24 46c6.54 0 12.03-2.16 16.06-5.87l-7.45-5.8c-2.07 1.39-4.73 2.22-8.61 2.22-6.43 0-11.96-3.96-13.63-9.55l-6.87 6.18C6.84 41.36 14.61 46 24 46z"
                      />
                      <path fill="none" d="M1 1h46v46H1z" />
                    </svg>
                    Login with Google
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header only if authenticated */}
      {email && (
        <MobileHeader
          onSettingsOpen={setIsSettingsOpen}
          onLogout={handleLogout}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal state={isSettingsOpen} onClose={setIsSettingsOpen} />
    </>
  );
}

/* 📌 Nav Item Component using NavLink */
function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-1 text-gray-700 dark:text-gray-300 transition-colors 
        hover:text-indigo-600 dark:hover:text-indigo-400
        before:absolute before:left-0 before:-bottom-1 before:h-[2px] 
        before:bg-indigo-600 dark:before:bg-indigo-400 before:transition-all before:duration-300
        ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}
