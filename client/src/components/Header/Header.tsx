import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SettingsModal from "../Modals/settingsModal.tsx";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";
import { Home, History, BarChart, ListChecks } from "lucide-react";
import { RootState } from "../../store/store";
import { useApi } from "../../utils/api.ts";
import DarkModeToggle from "./DarkModeToggle";
import UserDropdown from "./UserDropdown";
import TokenDisplay from "./TokenDisplay";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);
  const { handleLogout } = useApi();

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleGoogleSignIn = () => {
    const loginUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/api/auth/login"
        : "https://api.teskro.com/api/auth/login";
    window.location.href = loginUrl;
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block sticky top-0 z-50 w-full backdrop-blur-lg bg-white/10 dark:bg-black/10 border-b"
      >
        <div className="w-full px-10">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={isDarkMode ? logoDark : logo}
                alt="Teskro Logo"
                className="w-13 h-13"
              />
                <span className="text-2xl font-extrabold text-black dark:text-white">
                Teskro
                </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              {email ? (
                <>
                  <div className="flex space-x-6">
                    <NavItem to="/home" label="Home" icon={Home} />
                    <NavItem to="/custom" label="Custom" icon={ListChecks} />
                    <NavItem to="/history" label="History" icon={History} />
                    <NavItem to="/statistics" label="Stats" icon={BarChart} />
                  </div>

                  <div className="flex items-center gap-4 pl-10">
                    <TokenDisplay />
                    <DarkModeToggle />
                    <UserDropdown
                      onSettingsOpen={() => setIsSettingsOpen(true)}
                      onLogout={handleLogout}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <DarkModeToggle />
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={handleGoogleSignIn}
                    className="flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full border border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 shadow-sm transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 533.5 544.3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h146.7c-6.3 34-25 62.7-53.2 82v68.2h85.9c50.2-46.2 79.1-114.4 79.1-195z"
                        fill="#4285F4"
                      />
                      <path
                        d="M272 544.3c71.8 0 132-23.8 176-64.5l-85.9-68.2c-23.8 16-54.2 25.4-90.1 25.4-69 0-127.4-46.6-148.3-109.2H34v68.7C77.8 480.6 168.7 544.3 272 544.3z"
                        fill="#34A853"
                      />
                      <path
                        d="M123.7 327.9c-10.3-30.5-10.3-63.6 0-94.1V165h-89.7c-36.2 72.4-36.2 158.6 0 231l89.7-68.1z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M272 107.7c38.9-.6 76.1 13.3 104.6 38.6l78.1-78.1C410.2 24.8 343.3-.5 272 0 168.7 0 77.8 63.7 34 165l89.7 68.8c20.9-62.6 79.3-109.2 148.3-109.2z"
                        fill="#EA4335"
                      />
                    </svg>
                    Login with Google
                  </motion.button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Header */}
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
        `relative flex items-center gap-1 text-sm font-medium text-black dark:text-white transition 
        before:absolute before:left-0 before:-bottom-1 before:h-[1px] before:bg-black dark:before:bg-white 
        before:transition-all before:duration-300
        ${isActive ? "before:w-full" : "before:w-0 hover:before:w-full"}`
      }
    >
      <Icon size={15} />
      {label}
    </NavLink>
  );
}
