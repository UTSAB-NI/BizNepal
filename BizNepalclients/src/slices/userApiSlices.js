import { apiSlice } from "./apiSlices";
import { USERS_URL } from "../constant";


const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body:data
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/Register`,
        method: "POST",
        body:data
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApiSlice;
