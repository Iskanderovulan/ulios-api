import { createSlice } from "@reduxjs/toolkit";
import { loginAsync } from "../actions/action";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: {
      name: "",
      email: "",
      password: "",
    },
    errors: {
      name: null,
      email: null,
      password: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    handleLogin(state, action) {
      state.login = action.payload;
    },
    handleErrors(state, action) {
      state.errors = { ...state.errors, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { handleLogin, handleErrors } = loginSlice.actions;
export default loginSlice.reducer;
