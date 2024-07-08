import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import { productAPI } from './fetchProduct';

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});
