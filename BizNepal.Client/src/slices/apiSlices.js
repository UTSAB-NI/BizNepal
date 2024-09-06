import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
