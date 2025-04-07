import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Pencil, Trash2 } from "lucide-react";

interface TestCardMenuProps {
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  skipNextClickRef: React.MutableRefObject<boolean>;
}

export default function TestCardMenu({ onEdit, onDelete, skipNextClickRef }: TestCardMenuProps) {
  const stopAndMark = (e: React.MouseEvent) => {
    e.stopPropagation();
    skipNextClickRef.current = true;
  };

  return (
    <div onClick={stopAndMark} onMouseDown={stopAndMark}>
      <Menu as="div" className="absolute top-3 right-3 z-10 text-left">
        <Menu.Button className="text-gray-400 hover:text-gray-700 dark:hover:text-white transition">
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>

        <Menu.Items
          className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-white/80 dark:bg-[#1A1A1A]/80 
          backdrop-blur-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 z-50 p-1 transition-all duration-150"
        >
          <div className="space-y-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    skipNextClickRef.current = true;
                    onEdit(e);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md transition ${
                    active ? "bg-gray-100 dark:bg-[#2A2A2A]" : ""
                  } text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300`}
                >
                  <Pencil className="w-4 h-4 stroke-[1.3]" />
                  Edit
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={(e) => {
                    skipNextClickRef.current = true;
                    onDelete(e);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md transition ${
                    active ? "bg-gray-100 dark:bg-[#2A2A2A]" : ""
                  } text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300`}
                >
                  <Trash2 className="w-4 h-4 stroke-[1.3]" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
