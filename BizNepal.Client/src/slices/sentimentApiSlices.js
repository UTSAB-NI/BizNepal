import { apiSlice } from "./apiSlices";

import { SENTIMENT_URL } from "../constant";

export const sentimentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSentiment: builder.mutation({
      query: (data) => ({
        url: `${SENTIMENT_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostSentimentMutation } = sentimentApiSlice;
