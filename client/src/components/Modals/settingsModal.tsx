import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalTemplate from "./ModalTemplate";
import { RootState } from "../../store/store";
import { useApi } from "../../utils/api";
import { showSuccess } from "../../store/Slices/toastSlice";
import CustomCombobox from "./CustomCombobox";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useClearAllTestResultsMutation } from "../../store/Slices/apiSlice";
import { X, Trash2 } from "lucide-react";

interface SettingsModalProps {
  onClose: (isSettingOpen: boolean) => void;
  state: boolean;
}

export default function SettingsModal({ state, onClose }: SettingsModalProps) {
  const { deleteUserAccount, loading } = useApi();
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isHistoryConfirmOpen, setIsHistoryConfirmOpen] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);
  const [clearAllTestResults] = useClearAllTestResultsMutation();
  const modelOptions = ["gemini", "gpt-4o", "deepseek", "claude"];
  const [selectedModel, setSelectedModel] = useState("gemini");

  useEffect(() => {
    const stored = localStorage.getItem("languageModel") || "gemini";
    setSelectedModel(stored);
  }, []);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem("languageModel", model);
    dispatch(
      showSuccess(
        `Language model set to ${
          model.charAt(0).toUpperCase() + model.slice(1)
        }`
      )
    );
  };

  const deleteAccount = async () => {
    try {
      await deleteUserAccount();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const deleteHistoryData = async () => {
    try {
      await clearAllTestResults().unwrap();
      dispatch(showSuccess("Test history data deleted successfully"));
    } catch (error) {
      console.error("Error deleting history data:", error);
    }
  };
  const modelLabelMap: Record<string, string> = {
    gemini: "Gemini (Fastest Model)",
    "gpt-4o": "Gpt-4o",
    deepseek: "Deepseek (Slowest Model)",
    claude: "Claude",
  };

  return (
    <>
      <ModalTemplate isOpen={state} setIsOpen={onClose} title="Settings">
        {loading && <LoadingSpinner message="" />}

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600">
            {email}
          </div>
        </div>

        <CustomCombobox
          label="Current Language Model"
          options={modelOptions}
          selected={selectedModel}
          onChange={handleModelChange}
          disabledOptions={[
            selectedModel,
            ...modelOptions.filter(
              (m) => m !== "gemini" && m !== "deepseek" && m !== "gpt-4o"
            ),
          ]}
          displayValue={(model) => modelLabelMap[model] || model}
        />
        {/* Bug Report Section */}
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
          Found a bug or have feedback?{" "}
          <a
            href="mailto:naymondavid@gmail.com"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            Send me an email
          </a>
          .
        </div>

        {/* Danger Zone */}
        <div className="mt-10 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-300 dark:border-red-700">
          <h3 className="text-base font-semibold text-red-700 dark:text-red-300 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Be careful — these actions are irreversible.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsHistoryConfirmOpen(true)}
              className="px-4 py-2 text-yellow-800 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-600 rounded-md text-sm font-medium transition"
            >
              Delete History
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition"
            >
              Delete All Data
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
            onClick={() => onClose(false)}
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>
      </ModalTemplate>

      {/* Confirm Delete All Data Modal */}
      <ModalTemplate
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        title="Confirm Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to permanently delete your data? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
            onClick={() => setIsConfirmOpen(false)}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <button
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => {
              deleteAccount();
              setIsConfirmOpen(false);
            }}
          >
            <Trash2 className="w-4 h-4" />
            Yes, Delete
          </button>
        </div>
      </ModalTemplate>

      {/* Confirm Delete History Modal */}
      <ModalTemplate
        isOpen={isHistoryConfirmOpen}
        setIsOpen={setIsHistoryConfirmOpen}
        title="Confirm History Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete your test history? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <button
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
            onClick={() => setIsHistoryConfirmOpen(false)}
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <button
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition"
            onClick={() => {
              deleteHistoryData();
              setIsHistoryConfirmOpen(false);
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete History
          </button>
        </div>
      </ModalTemplate>
    </>
  );
}
