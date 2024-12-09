import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  quantity: "",
  price: "",
  description: "",
  category: "",
};

const productFormSlice = createSlice({
  name: "ProductForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = productFormSlice.actions;
export default productFormSlice.reducer;
