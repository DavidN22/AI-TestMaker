import { useState } from "react";
import axios from "axios";
import { QuizResult } from "@/Types/Results";
import { handleApiError } from "./handleApiErrors";

export function useApi() {
  const [loading, setLoading] = useState(false);

  const fetchTest = async ({
    testName,
    numQuestions,
    weakPointMode,
  }: {
    testName: string;
    numQuestions: number;
    weakPointMode: boolean;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/ai/getTest",
        { testName, numQuestions, weakPointMode },
        { withCredentials: true }
      );
      return response.data.message.questions;
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reviewTest = async ({
    results,
    testName,
  }: {
    results: QuizResult;
    testName: string;
  }) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/db/delete", { withCredentials: true });
      await axios.get("/api/auth/logout");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }; 

  return {
    loading,
    fetchTest,
    reviewTest,
    deleteUserAccount,
    handleLogout,
  };
}
