export default function SkeletonLoaderTable() {
    return (
      <div className="flex items-center justify-between animate-pulse space-x-4">
        <div className="w-1/5 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-1/6 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-1/5 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-1/6 flex gap-4">
          <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }
  