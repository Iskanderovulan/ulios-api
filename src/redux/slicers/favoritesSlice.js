import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        handleFavorite(state, action) {
            state.favorites = action.payload
        }
    },

});

export const { handleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;