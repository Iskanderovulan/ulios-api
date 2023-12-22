import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { handleLogin, handleErrors } from "./redux/slicers/loginSlice";
import { useDispatch } from "react-redux";
import { loginAsync } from "./redux/actions/action";
import { setToken } from "./redux/slicers/tokenSlice";

const loginHoc =
  (Component, url) =>
  ({ ...props }) => {
    const setTokenUI = (token) => {
      dispatch(setToken(token));
    };

    const dispatch = useDispatch();
    const { login, errors,error,loading } = useSelector((state) => state.loginSlice);

    const clearErrors = useCallback(
      (errors) => {
        dispatch(handleErrors(errors));
      },
      [dispatch]
    );

    const newLogin =
      url === "/reg" ? login : { email: login.email, password: login.password };

    const handleValues = (field) => (event) => {
      dispatch(handleLogin({ ...newLogin, [field]: event.target.value }));
      if (errors[field]) {
        dispatch(handleErrors({ ...errors, [field]: null }));
      }
    };

    const loginAsyncUI = (e) => {
      e.preventDefault();
      dispatch(loginAsync({ setTokenUI, url }));
    };

    return (
      <Component
        {...props}
        handleValues={handleValues}
        loginAsyncUI={loginAsyncUI}
        errors={errors}
        clearErrors={clearErrors}
        error={error}
        loading={loading}
      />
    );
  };
export default loginHoc;
