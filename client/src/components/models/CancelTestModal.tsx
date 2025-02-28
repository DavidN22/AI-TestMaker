import ModalTemplate from "./ModalTemplate";

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
      <div className="mt-6 flex justify-between gap-3">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
          onClick={() => setIsOpen(false)}
        >
          No, Go Back
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 "
          onClick={onCancel}
        >
          Yes, Cancel
        </button>
      </div>
    </ModalTemplate>
  );
}
