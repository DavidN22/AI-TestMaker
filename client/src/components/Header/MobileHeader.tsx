import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MobileFilterModal from "../Modals/MobileFilterModal";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Menu,
  X,
  Home,
  History,
  Settings,
  BarChart,
  LogOut,
  ListChecks,
} from "lucide-react";
import TokenDisplayMobile from "./TokenDisplayMobile";

export default function MobileHeader({
  onSettingsOpen,
  onLogout,
}: {
  onSettingsOpen: (val: boolean) => void;
  onLogout: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const email = useSelector((state: RootState) => state.auth.email);

  const showFilterModal = location.pathname === "/home";

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-[#121212] shadow-sm sticky top-0 left-0 right-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-gray-100"
            >
              Teskro
            </Link>

            {/* Icons container */}
            <div className="flex items-center gap-4">
              <DarkModeToggle />

              {showFilterModal && <MobileFilterModal />}
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-[#121212] z-50 flex flex-col px-6 py-8"
          >
            <button
              className="self-end text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="mt-10 mb-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Signed in as
              </p>
              <p className="text-md font-semibold text-gray-900 dark:text-gray-100 truncate px-2">
                {email}
              </p>
              <div className="mt-4">
                <TokenDisplayMobile />
              </div>
            </div>
            <nav className="flex-1 space-y-3">
              {[
                { to: "/home", label: "Home", Icon: Home },
                { to: "/custom", label: "Custom Tests", Icon: ListChecks },
                { to: "/history", label: "History", Icon: History },
                { to: "/statistics", label: "Statistics", Icon: BarChart },
              ].map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={to}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-50 dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#232323] transition"
                >
                  <Icon
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-700 w-full my-6"></div>

            <div className="space-y-3">
              <button
                onClick={() => onSettingsOpen(true)}
                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-50 dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#232323] transition w-full"
              >
                <Settings
                  size={20}
                  className="text-gray-700 dark:text-gray-300"
                />
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  Settings
                </span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition w-full"
              >
                <LogOut size={20} className="text-white" />
                <span className="text-white font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
