import { apiSlice } from "./apiSlices";
import {
  AUth_URL,
  BUSINESS_URL,
  USERS_URL,
  CATEGORIES_URL,
  REVIEW_URL,
  UPDATE_USER_URL,
  BOOKMARK_URL,
} from "../constant";

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

    // getbusiness: builder.query({
    //   query: () => ({
    //     url: BUSINESS_URL,
    //     method: "GET",
    //   }),
    // }),

    getbusiness: builder.query({
      query: ({
        pageSize = 10,
        searchTerm = "",
        category = "",
        pageNumber = 1,
        isAscending = true,
        latitude,
        longitude,
        radiusInKm,
      }) => ({
        url: `${BUSINESS_URL}`,
        method: "GET",
        params: {
          pageSize,
          searchTerm,
          category,
          pageNumber,
          isAscending,
          latitude,
          longitude,
          radiusInKm,
        },
      }),
    }),

    getcreatedbusinessByUser: builder.query({
      query: (userId) => ({
        url: `${BUSINESS_URL}/user/${userId}`,
        method: "GET",
      }),
    }),

    getbusinessById: builder.query({
      query: (businessId) => ({
        url: `${BUSINESS_URL}/${businessId}`,
        method: "GET",
      }),
    }),

    deletebusiness: builder.mutation({
      query: (businessId) => ({
        url: `${BUSINESS_URL}/${businessId}`,
        method: "DELETE",
      }),
    }),

    editBusiness: builder.mutation({
      query: (data) => ({
        url: `${BUSINESS_URL}/${data.businessId}`,
        method: "PUT", // Use PUT or PATCH based on your API design
        body: data,
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

    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
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

    //category api
    getAllCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
        method: "GET",
      }),
    }),

    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),

    addCategorybyadmin: builder.mutation({
      query: (data) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: data,
      }),
    }),

    editCategorybyadmin: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "PUT", // Use PUT or PATCH based on your API design
        body: data,
      }),
    }),

    //review
    getUserReview: builder.query({
      query: () => ({
        url: `${REVIEW_URL}`,
        method: "GET",
      }),
    }),
    createReview: builder.mutation({
      query: ({ businessId, ...reviewData }) => ({
        url: `${REVIEW_URL}/Create`,
        method: "POST",
        params: {
          BusinessId: businessId,
        },
        body: reviewData,
      }),
    }),

    //user profile update
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${UPDATE_USER_URL}/update-profile`,
        method: "PATCH",
        body: data,
      }),
    }),

    //user password update
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${UPDATE_USER_URL}/update-password`,
        method: "POST",
        body: data,
      }),
    }),
    //bookmark api
    getBookmarked: builder.query({
      query: () => ({
        url: BOOKMARK_URL,
        method: "GET",
      }),
    }),
    createBookmark: builder.mutation({
      query: (businessId) => ({
        url: `${BOOKMARK_URL}?businessId=${businessId}`,
        method: "POST",
      }),
    }),
    deleteBookmarks: builder.mutation({
      query: (businessId) => ({
        url: `${BOOKMARK_URL}/${businessId}`,
        method: "DELETE",
      }),
    }),
    businessAnalytics: builder.query({
      query: (businessId) => ({
        url: `${BUSINESS_URL}/${businessId}/analytics`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useListbusinessMutation,
  useGetbusinessQuery,
  useGetbusinessByIdQuery,
  useDeletebusinessMutation,
  useEditBusinessMutation,
  useGetAlluserQuery,
  useGetUserByIdQuery,
  useDeleteUserbyIdMutation,
  useAddUserbyadminMutation,
  useEditUserbyadminMutation,
  useGetAllCategoriesQuery, // Export the edit user hook
  useDeleteCategoryMutation,
  useAddCategorybyadminMutation,
  useEditCategorybyadminMutation,
  useCreateReviewMutation,
  useGetUserReviewQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useGetcreatedbusinessByUserQuery,
  useGetBookmarkedQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarksMutation,
  useBusinessAnalyticsQuery,
} = userApiSlice;
