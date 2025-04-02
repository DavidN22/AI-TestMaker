import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setAuthLoading, logout } from "../store/Slices/authSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const useAuthCheck = () => {
const apiBase = useSelector((state: RootState) => state.config.apiBase);  
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get(`${apiBase}/auth/me`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          withCredentials: true, 
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
  }, [dispatch,apiBase]);
  
};

export default useAuthCheck;
