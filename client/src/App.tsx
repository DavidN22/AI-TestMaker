// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import HistoryView from "./views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./views/Landing";
import ProtectedRoute from "./hooks/ProtectedRoute";
import useAuthCheck from "./hooks/useAuthCheck";
export default function App() {
 


useAuthCheck();



  return (
    <Router>
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
