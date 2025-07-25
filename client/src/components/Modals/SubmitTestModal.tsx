import ModalTemplate from "./ModalTemplate";
import { X, CheckCircle } from "lucide-react";

interface SubmitTestProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: () => void;
}

export default function SubmitTest({ isOpen, setIsOpen, onSubmit }: SubmitTestProps) {
  return (
    <ModalTemplate isOpen={isOpen} setIsOpen={setIsOpen} title="Submit Test">
      <p className="text-gray-700 dark:text-gray-300">
        Are you sure you want to submit the test? You won’t be able to make changes after submission.
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
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-500 transition"
          onClick={onSubmit}
        >
          <CheckCircle className="w-4 h-4" />
          Yes, Submit
        </button>
      </div>
    </ModalTemplate>
  );
}
