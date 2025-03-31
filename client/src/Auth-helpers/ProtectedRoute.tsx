import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const email = useSelector((state: RootState) => state.auth.email);
  const isLoading = useSelector((state: RootState) => state.auth.isAuthLoading);
  console.log("ProtectedRoute email: ", email);

  if (isLoading) {
    return <div><LoadingSpinner message = "" /></div>;
  }

  if (!email) {
    console.log("User not logged in, redirecting to login page.");
    return <Navigate to="/" replace />;
  }

  return children;
}
