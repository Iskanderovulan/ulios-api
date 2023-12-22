import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TokenFalseRoute = ({ component: Component }) => {
    const { token } = useSelector(state => state.tokenSlice);

    return token ? <Navigate to='/' /> : <Component />

};

export default TokenFalseRoute;