import axios from "axios";
import { showError } from "../store/Slices/toastSlice";
import store from "../store/store";

export const handleApiError = (error: unknown): void => {
  let message = "An unexpected error occurred.";

  if (typeof error === "string") {
    message = error;
  } else if (axios.isAxiosError(error) && error.response?.data?.message) {
    message = error.response.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  store.dispatch(showError(message));
};
