import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
import HistoryView from "./views/HistoryView";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/test" element={<TestView />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="/statistics" element={<TestView />} />
        <Route path="*" element={<HomeView />} />
      </Routes>
    </Router>
  );
}
