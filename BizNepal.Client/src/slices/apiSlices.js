import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.jwtToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
 });

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery,
  tagTypes: ['User' , 'Category'],
  endpoints: (builder) => ({}),
});
