// src/utils/api.ts
import axios from "axios";
import { QuizResult } from "@/Types/Results";
import { handleApiError } from "./handleApiErrors";

export const fetchTest = async ({
  testName,
  numQuestions,
  weakPointMode,
}: {
  testName: string;
  numQuestions: number;
  weakPointMode: boolean;
}) => {
  try {
    const response = await axios.post(
      "/api/ai/getTest",
      { testName, numQuestions, weakPointMode },
      { withCredentials: true }
    );
    return response.data.message.questions;
  } catch (error) {
    handleApiError(error);
    throw error; // optional: rethrow if you want caller to handle it too
  }
};

export const deleteUserAccount = async () => {
  try {
    await axios.delete("/api/db/delete", { withCredentials: true });
    await axios.get("/api/auth/logout");
  } catch (error) {
    handleApiError(error);
  }
};

export const reviewTest = async ({
  results,
  testName,
}: {
  results: QuizResult;
  testName: string;
}) => {
  try {
    const reviewRes = await axios.post("/api/ai/reviewTest", { results });
    const { weakpoints, summary } = reviewRes.data.message;

    const resultsWithWeakPoints = {
      ...results,
      testName,
      weakPoints: weakpoints,
      summary,
    };

    await axios.post(
      "/api/db/tests",
      { resultsWithWeakPoints },
      { withCredentials: true }
    );

    return resultsWithWeakPoints;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await axios.get("/api/auth/logout");
    window.location.href = "/";
  } catch (error) {
    handleApiError(error);
  }
};
