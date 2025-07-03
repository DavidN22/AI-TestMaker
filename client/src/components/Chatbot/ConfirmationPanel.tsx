import { useDispatch } from "react-redux";
import { clearConfirmation } from "../../store/Slices/chatHistorySlice";
import { CheckCircle, XCircle } from "lucide-react";
import { useChatbot } from "./useChatbot";

const ConfirmationPanel = () => {
  const dispatch = useDispatch();
  const { sendMessage } = useChatbot();

const handleClick = async (value: "yes" | "no") => {
  dispatch(clearConfirmation());
  // Remove this line ↓ to prevent the bubble
  // dispatch(addMessage({ role: "user", text: value }));
  await sendMessage(value, true); // skip user bubble

};
  return (
    <div className="flex gap-4 justify-center mt-1">
      <button
        onClick={() => handleClick("yes")}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      >
        <CheckCircle className="w-4 h-4" /> Yes
      </button>
      <button
        onClick={() => handleClick("no")}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-zinc-600 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      >
        <XCircle className="w-4 h-4" /> No
      </button>
    </div>
  );
};

export default ConfirmationPanel;
