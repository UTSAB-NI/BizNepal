import { apiSlice } from "./apiSlices";
import { CATEGORIES_URL, SEARCH_URL } from "../constant";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchByCategory: builder.query({
      query: (category) => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
        params: {
          category: category,
        },
      }),

      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),

    serachBusiness: builder.query({
      query: (keyword) => ({
        url: `${SEARCH_URL}`,
        method: "GET",
        params:{keyword},
      }),
    }),
  }),
});

export const { useSearchByCategoryQuery, useSerachBusinessQuery } =
  categoryApiSlice;
