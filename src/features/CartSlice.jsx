import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.cart.find(
        (item) => item.id === payload.item.id
      );
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.cart.push({ ...payload.item, amount: 1 });
      }
    },
    removeCart: (state, { payload }) => {
      const index = state.cart.findIndex((item) => item.id === payload);
      if (index >= 0) {
        const item = state.cart[index];
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.cart.splice(index, 1);
        }
      }
    },
  },
});

export const { addToCart, removeCart } = CartSlice.actions;

export default CartSlice.reducer;
