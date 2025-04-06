import { Menu } from "@headlessui/react";

interface DeleteTestMenuItemProps {
  onClick: () => void;
}

export default function DeleteTestMenuItem({ onClick }: DeleteTestMenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active
              ? "bg-gray-100 dark:bg-gray-700 text-red-700"
              : "text-red-600"
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          Delete
        </button>
      )}
    </Menu.Item>
  );
}
