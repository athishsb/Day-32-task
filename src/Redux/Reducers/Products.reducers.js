import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    cartList: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cartList = [...state.cartList, action.payload];
    },
    deleteCart: (state, action) => {
      state.cartList = state.cartList.filter((item) => {
        return item.id !== action.payload;
      });
    },
    cartUpdate: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartList = state.cartList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: +quantity,
            subtotal: +quantity * item.newPrice,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const { addCart, deleteCart, cartUpdate } = ProductSlice.actions;
export default ProductSlice.reducer;
