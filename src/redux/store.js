import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slicers/loginSlice";
import infoSlice from "./slicers/infoSlice";
import tokenSlice from "./slicers/tokenSlice";
import homeSlice from "./slicers/homeSlice";
import cartSlice from "./slicers/cartSlice";
import loadingErrorSlice from "./slicers/loadingErrorSlice";
import favoritesSlice from "./slicers/favoritesSlice";


export default configureStore({
    reducer: {
        loginSlice,
        infoSlice,
        tokenSlice,
        homeSlice,
        cartSlice,
        loadingErrorSlice,
        favoritesSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})