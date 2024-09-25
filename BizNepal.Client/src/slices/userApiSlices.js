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

    deleteUserbyId: builder.mutation({
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

    // Add the editUserbyadmin mutation here
    editUserbyadmin: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT", // Use PUT or PATCH based on your API design
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
  useEditUserbyadminMutation, // Export the edit user hook
} = userApiSlice;
