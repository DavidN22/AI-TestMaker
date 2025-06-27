import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleApiError } from "../../utils/handleApiErrors";

const baseQuery = fetchBaseQuery({
  baseUrl:
    window.location.hostname === "localhost"
      ? "/api/stats"
      : "https://api.teskro.com/api/stats",
  credentials: "include",
});

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
    
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    handleApiError(result.error);
  }
  return result;
};

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    getDashboardData: builder.query<{
      meta: {
        total_tests: number;
        avg_score: number;
        last_test_date: string | null;
      };
      tests: {
        date: string;
        score: number;
        provider: string;
        difficulty: string;
        weak_points: string;
      }[];
    }, void>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
      keepUnusedDataFor: Number.POSITIVE_INFINITY,
    }),
  }),
});

export const { useGetDashboardDataQuery } = statsApi;
