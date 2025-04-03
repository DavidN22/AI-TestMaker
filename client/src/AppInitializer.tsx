import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { toast, ToastContainer } from "react-toastify";
import { clearError } from "./store/Slices/toastSlice";
import useAuthCheck from "./Auth-helpers/useAuthCheck";
import LoadingSpinner from "./components/Loading/LoadingSpinner";

export default function AppInitializer({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.toast);
  const isLoading = useSelector((state: RootState) => state.auth.isAuthLoading);

  useAuthCheck();

  useEffect(() => {
    if (message && type) {
      const toastFn = type === "success" ? toast.success : toast.error;
      toastFn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(clearError());
    }
  }, [message, type, dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner message="" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </>
  );
}
