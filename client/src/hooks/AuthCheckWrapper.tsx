import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setAuthLoading } from "../store/Slices/authSlice";
import { RootState } from "../store/store";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

const AuthCheckWrapper = ({ children }: Props) => {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector((state: RootState) => state.auth.isAuthLoading);

  useEffect(() => {
    const checkUser = async () => {
      try {
        
        const { data } = await axios.get("/api/auth/me");
     
        dispatch(setUserData(data.user.email));
        
        console.log("User: ", data.user.email);
      } catch {
        console.log("User not logged in");
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    checkUser();
  }, [dispatch]);

  if (isAuthLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthCheckWrapper;
