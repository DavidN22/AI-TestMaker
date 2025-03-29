// hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserEmail, setAuthLoading, logout  } from "../store/Slices/authSlice";
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
        dispatch(setUserEmail(data.user.email));
        console.log("user: ", data.user.email);

      } catch {
        dispatch(setAuthLoading(false));
        dispatch(logout());
      }
    };
    checkUser();
  }, [dispatch]);
};

export default useAuthCheck;
