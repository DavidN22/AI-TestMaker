import { useState } from "react";
import TestConfigModal from "../Modals/configModal";
import { Cloud, Landmark, Globe, BookOpen } from "lucide-react";

interface TestCardProps {
  title: string;
  description: string;
}

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("aws")) return <Cloud className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("azure")) return <Landmark className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  if (lower.includes("google")) return <Globe className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
  return <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />;
};

export default function TestCard({ title, description }: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="relative bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-900 
      dark:hover:border-white cursor-pointer flex flex-col min-h-[220px] space-y-3 group"
      onClick={() => setIsModalOpen(true)}
    >
      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <div>{getIcon(title)}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate group-hover:whitespace-normal">
          {title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
        {description}
      </p>

      {/* Start Button */}
      <button
        className="mt-auto bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium 
        px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Start Test →
      </button>

      {/* Modal */}
      <TestConfigModal testName={title} state={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
