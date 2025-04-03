import { useGetTokensQuery } from "../../store/Slices/tokenSlice";
import { Loader2, AlertCircle, CheckCircle, Info, XCircle  } from "lucide-react";
import Tooltip from "./Tooltip";

export default function TokenBadge() {
  const { data, isLoading, isError } = useGetTokensQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });
  

  const baseStyle =
    "flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-xl shadow-sm border transition-all duration-300 min-w-[140px] h-[36px] backdrop-blur-sm";

    const status = isLoading
    ? {
        style:
          "bg-white/80 text-gray-600 border-gray-300 dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700",
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        text: "Loading...",
      }
    : isError
    ? {
        style:
          "bg-red-50/80 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700",
        icon: <AlertCircle className="w-4 h-4" />,
        text: "Token Error",
      }
    : Number(data?.token) === 0
    ? {
        style:
          "bg-red-50/80 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700",
        icon: <XCircle  className="w-4 h-4" />,
        text: `Token: ${data?.token}`,
      }
    : {
        style:
          "bg-white/90 text-gray-800 border-green-300 dark:bg-gray-800/50 dark:text-green-300 dark:border-green-700",
        icon: <CheckCircle className="w-4 h-4" />,
        text: `Token: ${data?.token}`,
      };
  

  return (
    <div className={`relative w-fit ${baseStyle} ${status.style}`}>
      {status.icon}
      {status.text}

      <Tooltip content="Tokens refresh every 2 days">
  <Info className="w-4 h-4 ml-1 cursor-pointer opacity-70 hover:opacity-100" />
</Tooltip>
    </div>
  );
}
