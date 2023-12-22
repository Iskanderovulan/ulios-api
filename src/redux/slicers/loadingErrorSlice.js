// loadingErrorSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { decreaseQuantityAsync, removeItemAsync, addProductsAsync } from "../actions/action";

const handleAsyncCases = (builder, action, actionType) => {
    builder.addMatcher(
        (a) => a.type === action.pending.type,
        (state, action) => {
            const itemId = action.meta.arg;
            state.loading[actionType] = { ...state.loading[actionType], [itemId]: true };
        }
    );
    builder.addMatcher(
        (a) => a.type === action.fulfilled.type,
        (state, action) => {
            const itemId = action.meta.arg;
            state.loading[actionType] = { ...state.loading[actionType], [itemId]: false };
            state.error[actionType] = { ...state.error[actionType], [itemId]: null };
        }
    );
    builder.addMatcher(
        (a) => a.type === action.rejected.type,
        (state, action) => {
            const itemId = action.meta.arg;
            state.loading[actionType] = { ...state.loading[actionType], [itemId]: false };
            state.error[actionType] = { ...state.error[actionType], [itemId]: action.error.message };
        }
    );
};

const loadingErrorSlice = createSlice({
    name: "loadingError",
    initialState: {
        loading: {
            decrease: {},
            remove: {},
            add: {},
            create: {}
        },
        error: {
            decrease: {},
            remove: {},
            add: {},
            create: {}
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        const asyncActions = [
            { action: decreaseQuantityAsync, type: "decrease" },
            { action: removeItemAsync, type: "remove" },
            { action: addProductsAsync, type: "add" },
            { action: addProductsAsync, type: "create" },
        ];
        asyncActions.forEach(({ action, type }) => handleAsyncCases(builder, action, type));
    },
});

export default loadingErrorSlice.reducer;