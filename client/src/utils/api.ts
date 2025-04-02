import { useState } from "react";
import axios from "axios";
import { QuizResult } from "@/Types/Results";
import { handleApiError } from "./handleApiErrors";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const apiBase = useSelector((state: RootState) => state.config.apiBase);
  const frontendBase = useSelector((state: RootState) => state.config.frontendBase);
  console.log("API Base URL:", apiBase);

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
      const languageModel = localStorage.getItem("languageModel") || "gemini";
      const response = await axios.post(
        `${apiBase}/ai/getTest`,
        { testName, numQuestions, weakPointMode, languageModel },
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
      const languageModel = localStorage.getItem("languageModel") || "gemini";

      const reviewRes = await axios.post(`${apiBase}/ai/reviewTest`, {
        results,
        languageModel,
      });
      const { weakpoints, summary } = reviewRes.data.message;

      const resultsWithWeakPoints = {
        ...results,
        testName,
        weakPoints: weakpoints,
        summary,
      };

      const dbRes = await axios.post(
        `${apiBase}/db/tests`,
        { resultsWithWeakPoints },
        { withCredentials: true }
      );

      const quizId = dbRes.data.quizId.test_id;
      return { ...resultsWithWeakPoints, test_id: quizId };
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    setLoading(true);
    try {
      await axios.delete(`${apiBase}/db/delete`, { withCredentials: true });
      await axios.get(`${apiBase}/auth/logout`, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${apiBase}/auth/logout`, { withCredentials: true });
      window.location.href = frontendBase;
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
