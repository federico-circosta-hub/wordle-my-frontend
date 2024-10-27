import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordleApi = createApi({
  reducerPath: "wordleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordle-my-backend.vercel.app",
    //baseUrl: "http://127.0.0.1:5000",
  }),
  endpoints: (builder) => ({
    getWordInfo: builder.query({
      query: () => ({ url: `/`, method: "GET" }),
    }),
    checkWord: builder.query({
      query: (word: string) => ({
        url: "/check_word",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { word_attempt: word },
      }),
    }),
    getEncryptedWord: builder.query({
      query: () => ({ url: `/encrypted_word`, method: "GET" }),
    }),
  }),
});

export const {
  useGetWordInfoQuery,
  useLazyCheckWordQuery,
  useGetEncryptedWordQuery,
} = wordleApi;
