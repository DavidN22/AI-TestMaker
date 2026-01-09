import { useDispatch } from "react-redux";
import { clearConfirmation } from "../../store/Slices/chatHistorySlice";
import { CheckCircle, XCircle } from "lucide-react";
import { useChatbot } from "./useChatbot";

const ConfirmationPanel = () => {
  const dispatch = useDispatch();
  const { sendMessage } = useChatbot();

const handleClick = async (value: "yes" | "no") => {
  dispatch(clearConfirmation());
  await sendMessage(value, true); // skip user bubble

};
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => handleClick("yes")}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors font-medium"
      >
        <CheckCircle className="w-4 h-4" strokeWidth={2} /> Yes
      </button>
      <button
        onClick={() => handleClick("no")}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors font-medium"
      >
        <XCircle className="w-4 h-4" strokeWidth={2} /> No
      </button>
    </div>
  );
};

export default ConfirmationPanel;
