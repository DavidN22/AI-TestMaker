export default function StatPageSkeleton() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <header className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          📊 Your Test Dashboard
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Performance insights at a glance
        </p>
      </header>

      {/* Stats Cards Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl p-5 shadow-sm bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 flex flex-col items-center space-y-3 min-h-[100px]">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </section>

      {/* Circular Progress Bars Skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-5 flex flex-col items-center border border-gray-200 dark:border-gray-800">
            <div className="w-[150px] h-[150px] bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="mt-3 h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </section>

      {/* Main Chart Grid Skeleton */}
      <section className="grid grid-cols-5 gap-6">
        <div className="col-span-3 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </section>

      {/* Score Trend Chart Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6">
        <div className="h-5 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Heatmap Skeleton */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-6">
        <div className="h-5 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded" />
      </section>
    </div>
  );
}
