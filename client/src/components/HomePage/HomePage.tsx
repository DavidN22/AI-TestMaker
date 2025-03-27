import TestCard from "./TestCard";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import SidebarFilter from "./SidebarFilter";
import { clearError } from "../../store/Slices/toastSlice";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
export default function HomePage() {
  const filteredTests = useSelector(
    (state: RootState) => state.filter.filteredTests
  );
  const dispatch = useDispatch();
  const toastErrorMessage = useSelector((state: RootState) => state.toast.message);
  useEffect(() => {
    if (toastErrorMessage) {
      toast.error(toastErrorMessage, { position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", });
      dispatch(clearError());
    }
  }, [toastErrorMessage, dispatch]);
  console.log("rendered");
  return (
    <div className="flex flex-1 overflow-hidden">
      <ToastContainer/>
      {/* Sidebar */}
      <SidebarFilter />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-10 overflow-auto">
        <div className="w-full max-w-6xl text-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pick Your Test
          </h1>

          {/* Subtext (Fixed Theme Consistency) */}
          <p className="text-md text-gray-700 dark:text-gray-400 mt-3 mb-8">
            Explore and challenge yourself with expert-curated tests.
          </p>
        </div>

        {/* Grid Layout for Tests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
          {filteredTests.map((test) => {
            // Execution pauses before rendering each TestCard
            return (
              <TestCard
                key={test.id}
                title={test.title}
                description={test.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
