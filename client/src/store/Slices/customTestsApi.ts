import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateTest } from '../../Types/Tests';
import { handleApiError } from '../../utils/handleApiErrors';

const baseQuery = fetchBaseQuery({
  baseUrl: 
    window.location.hostname === 'localhost'
      ? '/api/db'
      : 'https://api.teskro.com/api/db',
  credentials: 'include',
});

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    handleApiError(result.error);
  }
  return result;
};

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['CustomTests'],
  endpoints: (builder) => ({
    getCustomTests: builder.query<CreateTest[], void>({
      query: () => '/custom',
      providesTags: ['CustomTests'],
      keepUnusedDataFor: Number.POSITIVE_INFINITY,
    }),
    updateCustomTest: builder.mutation<CreateTest, { testId: string; updatedData: Partial<CreateTest> }>({
      query: ({ testId, updatedData }) => ({
        url: `/custom/${testId}`,
        method: 'PATCH',
        body: updatedData,
      }),
      invalidatesTags: ['CustomTests'],
    }), 
    createCustomTest: builder.mutation<CreateTest, Partial<CreateTest>>({
      query: (newTest) => ({
        url: '/custom',
        method: 'POST',
        body: newTest,
      }),
      invalidatesTags: ['CustomTests'],
    }),
    deleteCustomTest: builder.mutation<void, string>({
      query: (testId) => ({
        url: `/custom/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CustomTests'],
    }),
  }),
});

export const {
  useGetCustomTestsQuery,
  useUpdateCustomTestMutation,
  useCreateCustomTestMutation,
  useDeleteCustomTestMutation, 
} = testsApi;
