import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { handleApiError } from '../../utils/handleApiErrors';

const baseQuery = fetchBaseQuery({
  baseUrl:
  window.location.hostname === 'localhost'
    ? '/api/auth'
    : 'https://api.teskro.com/api/auth',
  credentials: 'include',
});

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    
    handleApiError(result.error);
  }

  return result;
};

export const tokenApiSlice = createApi({
  reducerPath: 'tokenApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getTokens: builder.query<{ token: string }, void>({
      query: () => 'tokens',
    }),
  }),
});

export const { useGetTokensQuery } = tokenApiSlice;
