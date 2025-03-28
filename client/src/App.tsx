// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import HistoryView from "./views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./views/LandingView";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { toast } from "react-toastify";
import { clearError } from "./store/Slices/toastSlice";
import useAuthCheck from "./hooks/useAuthCheck";
import { ToastContainer } from "react-toastify";
export default function App() {
 
const dispatch = useDispatch();
const toastErrorMessage = useSelector(
  (state: RootState) => state.toast.message
);
useAuthCheck();

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

  return (
    <Router>
      <ToastContainer
        position="top-right"
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
/*
// App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import HistoryView from "./views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./views/Landing";
import useAuthCheck from "./hooks/useAuthCheck";
import { useSelector } from "react-redux";
import { RootState } from "./store/store"; // adjust if needed

export default function App() {
  useAuthCheck();

  const email = useSelector((state: RootState) => state.auth.email);
  const isAuthLoading = useSelector((state: RootState) => state.auth.isAuthLoading);

  if (isAuthLoading) return <div></div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/home"
          element={email ? <HomeView /> : <Navigate to="/" replace />}
        />
        <Route
          path="/test/:id"
          element={email ? <TestView /> : <Navigate to="/" replace />}
        />
        <Route
          path="/history"
          element={email ? <HistoryView /> : <Navigate to="/" replace />}
        />
        <Route
          path="/statistics"
          element={email ? <LoadingPlaceholder /> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

*/
