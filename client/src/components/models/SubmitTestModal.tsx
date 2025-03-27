import ModalTemplate from "./ModalTemplate";

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
      <div className="mt-6 flex justify-between gap-3">
      <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 "
          onClick={onSubmit} 
        >
          Yes, Submit
        </button>
      </div>
    </ModalTemplate>
  );
}
