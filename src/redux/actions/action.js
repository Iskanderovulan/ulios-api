import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AUTH, HOME, CART, FAVORITE } from "../../config";
import { handleInfo } from "../slicers/infoSlice";
import { handleProducts } from "../slicers/homeSlice";
import { handleCart } from "../slicers/cartSlice";
import { handleFavorite } from "../slicers/favoritesSlice";
import { handleErrors } from "../slicers/loginSlice";

const asyncActions = {
  loginAsync: createAsyncThunk(
    "login/loginAsync",
    async (payload, { rejectWithValue, dispatch, getState }) => {
      const { setTokenUI, url } = payload;
      try {
        const { login } = getState().loginSlice;
        const response = await axios.post(AUTH + url, login);
        console.log(response.data.token);
        setTokenUI(response.data.token);
      } catch (e) {
        console.log(e);
        if (Array.isArray(e.response.data.errors)) {
          const errorMessages = e.response.data.errors.reduce((acc, error) => {
            if (acc[error.field]) {
              acc[error.field] += `; ${error.message}`;
            } else {
              acc[error.field] = error.message;
            }
            return acc;
          }, {});
          dispatch(handleErrors(errorMessages));
        } else {
          if (e.response.data.message) {
            console.log(e.response.data.message);
            return rejectWithValue(e.response.data.message);
          } else {
            return rejectWithValue(e.message);
          }
        }
      }
    }
  ),
  getInfoAsync: createAsyncThunk(
    "info/getInfoAsync",
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.get(HOME + "/get-info", {
          headers: {
            "x-access-token": token,
          },
        });
        console.log(response);
        dispatch(handleInfo(response.data));
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  getProductsAsync: createAsyncThunk(
    "home/getProducts",
    async (query, { rejectWithValue, dispatch, getState }) => {
      try {
        const response = await axios.get(`${HOME}/get-products/${query}`);
        console.log(response);
        dispatch(handleProducts(response.data));
        return response.data;
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  addProductsAsync: createAsyncThunk(
    "cart/addProductsAsync",
    async (id, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.post(CART + `/add-to-cart/${id}`, null, {
          headers: {
            "x-access-token": token,
          },
        });
        dispatch(getCartAsync());
        console.log(response);
        console.log(response.data);
        // dispatch(handleCart(response.data))
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  getCartAsync: createAsyncThunk(
    "cart/getCartAsync",
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.get(CART + "/get-cart-items", {
          headers: {
            "x-access-token": token,
          },
        });
        console.log(response);
        console.log(response.data);
        dispatch(handleCart(response.data));
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  decreaseQuantityAsync: createAsyncThunk(
    "cart/decreaseQuantityAsync",
    async (id, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.patch(
          CART + `/decrease-quantity/${id}`,
          null,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        dispatch(getCartAsync());
        console.log(response);
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),

  removeItemAsync: createAsyncThunk(
    "cart/removeItemAsync",
    async (id, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.delete(CART + `/remove-item/${id}`, {
          headers: {
            "x-access-token": token,
          },
        });
        dispatch(getCartAsync());
        console.log(response);
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  toggleFavoriteAsync: createAsyncThunk(
    "favorites/createFavoriteAsync",
    async (id, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.post(
          FAVORITE + `/toggle-favorite/${id}`,
          null,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        console.log(response.data);
        dispatch(getFavoritesAsync());
        // Add dispatch to handle updated favorite data in the state
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
  getFavoritesAsync: createAsyncThunk(
    "favorites/getFavoritesAsync",
    async (_, { rejectWithValue, dispatch, getState }) => {
      try {
        const { token } = getState().tokenSlice;
        const response = await axios.get(FAVORITE + "/get-favorites", {
          headers: {
            "x-access-token": token,
          },
        });
        console.log(response);
        dispatch(handleFavorite(response.data.items));
        // Add dispatch to handle favorite data in the state
      } catch (e) {
        console.log(e);
        return rejectWithValue(e.message);
      }
    }
  ),
};

export const {
  loginAsync,
  getInfoAsync,
  getProductsAsync,
  getCartAsync,
  addProductsAsync,
  decreaseQuantityAsync,
  removeItemAsync,
  toggleFavoriteAsync,
  getFavoritesAsync,
} = asyncActions;
