import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: null,
    },
    reducers: {
        handleCart(state, action) {
            state.data = action.payload;
        },
    },
});

export const { handleCart } = cartSlice.actions;
export default cartSlice.reducer;