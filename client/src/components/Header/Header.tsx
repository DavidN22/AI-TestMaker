import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsModal from "../models/settingsModel";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";
import { Home, History, BarChart } from "lucide-react";
import { RootState } from "../../store/store";
import { handleLogout } from "../../utils/api";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "./UserDropdown";

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
        <NavItem
          to="/home"
          label="Home"
          active={location.pathname === "/home"}
          icon={Home}
        />
        <NavItem
          to="/history"
          label="History"
          active={location.pathname === "/history"}
          icon={History}
        />
        <NavItem
          to="/statistics"
          label="Statistics"
          active={location.pathname === "/statistics"}
          icon={BarChart}
        />
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
    <>
      <button
        onClick={handleGoogleSignIn}
        className="cursor-pointer px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium 
        transition-all duration-200 hover:bg-indigo-600 hover:text-white"
      >
        Login
      </button>
      {/* Always show toggle, even if not logged in */}
      <div className="ml-4">
        <DarkModeToggle />
      </div>
    </>
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

/* 📌 Nav Item Component */
function NavItem({
  to,
  label,
  active,
  icon: Icon,
}: {
  to: string;
  label: string;
  active: boolean;
  icon: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-1 text-gray-700 dark:text-gray-300 transition-colors 
        hover:text-indigo-600 dark:hover:text-indigo-400
        ${
          !active
            ? "before:absolute before:left-0 before:-bottom-1 before:w-0 before:h-[2px] before:bg-indigo-600 dark:before:bg-indigo-400 before:transition-all before:duration-300 hover:before:w-full"
            : ""
        }
      `}
    >
      <Icon size={16} />
      {label}
      {active && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-md"></div>
      )}
    </Link>
  );
}
