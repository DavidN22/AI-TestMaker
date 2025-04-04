import ModalTemplate from "./ModalTemplate";
import { X, Ban } from "lucide-react";


interface CancelTestProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCancel: () => void;
}

export default function CancelTest({ isOpen, setIsOpen, onCancel }: CancelTestProps) {
  return (
    <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Cancel Test">
      <p className="text-gray-700 dark:text-gray-300">
        Are you sure you want to cancel the test? All progress will be lost.
      </p>
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
  <button
    className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
    onClick={() => setIsOpen(false)}
  >
    <X className="w-4 h-4" />
    No, Go Back
  </button>

  <button
    className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
    onClick={onCancel}
  >
    <Ban className="w-4 h-4" />
    Yes, Cancel
  </button>
</div>

    </ModalTemplate>
  );
}
