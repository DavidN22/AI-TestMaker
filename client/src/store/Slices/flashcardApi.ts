import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleApiError } from "../../utils/handleApiErrors";

interface Flashcard {
  term: string;
  definition: string;
  highlights?: string[];
}

interface FlashcardSet {
  id: number;
  title: string;
  flashcards: {
    flashcards: Flashcard[];
  };
  created_at: string;
  source_type: 'ai' | 'test';
  source_id?: string;
  topic?: string;
}

interface FavoriteFlashcard {
  id: number;
  term: string;
  definition: string;
  highlights?: string[];
  created_at: string;
}

interface FlashcardHistoryResponse {
  recent: FlashcardSet[];
  favorites: FlashcardSet[]; // Changed from FavoriteFlashcard[] to FlashcardSet[]
}

interface IndividualFavoritesResponse {
  favorites: FavoriteFlashcard[];
}

const baseQuery = fetchBaseQuery({
  baseUrl:
    window.location.hostname === "localhost"
      ? "/api/study"
      : "https://api.teskro.com/api/study",
  credentials: "include",
});

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    handleApiError(result.error);
  }
  return result;
};

export const flashcardApi = createApi({
  reducerPath: "flashcardApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["FlashcardHistory", "IndividualFavorites"],
  endpoints: (builder) => ({
    getFlashcardHistory: builder.query<FlashcardHistoryResponse, void>({
      query: () => "/flashcardHistory",
      providesTags: ["FlashcardHistory"],
    }),

    getIndividualFavorites: builder.query<IndividualFavoritesResponse, void>({
      query: () => "/individualFavorites",
      providesTags: ["IndividualFavorites"],
    }),

    toggleIndividualFavorite: builder.mutation<{ isFavorite: boolean }, { term: string; definition: string; highlights?: string[] }>({
      query: (body) => ({
        url: "/individualFavorite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IndividualFavorites"],
    }),

    checkIndividualFavorite: builder.mutation<{ isFavorite: boolean }, { term: string; definition: string }>({
      query: (body) => ({
        url: "/checkIndividualFavorite",
        method: "POST",
        body,
      }),
    }),

    toggleFavorite: builder.mutation<void, number>({
      query: (flashcardId) => ({
        url: `/flashcardFavorite/${flashcardId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["FlashcardHistory"],
    }),

    deleteFlashcardSet: builder.mutation<void, number>({
      query: (flashcardId) => ({
        url: `/flashcardSet/${flashcardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashcardHistory"],
    }),
  }),
});

export const {
  useGetFlashcardHistoryQuery,
  useGetIndividualFavoritesQuery,
  useToggleIndividualFavoriteMutation,
  useCheckIndividualFavoriteMutation,
  useToggleFavoriteMutation,
  useDeleteFlashcardSetMutation,
} = flashcardApi;

export type { FlashcardSet, FavoriteFlashcard, Flashcard, FlashcardHistoryResponse, IndividualFavoritesResponse };
