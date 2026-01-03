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
  tagTypes: ["Dashboard", "Users"],
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
    }, string | undefined>({
      query: (userId) => ({
        url: "/dashboard",
        method: "GET",
        params: userId ? { userId } : undefined,
      }),
      providesTags: ["Dashboard"],
      keepUnusedDataFor: Number.POSITIVE_INFINITY,
    }),
    getAllUsers: builder.query<{
      users: { email: string }[];
    }, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetAllUsersQuery } = statsApi;
