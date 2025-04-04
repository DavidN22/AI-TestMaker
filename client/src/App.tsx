import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import TestView from "./components/views/TestView";
import HistoryView from "./components/views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./components/views/LandingView";
import ProtectedRoute from "./Auth-helpers/ProtectedRoute";
import AppInitializer from "./AppInitializer";
import PrivacyPolicy from "./components/LandingPage/PrivacyPolicy";
import Header from "./components/Header/Header";
import HeaderSkeleton from "./components/Loading/HeaderSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ScrollToTop from "./utils/ScrollToTop";

function AppContent() {
  const location = useLocation();
  const isLoading = useSelector((state: RootState) => state.auth.isAuthLoading);

  // Use regex to check if the current path matches /test/:id
  const isTestRoute = /^\/test\/[^/]+$/.test(location.pathname);

  return (
    <>
      <ScrollToTop />
      {!isTestRoute && (isLoading ? <HeaderSkeleton /> : <Header />)}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInitializer>
        <AppContent />
      </AppInitializer>
    </Router>
  );
}
