import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomeView from "./components/views/HomeView";
import TestView from "./components/views/TestView";
import HistoryView from "./components/views/HistoryView";
import Landing from "./components/views/LandingView";
import ProtectedRoute from "./Auth-helpers/ProtectedRoute";
import AppInitializer from "./AppInitializer";
import PrivacyPolicy from "./components/LandingPage/PrivacyPolicy";
import Header from "./components/Header/Header";
import HeaderSkeleton from "./components/Loading/HeaderSkeleton";
import CustomPageView from "./components/views/CustomPageView";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
import StatPage from "./components/StatsPage/StatPage";
import { useGetDashboardDataQuery } from "./store/Slices/statsApi";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget";

function AppContent() {
  const isAuthLoading = useSelector(
    (state: RootState) => state.auth.isAuthLoading
  );
  const email = useSelector((state: RootState) => state.auth.email);
  const location = useLocation();
  const isLoading = useSelector((state: RootState) => state.auth.isAuthLoading);
  const isTestRoute = /^\/test\/[^/]+$/.test(location.pathname);
  //useGetDashboardDataQuery();  This triggers on each route change, which is not ideal for performance but has instant
  //dashboard data display without needing to invalidate rtk query tags.

  // Use regex to check if the current path matches /test/:id

  useGetDashboardDataQuery(undefined, {
    skip: isAuthLoading || !email,
  });

  useEffect(() => {
    const routeName = (() => {
      if (location.pathname === "/") return "";
      if (location.pathname.startsWith("/home")) return "Home";
      if (location.pathname.startsWith("/test")) return "Test";
      if (location.pathname.startsWith("/history")) return "History";
      if (location.pathname.startsWith("/statistics")) return "Statistics";
      if (location.pathname.startsWith("/privacy-policy"))
        return "Privacy Policy";
      return "Teskro";
    })();

    document.title = routeName ? `Teskro - ${routeName}` : "Teskro";
  }, [location.pathname]);
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
          path="/custom"
          element={
            <ProtectedRoute>
              <CustomPageView />
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
              <StatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Landing />} />
      </Routes>
      {email && !isTestRoute && <ChatbotWidget />}
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
