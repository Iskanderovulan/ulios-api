import { createSlice } from "@reduxjs/toolkit";
import { getProductsAsync } from "../actions/action";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: null,
    page: null,
    pages: null,
    loading: false,
    error: null,
  },
  reducers: {
    handleProducts(state, action) {
      state.data = action.payload;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { handleProducts } = homeSlice.actions;
export default homeSlice.reducer;
