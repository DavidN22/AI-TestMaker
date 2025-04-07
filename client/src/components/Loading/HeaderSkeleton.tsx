export default function HeaderSkeleton() {
    return (
      <header className="hidden md:block bg-white/70 dark:bg-[#1E1E1E] backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 left-0 right-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-14 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
  
            <div className="flex items-center gap-5">
              <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
  
            <div className="flex items-center gap-5">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  