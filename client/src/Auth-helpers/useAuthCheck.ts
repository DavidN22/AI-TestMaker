import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setAuthLoading, logout } from "../store/Slices/authSlice";
import axios from "axios";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
    
        const user = data.user;

    
        dispatch(setUserData({
          email: user.email,
          fullName: user.user_metadata.full_name,
          avatarUrl: user.user_metadata.avatar_url,
        }));
        dispatch(setAuthLoading(false));
      } catch {

        dispatch(setAuthLoading(false));
        dispatch(logout());
      }
    };
    
  
    checkUser();
  }, [dispatch]);
  
};

export default useAuthCheck;
