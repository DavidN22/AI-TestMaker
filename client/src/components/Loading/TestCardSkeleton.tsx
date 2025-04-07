export default function TestCardSkeleton() {
    return (
      <div className="animate-pulse bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 
      rounded-xl p-5 shadow-sm flex flex-col min-h-[220px] space-y-3">
        {/* Title Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
  
        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
        </div>
  
        {/* Button Skeleton */}
        <div className="mt-auto h-8 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    );
  }
  