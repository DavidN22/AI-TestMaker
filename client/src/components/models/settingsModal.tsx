import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalTemplate from "./ModalTemplate";
import { RootState } from "../../store/store";
import { useApi } from "../../utils/api";
import { showSuccess } from "../../store/Slices/toastSlice";
import CustomCombobox from "./CustomCombobox";

interface SettingsModalProps {
  onClose: (isSettingOpen: boolean) => void;
  state: boolean;
}

export default function SettingsModal({ state, onClose }: SettingsModalProps) {
  const { deleteUserAccount } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);

  const modelOptions = ["gemini", "gpt-4o", "deepseek", "claude"];
  const [selectedModel, setSelectedModel] = useState("gemini");

  useEffect(() => {
    const stored = localStorage.getItem("languageModel") || "gemini";
    setSelectedModel(stored);
  }, []);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem("languageModel", model);
    dispatch(showSuccess(`Language model set to ${model}`));
  };

  const deleteAccount = async () => {
    try {
      await deleteUserAccount();
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <ModalTemplate isOpen={state} setIsOpen={onClose} title="Settings">
        {/* Username Display */}
        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <div className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600">
            {email}
          </div>
        </div>

        {/* Language Model Selector */}
        <CustomCombobox
          label="Current Language Model"
          options={modelOptions}
          selected={selectedModel}
          onChange={handleModelChange}
          disabledOptions={modelOptions.filter((m) => m !== "gemini")}
          displayValue={(model) => model.charAt(0).toUpperCase() + model.slice(1)}
        />

        {/* Delete Account Button */}
        <div className="mt-12">
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="cursor-pointer w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>
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

      {/* Confirm Delete Modal */}
      <ModalTemplate
        isOpen={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        title="Confirm Deletion"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to permanently delete your account? This action
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
    </>
  );
}
