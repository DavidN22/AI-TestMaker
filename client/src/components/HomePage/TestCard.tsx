import { useState } from "react";
import TestConfigModal from "../models/configModel";
interface TestCardProps {
  title: string;
  description: string;
}

const getEmoji = (title: string) => {
  if (title.toLowerCase().includes("aws")) return "☁️";
  if (title.toLowerCase().includes("azure")) return "🔷";
  if (title.toLowerCase().includes("google")) return "🌍";
  return "📚";
};

export default function TestCard({ title, description }: TestCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="relative bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500 
      dark:hover:border-blue-400 cursor-pointer flex flex-col min-h-[220px] space-y-3"
      onClick={() => setIsModalOpen(true)}
    >
      
      {/* Title & Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl">{getEmoji(title)}</span>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide truncate">
          {title}
        </h2>
      </div>
      {/* Description */}
      <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed flex-grow truncate">
        {description}
      </p>
     
      {/* Start Button */}
      <button className="cursor-pointer mt-auto bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium 
      px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-600">
        Start Test →
      </button>
      <TestConfigModal testName={title} state={isModalOpen} setIsOpen={setIsModalOpen} />

    </div>
    
  );
}
