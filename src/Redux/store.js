import { configureStore } from "@reduxjs/toolkit";
import ProductsReducers from "./Reducers/Products.reducers";

export const store = configureStore({
  reducer: {
    product: ProductsReducers,
  },
});
