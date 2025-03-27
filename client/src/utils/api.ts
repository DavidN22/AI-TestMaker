// src/utils/api.ts
import axios from "axios";
import { QuizResult } from "@/Types/Results";

export const fetchTest = async ({
  testName,
  numQuestions,
  weakPointMode,
}: {
  testName: string;
  numQuestions: number;
  weakPointMode: boolean;
}) => {
  const response = await axios.post(
    "/api/ai/getTest",
    { testName, numQuestions, weakPointMode },
    { withCredentials: true }
  );
  return response.data.message.questions;
};

export const deleteUserAccount = async () => {
  await axios.delete("/api/db/delete", { withCredentials: true });
  await axios.get("/api/auth/logout");
};

export const reviewTest = async ({
  results,
  testName,
}: {
  results: QuizResult;
  testName: string;
}) => {
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
};

export const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
       window.location.href = '/';
      
    
    } catch (err) {
      console.error(err);
    }
  };