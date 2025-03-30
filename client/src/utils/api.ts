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
      throw error
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
      // Send the quiz results to the AI review endpoint for analysis
      const reviewRes = await axios.post("/api/ai/reviewTest", { results });
      const { weakpoints, summary } = reviewRes.data.message;

      // Combine the original results with the weak points and summary
      const resultsWithWeakPoints = {
        ...results,
        testName,
        weakPoints: weakpoints,
        summary,
      };

      // Save the processed results to the database
      const dbRes = await axios.post(
        "/api/db/tests",
        { resultsWithWeakPoints },
        { withCredentials: true }
      );

      // Extract the quiz ID from the database response
      const quizId = dbRes.data.quizId.test_id;
      // Return the processed results along with the test ID (from the backend response)
      return { ...resultsWithWeakPoints, test_id: quizId };
    } catch (error) {
      // Handle any errors that occur during the process
      handleApiError(error);
    } finally {
      // Ensure the loading state is reset
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
