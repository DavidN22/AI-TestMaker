// components/Modals/CreateTestActions.tsx
import { Eye, CheckCircle, X } from "lucide-react";

interface CreateTestActionsProps {
  isCreating: boolean;
  isFormValid: () => boolean;
  onCancel: () => void;
  onCreate: () => void;
  onGeneratePreview: () => void;
}

export default function CreateTestActions({
  isCreating,
  onCancel,
  onCreate,
  onGeneratePreview,
}: CreateTestActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
        disabled={isCreating}
        className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
        onClick={onCancel}
      >
        <X className="w-4 h-4" />
        Cancel
      </button>

      <button
        disabled={isCreating}
        className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]"
        onClick={onGeneratePreview}
      >
        <Eye className="w-4 h-4" />
        Generate Preview
      </button>

      <button
        disabled={isCreating}
        className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
        onClick={onCreate}
      >
        <CheckCircle className="w-4 h-4" />
        Create
      </button>
    </div>
  );
}
