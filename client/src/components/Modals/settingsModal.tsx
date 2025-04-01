import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalTemplate from "./ModalTemplate";
import { RootState } from "../../store/store";
import { useApi } from "../../utils/api";
import { showSuccess } from "../../store/Slices/toastSlice";
import CustomCombobox from "./CustomCombobox";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useClearAllTestResultsMutation } from "../../store/Slices/apiSlice";

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
  const modelOptions = ["gemini", "deepseek", "gpt-4o", "claude"];
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
        `Language model set to ${model.charAt(0).toUpperCase() + model.slice(1)}`
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
          displayValue={(model) => model.charAt(0).toUpperCase() + model.slice(1)}
        />

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
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onClose(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
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
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsConfirmOpen(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => {
              deleteAccount();
              setIsConfirmOpen(false);
            }}
          >
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
          Are you sure you want to delete your test history? This action
          cannot be undone.
        </p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setIsHistoryConfirmOpen(false)}
            className="cursor-pointer px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            onClick={() => {
              deleteHistoryData();
              setIsHistoryConfirmOpen(false);
            }}
          >
            Yes, Delete History
          </button>
        </div>
      </ModalTemplate>
    </>
  );
}
