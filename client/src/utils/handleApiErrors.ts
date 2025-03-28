import axios from "axios";
import { showError } from "../store/Slices/toastSlice";
import store from "../store/store";

export const handleApiError = (error: unknown): void => {
  const message =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : error instanceof Error
      ? error.message
      : "An unexpected error occurred.";
  store.dispatch(showError(message));
};
