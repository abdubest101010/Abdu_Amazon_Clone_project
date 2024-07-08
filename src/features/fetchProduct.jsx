import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productAPI = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/products`,
    }),
})
});

export const {
  useGetAllProductsQuery
} = productAPI;
