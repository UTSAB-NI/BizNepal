import { apiSlice } from "./apiSlices";
import { AUth_URL, BUSINESS_URL, USERS_URL } from "../constant";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUth_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUth_URL}/Register`,
        method: "POST",
        body: data,
      }),
    }),

    listbusiness: builder.mutation({
      query: (businessData) => ({
        url: `${BUSINESS_URL}/Create`,
        method: "POST",
        body: businessData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUth_URL}/logout`,
        method: "POST",
      }),
    }),

    getAlluser: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
    }),

    DeleteUserbyId: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    addUserbyadmin: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useListbusinessMutation,
  useGetAlluserQuery,
  useDeleteUserbyIdMutation,
  useAddUserbyadminMutation,
} = userApiSlice;
