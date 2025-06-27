import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TestResults } from "@/Types/Results";
import { handleApiError } from "../../utils/handleApiErrors";
import { statsApi } from "./statsApi"; // Ensure path is correct

const baseQuery = fetchBaseQuery({
  baseUrl:
    window.location.hostname === "localhost"
      ? "/api/db"
      : "https://api.teskro.com/api/db",
  credentials: "include",
});

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
  tagTypes: ["TestResults"],
  endpoints: (builder) => ({
    getTestResults: builder.query<TestResults[], void>({
      query: () => "/tests",
      providesTags: ["TestResults"],
      keepUnusedDataFor: Number.POSITIVE_INFINITY,
    }),

    deleteTestResult: builder.mutation<void, string>({
      query: (testId) => ({
        url: `/tests/${testId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TestResults"],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(statsApi.util.invalidateTags(["Dashboard"]));
        });
      },
    }),

    clearAllTestResults: builder.mutation<void, void>({
      query: () => ({
        url: `/tests`,
        method: "DELETE",
      }),
      invalidatesTags: ["TestResults"],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(statsApi.util.invalidateTags(["Dashboard"]));
        });
      },
    }),
  }),
});

export const {
  useGetTestResultsQuery,
  useDeleteTestResultMutation,
  useClearAllTestResultsMutation,
} = apiSlice;
