import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./components/views/HomeView";
import TestView from "./components/views/TestView";
import HistoryView from "./components/views/HistoryView";
import LoadingPlaceholder from "./components/Loading/Placeholder";
import Landing from "./components/views/LandingView";
import ProtectedRoute from "./Auth-helpers/ProtectedRoute";
import AppInitializer from "./AppInitializer";
import PrivacyPolicy from "./components/LandingPage/PrivacyPolicy";

export default function App() {
  return (
    <Router>
      <AppInitializer>
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
      </AppInitializer>
    </Router>
  );
}
