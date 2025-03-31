// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import TestView from "./components/views/TestView";
import HistoryView from "./components/views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./components/views/LandingView";
import ProtectedRoute from "./Auth-helpers/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { toast } from "react-toastify";
import { clearError } from "./store/Slices/toastSlice";
import useAuthCheck from "./Auth-helpers/useAuthCheck";
import { ToastContainer } from "react-toastify";
export default function App() {
 
const dispatch = useDispatch();
const { message, type } = useSelector((state: RootState) => state.toast);
useAuthCheck();

useEffect(() => {
  if (message && type) {
    const toastFn = type === "success" ? toast.success : toast.error;
    toastFn(message, {
      position: "top-center",
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
    <Router>
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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:id"
          element={
            <ProtectedRoute>
              <TestView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <LoadingPlaceholder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}
