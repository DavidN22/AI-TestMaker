import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TestResults } from "@/Types/Results";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/db",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getTestResults: builder.query<TestResults[], void>({
      query: () => "/tests",
    }),
  }),
});
export const { useGetTestResultsQuery } = apiSlice;
