interface QuestionTypeSelectorProps {
    selectedTypes: string[];
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  }
  
  
  export default function QuestionTypeSelector({
    selectedTypes,
    setSelectedTypes,
  }: QuestionTypeSelectorProps) {
    const questionTypes = ["multiple choice", "select two", "true/false"];
  
    const toggleType = (type: string) => {
      setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    };
  
    const isTypeSelected = (type: string) => selectedTypes.includes(type);
  
    return (
      <div className="border rounded-md p-3 dark:border-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Select Question Types
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {questionTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                isTypeSelected(type)
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                  : "border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          If no types are selected, all types will be included by default.
        </p>
      </div>
    );
  }
  