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
      const languageModel = localStorage.getItem("languageModel") || "gemini";
      const response = await axios.post(
        "https://api.teskro.com/api/ai/getTest",
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
  
  

  /**
   * Reviews the test results by sending them to the server for analysis.
   * The server returns weak points and a summary, which are then saved to the database.
   * @param {Object} params - The parameters for the reviewTest function.
   * @param {QuizResult} params.results - The results of the quiz to be reviewed.
   * @param {string} params.testName - The name of the test.
   * @returns {Promise<Object>} - The processed results with weak points, summary, and test ID.
   */
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
  
      const reviewRes = await axios.post("https://api.teskro.com/api/ai/reviewTest", {
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
        "https://api.teskro.com/api/db/tests",
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
      await axios.delete("https://api.teskro.com/api/db/delete", { withCredentials: true });
      await axios.get("https://api.teskro.com/api/auth/logout", { withCredentials: true });
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
      await axios.get("https://api.teskro.com/api/auth/logout", { withCredentials: true });
      window.location.href = "https://teskro.com";
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
