export default function HeaderSkeleton() {
  return (
    <header className="hidden lg:block sticky top-0 z-50 w-full backdrop-blur-lg bg-white/10 dark:bg-black/10 border-b">
      <div className="w-full px-10">
        <div className="flex justify-between items-center h-14 animate-pulse">
          
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          {/* RIGHT: Nav + Token + Dark mode + Avatar */}
          <div className="flex items-center gap-6">
            {/* Nav Links */}
            {["w-12", "w-14", "w-16", "w-10"].map((width, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className={`${width} h-4 bg-gray-300 dark:bg-gray-600 rounded`}></div>
              </div>
            ))}

            {/* Token display */}
            <div className="px-3 py-1 rounded-full border border-green-500">
              <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>

            {/* Dark mode toggle */}
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

            {/* Profile avatar */}
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
