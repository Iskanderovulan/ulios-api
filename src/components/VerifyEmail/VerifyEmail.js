import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const VerifyEmail = () => {

    const navigate = useNavigate()
    const { token } = useParams()

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        <div>
            VERIFICATION EMAIL PAGE
        </div>
    );
};

export default VerifyEmail;

