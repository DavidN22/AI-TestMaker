// components/TokenDisplayMobile.tsx
import { useGetTokensQuery } from "../../store/Slices/tokenSlice";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function TokenDisplayMobile() {
  const { data, isLoading, isError } = useGetTokensQuery();

  const baseStyle =
    "flex items-center gap-2 justify-center px-3 py-2 text-sm font-medium rounded-md border shadow-sm backdrop-blur-md transition w-full";

  if (isLoading) {
    return (
      <div
        className={`${baseStyle} bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 border-gray-200 dark:border-gray-700`}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading token...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`${baseStyle} bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700`}
      >
        <AlertCircle className="w-4 h-4" />
        Token Error
      </div>
    );
  }

  return (
    <div
      className={`${baseStyle} bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700`}
    >
      <CheckCircle className="w-4 h-4" />
      Token: {data?.token || "N/A"}
    </div>
  );
}
