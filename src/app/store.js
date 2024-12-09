import { configureStore } from "@reduxjs/toolkit";
import productFormReducer from "../features/productForm/productFormSlice";

const store = configureStore({
  reducer: {
    productForm: productFormReducer,
  },
});

export default store;
