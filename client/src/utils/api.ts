import { useState } from "react";
import axios from "axios";
import { QuizResult } from "@/Types/Results";
import { handleApiError } from "./handleApiErrors";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { tokenApiSlice } from "../store/Slices/tokenSlice";
import { statsApi } from "../store/Slices/statsApi";

export function useApi() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const apiBase = useSelector((state: RootState) => state.config.apiBase);
  const frontendBase = useSelector(
    (state: RootState) => state.config.frontendBase
  );

  const fetchTest = async ({
    testName,
    numQuestions,
    weakPointMode,
    description,
    types = [],
    difficulty,
    languageModel: overrideModel
  }: {
    testName: string;
    numQuestions: number;
    weakPointMode: boolean;
    description: string;
    types: string[];
    difficulty?: string;
    languageModel?: string;
  }) => {
    setLoading(true);
    try {
      const languageModel = overrideModel || localStorage.getItem("languageModel") || "gemini";
      const response = await axios.post(
        `${apiBase}/ai/getTest`,
        {
          testName,
          numQuestions,
          weakPointMode,
          languageModel,
          description,
          difficulty,
          types,
        },
        { withCredentials: true }
      );
      
      // Handle response - it should have message.questions
      if (response.data?.message?.questions) {
        return response.data.message.questions;
      }
      
      throw new Error('Invalid response format from server');
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
  provider,
  difficulty,
}: {
  results: QuizResult;
  testName: string;
  provider?: string;
  difficulty?: string;
}) => {
  setLoading(true);
  try {
    const languageModel = localStorage.getItem("languageModel") || "gemini";

    // Step 1: Run AI review
    const reviewRes = await axios.post(`${apiBase}/ai/reviewTest`, {
      results,
      languageModel,
    });

    const { weakpoints, summary } = reviewRes.data.message;

    // Step 2: Compose full results with weak points
    const resultsWithWeakPoints = {
      ...results,
      testName,
      weakPoints: weakpoints,
      summary,
      provider,
      difficulty,
    };

    // Step 3: Save test result to the DB
    const dbRes = await axios.post(
      `${apiBase}/db/tests`,
      { resultsWithWeakPoints },
      { withCredentials: true }
    );

    const quizId = dbRes.data.quizId.test_id;

    // ✅ Step 4: Invalidate *after* test is saved
    dispatch(statsApi.util.invalidateTags(["Dashboard"]));

    return { ...resultsWithWeakPoints, test_id: quizId };
  } catch (error) {
    handleApiError(error);
  } finally {
    setLoading(false);
  }
};


  const getPreviewTest = async ({
    title,
    description,
    difficulty,
  }: {
    title: string;
    description: string;
    difficulty: string;
    provider: string;
  }) => {
    setLoading(true);
    try {
      const languageModel = localStorage.getItem("languageModel") || "gemini";
      const response = await axios.post(
        `${apiBase}/ai/getPreviewTest`,
        {
          title,
          description,
          difficulty,
          languageModel,
        },
        { withCredentials: true }
      );
      dispatch(tokenApiSlice.util.invalidateTags(["Tokens"]));
      return response.data.message;
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

const sendChatToBot = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(
      `${apiBase}/chatbot/query`,
      { question: messages },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


  return {
    loading,
    fetchTest,
    reviewTest,
    deleteUserAccount,
    handleLogout,
    getPreviewTest,
    sendChatToBot,
  };
}
