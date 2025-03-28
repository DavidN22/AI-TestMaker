export default function SkeletonLoader() {
  return (
    <div
      className="relative bg-gray-100 dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 
      rounded-xl p-4 shadow-sm animate-pulse flex flex-col min-h-[160px] space-y-2"
    >
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>

      {/* Subtitle Placeholder */}
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>

      {/* Content Placeholder */}
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>

      {/* Button Placeholder */}
      <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mt-auto"></div>
    </div>
  );
}
