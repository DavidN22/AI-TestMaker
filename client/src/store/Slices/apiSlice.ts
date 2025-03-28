import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TestResults } from "@/Types/Results";
import { handleApiError } from "../../utils/handleApiErrors";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/db",
  credentials: "include",
});

// 👇 Wrap the baseQuery to catch and handle errors globally
const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    handleApiError(result.error);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getTestResults: builder.query<TestResults[], void>({
      query: () => "/tests",
    }),
  }),
});

export const { useGetTestResultsQuery } = apiSlice;
