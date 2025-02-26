import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import TestView from "./views/TestView";
export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/test" element={<TestView />} />
        </Routes>
    </Router>
  );
}
