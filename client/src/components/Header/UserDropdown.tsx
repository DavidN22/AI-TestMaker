import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { User2, Settings, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface UserDropdownProps {
  onSettingsOpen: () => void;
  onLogout: () => void;
}

export default function UserDropdown({ onSettingsOpen, onLogout }: UserDropdownProps) {
  const email = useSelector((state: RootState) => state.auth.email);
  const image = useSelector((state: RootState) => state.auth.avatarUrl);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="User avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User2 className="text-white dark:text-black" size={20} />
        )}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-md shadow-xl ring-1 ring-black/5 focus:outline-none z-50 divide-y divide-gray-200 dark:divide-gray-700">
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium text-gray-800 dark:text-gray-200">Signed in</div>
            <div className="truncate">{email}</div>
          </div>

          <div className="py-1">
            <MenuItem
              as="button"
              onClick={onSettingsOpen}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition rounded-md ui-active:bg-gray-100 ui-active:dark:bg-gray-800"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </MenuItem>

            <MenuItem
              as="button"
              onClick={onLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 transition rounded-md ui-active:bg-red-50 ui-active:dark:bg-red-800"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
