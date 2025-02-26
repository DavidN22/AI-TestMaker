import HomePage from "../components/HomePage/HomePage";
import Header from "../components/Header/Header";
export default function HomeView() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
       <HomePage />       
      </div>
    </div>
  );
}
