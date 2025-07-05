import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { toast, ToastContainer } from "react-toastify";
import { clearError } from "./store/Slices/toastSlice";
import useAuthCheck from "./Auth-helpers/useAuthCheck";
import { isDarkMode } from "./components/Header/DarkModeToggle";

export default function AppInitializer({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state: RootState) => state.toast);

// check localstorage for dark mode preference
  isDarkMode();
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

