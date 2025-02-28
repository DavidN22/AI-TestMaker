import HistoryPage from '../components/HistoryPage/HistoryPage';
import Header from "../components/Header/Header";

export default function HistoryView() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <HistoryPage />
      </div>
    </div>
  );
}
