import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../layout/Layout/Layout";
import { useSelector } from 'react-redux'

const TokenTrueRoute = () => {

    const { token } = useSelector(state => state.tokenSlice);
    return token ? <Layout /> : <Navigate to='/auth' />
}

export default TokenTrueRoute