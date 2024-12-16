import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  quantity: "",
  price: "",
  description: "",
  category: "",
  entryDate: "",
  isEditing: false,
};

const productFormSlice = createSlice({
  name: "ProductForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateProductForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
    initializeForm: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateField, resetForm, initializeForm, updateProductForm } =
  productFormSlice.actions;
export default productFormSlice.reducer;
